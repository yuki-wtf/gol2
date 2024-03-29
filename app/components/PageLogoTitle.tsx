import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import Typography from '~/components/Typography'

interface Props {
  text?: string
  variant: 'default' | 'infinite' | 'creator' | 'howitworks' | 'about' | 'snapshots'
}

const StyledContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
  gap: 16px;
`
const StyledLogo = styled.div`
  max-width: 78px;
`
const StyledPageTitle = styled.div`
  position: relative;
  top: -1px;
  height: 20px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    width: 1px;
    height: 17px;
    background-color: black;
    position: absolute;
    top: 3px;
    left: -1px;
  }
  @media (max-width: 960px) {
    display: none;
  }
`

const PageLogoTitle = ({ text, variant }: Props) => {
  const theme = useTheme()
  return (
    <StyledContainer>
      <StyledLogo>
        <svg width={78} height={27} viewBox="0 0 78 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="path-1"
            fill={theme.colors.logoVariants[variant].path1}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 19.093v-8.341c0-1.09.58-2.099 1.52-2.643l2.768-1.603a2.49 2.49 0 012.496 0l3.437 1.989 3.415-1.985a2.49 2.49 0 012.503 0l2.763 1.603a3.053 3.053 0 011.519 2.642v8.34c0 1.085-.575 2.089-1.508 2.635l-7.974 4.668c-.44.258-.985.258-1.426.001l-8-4.668A3.054 3.054 0 010 19.093z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path2}
            className="path-2"
            d="M3.624 11.136c-1.552-.9-1.552-2.358 0-3.258 1.035-.6 2.713-.6 3.748 0l2.81 1.629-4.684 2.715-1.874-1.086z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path3}
            className="path-3"
            d="M5.498 12.222l4.684-2.715 4.684 2.715-4.23 2.45a1 1 0 01-.908 0l-4.23-2.45z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path4}
            className="path-4"
            d="M10.182 9.507l2.81-1.629c1.035-.6 2.713-.6 3.748 0 1.552.9 1.552 2.358 0 3.258l-1.874 1.086-4.684-2.715z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path5}
            className="path-5"
            d="M3.624 22c-1.552-.9-1.552-2.359 0-3.259 1.035-.6 2.713-.6 3.748 0l2.81 1.63-4.684 2.714-1.874-1.086z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path6}
            className="path-6"
            d="M5.498 23.085l4.684-2.715 4.684 2.715-4.23 2.451a1.001 1.001 0 01-.908 0l-4.23-2.451z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path7}
            className="path-7"
            d="M10.182 20.37l2.81-1.629c1.035-.6 2.713-.6 3.748 0 1.552.9 1.552 2.359 0 3.258l-1.874 1.086-4.684-2.715z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path8}
            className="path-8"
            opacity={0.3}
            d="M10.79 16.74c0-.29.204-.643.455-.788l3.618-2.097c2.439-1.412 4.415-.273 4.415 2.545 0 1.879-1.317 4.165-2.942 5.108l-5.09 2.953c-.252.146-.456.029-.456-.261v-7.46z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path9}
            className="path-9"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M53.45 7.283v14.981H64.1V15.67h-1.634v4.962h-7.383V7.283h-1.634zm.69.69v13.6h9.268-9.268v-13.6zm9.017 8.387v4.962-4.962zm14.036 5.214h-8.79v-3.93c0-.62.1-1.074.302-1.36.202-.302.563-.537 1.083-.705-.518.167-.877.401-1.08.7l-.003.006-.001.002c-.2.285-.301.738-.301 1.358v3.929h8.79zm-8.311-13.6v.251h5.062c.756 0 1.352.135 1.788.403.437.252.655.764.655 1.537v2.291c0 .32-.067.58-.201.781-.135.185-.311.32-.53.403h.002l.021-.009c.208-.084.377-.216.506-.394l.007-.01.006-.01c.126-.198.189-.452.189-.76v-2.293c0-.734-.197-1.233-.592-1.497l-.005-.003a1.112 1.112 0 00-.058-.036c-.436-.268-1.032-.403-1.788-.403H68.88v-.252zm-1.17 9.67c0-.662.102-1.289.424-1.75.322-.478.845-.78 1.438-.971h.002l5.845-1.932a.455.455 0 00.197-.148c.036-.06.078-.175.078-.387v-2.291c0-.668-.186-.867-.31-.938l-.008-.005-.008-.006c-.288-.177-.742-.3-1.426-.3H68.19V7.283h5.753c.925 0 1.742.17 2.37.593.75.485 1.016 1.343 1.016 2.288v2.292c0 .473-.101.937-.385 1.314-.23.328-.543.569-.91.73l-.03.013-5.891 1.946c-.406.146-.583.294-.65.385l-.007.01-.007.009c-.035.043-.13.245-.13.782v2.986h8.564v1.633H67.712v-4.62z"
          />
          <path
            fill={theme.colors.logoVariants[variant].path10}
            stroke={theme.colors.logoVariants[variant].path10}
            className="path-10"
            d="M28.024 21.214h0l.008.007c.39.293.907.493 1.525.616.618.124 1.399.183 2.334.183h5.358v-5.753h-.943v4.811h-4.415c-.834 0-1.52-.056-2.06-.164-.544-.108-.918-.263-1.152-.443-.453-.36-.724-1.006-.724-2.045v-7.052c0-1.068.253-1.725.662-2.082h0l.005-.004c.201-.182.52-.339.987-.449.465-.11 1.056-.167 1.779-.167h4.702v-.943h-4.702c-.822 0-1.522.064-2.094.198-.57.134-1.037.342-1.366.651-.64.6-.916 1.566-.916 2.796v7.052c0 .61.061 1.146.19 1.604l.002.008.002.009c.156.466.43.858.818 1.167zm20.569-.02h0l.003-.003c.594-.526.891-1.21.891-2.024v-5.314c0-.814-.296-1.494-.893-2.008-.619-.545-1.695-.77-3.109-.77-1.412 0-2.485.224-3.094.773-.583.515-.871 1.194-.871 2.005v5.314c0 .811.288 1.495.87 2.02h0l.003.004c.31.273.735.459 1.244.577.512.119 1.13.176 1.848.176 1.415 0 2.49-.218 3.108-.75zm-4.711-.266c-.422-.095-.709-.23-.891-.384-.4-.35-.6-.8-.6-1.377v-5.314c0-.579.2-1.02.598-1.358h0l.004-.003c.182-.16.47-.299.89-.397.42-.097.952-.148 1.602-.148 1.324 0 2.123.214 2.514.547h0l.004.004c.408.338.613.78.613 1.355v5.314c0 .575-.204 1.023-.615 1.374-.392.324-1.193.532-2.516.532-.65 0-1.183-.05-1.603-.145z"
            strokeWidth={0.690748}
          />
        </svg>
      </StyledLogo>
      {text && (
        <StyledPageTitle>
          <Typography.GolRegular color={theme.colors.logoVariants[variant].text}>{text} </Typography.GolRegular>
        </StyledPageTitle>
      )}
    </StyledContainer>
  )
}

export default PageLogoTitle
