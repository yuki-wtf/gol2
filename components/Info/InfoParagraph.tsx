import styles from './Info.module.css'

const InfoParagraph = ({ text, italic = false, weight = 500 }) => {
  return (
    <p
      className={styles.paragraph}
      style={{
        fontWeight: weight,
        fontStyle: italic ? 'italic' : 'normal',
      }}
    >
      {text}
    </p>
  )
}

export default InfoParagraph
