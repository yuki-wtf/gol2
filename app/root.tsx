import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { getInstalledInjectedConnectors, StarknetProvider } from '@starknet-react/core'
import { ThemeProvider } from '@emotion/react'
import Layout from './components/layout'
import { GlobalStyle } from './styles/globalStyle'
import { infinite } from './styles/themes/infinite'
import { useCatch } from '@remix-run/react'
import ContainerInner from './components/Layout/ContainerInner'
import styled from '@emotion/styled'
import Typography from './components/Typography/Typography'
import type { ActionArgs, LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getUserId, updateSession } from './session.server'
import { UserProvider } from './hooks/useUserId'
import { withEmotionCache } from '@emotion/react'
import ServerStyleContext from './styles/server.context'
import ClientStyleContext from './styles/client.context'
import { useContext, useEffect } from 'react'
import { sql } from './db.server'
import { hexToDecimalString } from 'starknet/utils/number'
import { SelectedCellProvider } from './hooks/SelectedCell'
import { CreatorGridProvider } from './hooks/CreatorGrid'
import MobileMessage from './components/MobileMessage/MobileMessage'

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)

  let balance: number = null

  if (userId != null) {
    const res = await sql<{ balance: number }>`
      select "balance"
      from balance
      where "userId" = ${hexToDecimalString(userId)}
    `

    balance = res.rows[0]?.balance ?? 0
  }

  return json({
    env: {
      BASE_URL: process.env.URL,
    },
    userId: await getUserId(request),
    balance,
  })
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData()
  const userId = (formData.get('userId') as string) || null

  return json(
    {
      env: {
        BASE_URL: process.env.URL,
      },
      userId,
    },
    {
      headers: await updateSession({
        request,
        userId,
      }),
    }
  )
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'GoL2 CREATE GAMES - GIVE LIFE - EVOLVE',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,400;0,500;0,600;0,700;1,800&display=swap',
  },
]

interface DocumentProps {
  children: React.ReactNode
  title?: string
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext)
  const clientStyleData = useContext(ClientStyleContext)

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head

    // re-inject tags
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    tags.forEach((tag) => {
      ;(emotionCache.sheet as any)._insertTag(tag)
    })

    // reset cache to re-apply global styles
    clientStyleData.reset()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(' ')}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body>
        <div className="mobile-message">
          <MobileMessage />
        </div>
        <div className="appContainer">{children}</div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})

function AppLayout({ children }) {
  return (
    <Document>
      <ThemeProvider theme={infinite}>
        <SelectedCellProvider>
          <CreatorGridProvider>
            <GlobalStyle />
            <Layout>{children}</Layout>
          </CreatorGridProvider>
        </SelectedCellProvider>
      </ThemeProvider>
    </Document>
  )
}

