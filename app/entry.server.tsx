import type { EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const sheet = new ServerStyleSheet()

  let markup = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <RemixServer context={remixContext} url={request.url} />
    </StyleSheetManager>
  )
  const styleTags = sheet.getStyleTags()

  sheet.seal()

  markup = markup.replace('__STYLES__', styleTags)

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
