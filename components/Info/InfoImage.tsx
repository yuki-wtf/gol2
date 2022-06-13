import Image from 'next/image'
import styles from './Info.module.css'

const InfoImage = ({ url, alt = null, width, height, backgroundColor = ' var(--howitworks-primary)' }) => {
  return (
    <div
      className={styles.InfoImageContainer}
      style={{
        backgroundColor,
        paddingTop: 88,
        paddingBottom: 88,
      }}
    >
      <Image src={url} alt={alt} width={width} height={height} style={{}}></Image>
    </div>
  )
}

export default InfoImage