export default function App() {
  const connectors = getInstalledInjectedConnectors()

  return (
    <StarknetProvider autoConnect connectors={connectors}>
      <UserProvider>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </UserProvider>
    </StarknetProvider>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
`

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <AppLayout>
      <ContainerInner paddingTop={100}>
        <StyledContainer>
          <svg width={274} height={376} viewBox="0 0 274 376" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M35.73 30.637C24.14 37.346 17 49.755 17 63.183v96.032c0 13.384 7.094 25.759 18.623 32.485l92.125 53.75a18.691 18.691 0 0018.871-.014l91.805-53.739C249.926 184.965 257 172.605 257 159.24V63.22c0-13.418-7.127-25.816-18.7-32.531l-31.822-18.465a31.11 31.11 0 00-31.258.01l-19.049 11.07-4.372 31.098 19.093 22.248-32.21 50.689v43.505l-20.738-43.505 10.369-41.852-20.648-22.303 10.279-39.904-19.178-11.095a31.11 31.11 0 00-31.18.006L35.73 30.637z"
              stroke="#FF7979"
              strokeWidth={16}
              strokeLinejoin="round"
            />
            <path
              d="M48.34 351.846c-5.075 0-9.963-.658-14.663-1.974-4.638-1.379-8.492-3.29-11.562-5.734l4.7-10.528c6.454 4.512 13.661 6.768 21.62 6.768 4.261 0 7.52-.658 9.776-1.974 2.318-1.379 3.478-3.29 3.478-5.734 0-2.131-1.066-3.791-3.196-4.982-2.068-1.253-5.734-2.444-10.998-3.572-5.89-1.191-10.59-2.632-14.1-4.324-3.447-1.755-5.985-3.854-7.614-6.298-1.567-2.507-2.35-5.609-2.35-9.306 0-4.011 1.096-7.614 3.29-10.81 2.256-3.196 5.39-5.671 9.4-7.426 4.01-1.817 8.648-2.726 13.912-2.726 4.762 0 9.337.689 13.724 2.068 4.386 1.379 7.896 3.259 10.528 5.64l-4.7 10.528c-5.89-4.512-12.377-6.768-19.458-6.768-3.76 0-6.768.752-9.024 2.256-2.256 1.504-3.384 3.541-3.384 6.11 0 1.504.407 2.757 1.222 3.76.877 1.003 2.318 1.911 4.324 2.726 2.005.752 4.856 1.504 8.554 2.256 8.585 1.88 14.758 4.324 18.518 7.332 3.822 3.008 5.734 7.113 5.734 12.314 0 6.267-2.444 11.249-7.332 14.946-4.888 3.635-11.688 5.452-20.398 5.452zm76.726-44.086l-3.666 18.706h8.836v8.836h-10.622L116.512 351h-9.494l3.102-15.698H99.874L96.772 351h-9.494l3.102-15.698h-5.64v-8.836h7.426l3.666-18.706h-9.024v-8.742h10.81l2.914-14.946h9.494l-2.914 14.946h10.246l2.914-14.946h9.494l-2.914 14.946h5.546v8.742h-7.332zm-9.494 0h-10.246l-3.666 18.706h10.246l3.666-18.706zm75.806 23.782c0 5.076-1.755 9.4-5.264 12.972-3.509 3.509-8.241 5.765-14.194 6.768v10.622h-11.468v-10.246c-8.648-.815-15.573-3.259-20.774-7.332l4.794-10.528c5.139 3.76 10.81 5.922 17.014 6.486v-16.92c-4.261-1.128-7.833-2.35-10.716-3.666-2.883-1.316-5.327-3.227-7.332-5.734-1.943-2.569-2.914-5.953-2.914-10.152 0-5.076 1.817-9.431 5.452-13.066 3.697-3.697 8.523-6.047 14.476-7.05v-10.528h11.468v10.434c3.572.501 6.956 1.379 10.152 2.632 3.196 1.191 5.797 2.695 7.802 4.512l-4.794 10.528c-4.512-3.259-9.212-5.327-14.1-6.204v17.484c4.136 1.003 7.614 2.162 10.434 3.478 2.82 1.253 5.17 3.133 7.05 5.64 1.943 2.507 2.914 5.797 2.914 9.87zm-36.19-28.67c0 1.692.533 3.102 1.598 4.23 1.128 1.065 2.695 1.974 4.7 2.726v-14.476c-2.005.564-3.572 1.504-4.7 2.82-1.065 1.253-1.598 2.82-1.598 4.7zm15.792 36.66c3.823-1.128 5.734-3.572 5.734-7.332 0-1.441-.501-2.632-1.504-3.572-.94-1.003-2.35-1.88-4.23-2.632v13.536zm46.023-25.568v18.518c0 2.632.69 4.575 2.068 5.828 1.379 1.191 3.165 1.786 5.358 1.786 1.379 0 2.946-.219 4.7-.658v10.998c-2.256.877-4.982 1.316-8.178 1.316-5.89 0-10.402-1.661-13.536-4.982-3.07-3.321-4.606-7.99-4.606-14.006v-18.8h-9.024v-10.622h9.024v-11.186l14.194-4.606v15.792h12.126v10.622h-12.126zm17.613-29.986l17.578.094-4.418 45.402h-8.648l-4.512-45.496zm16.45 51.888V351h-15.322v-15.134h15.322z"
              fill="#FF7979"
            />
          </svg>
          <Typography.H2>Something has broken</Typography.H2>
          <Typography.H3>
            {caught.status} {caught.statusText}
          </Typography.H3>
        </StyledContainer>
      </ContainerInner>
    </AppLayout>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppLayout>{error.message}</AppLayout>
}
