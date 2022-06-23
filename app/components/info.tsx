import styled from 'styled-components'
import { motion, MotionStyle } from 'framer-motion'

export const InfoList = styled.ul`
  margin-top: 32px;
  /* padding: 0; */
  padding-left: 16px;
  list-style-type: disc;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--color-text-icon-text-100);
`

export const InfoListItem = styled.li`
  line-height: 26px;
  font-size: 16px;
  margin-bottom: 8px;
`

export interface InfoParagraphProps {
  readonly weight?: number
  readonly italic?: boolean
}

export const InfoParagraph = styled.p<InfoParagraphProps>`
  font-size: 16px;
  line-height: 170%;
  padding-bottom: 0;
  margin-bottom: 0;
  margin-top: 0;
  color: var(--color-text-icon-text-100);
  font-weight: ${(p) => p.weight ?? 500};
  font-style: ${(p) => (p.italic === true ? 'italic' : 'normal')};
`

export const InfoSection = styled.section`
  border-left: 2px solid;
  padding-left: 32px;
  margin-bottom: 96px;
`

export const InfoImageContainer = styled.div`
  background-color: var(--howitworks-primary);
  width: 100%;
  margin: 48px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & + p {
    margin-top: 88px;
  }
`

export interface InfoImageProps {
  readonly url: string
  readonly alt?: string
  readonly width?: string | number
  readonly height?: string | number
  readonly backgroundColor?: string
}

export function InfoImage({
  url,
  alt = null,
  width,
  height,
  backgroundColor = ' var(--howitworks-primary)',
}: InfoImageProps) {
  return (
    <InfoImageContainer
      style={{
        backgroundColor,
        paddingTop: 88,
        paddingBottom: 88,
      }}
    >
      <img src={url} alt={alt} width={width} height={height} />
    </InfoImageContainer>
  )
}

const Heading = styled.h3`
  font-size: 20px;
  line-height: 26px;
  font-weight: 500;
  text-transform: uppercase;
  color: inherit;
  margin-top: 0;
`

interface InfoHeadingProps {
  readonly text: string
}

export function InfoHeading({ text }: InfoHeadingProps) {
  return (
    <div>
      <Heading>{text}</Heading>
    </div>
  )
}

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
`

interface InfoGridProps {
  readonly color?: MotionStyle['color']
  readonly children?: React.ReactNode
}

export function InfoGrid({ children, color }: InfoGridProps) {
  return (
    <Container
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.3,
        duration: 1,
      }}
      style={{
        color: color,
      }}
    >
      {children}
    </Container>
  )
}
