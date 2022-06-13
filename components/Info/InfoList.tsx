import styles from './Info.module.css'

const InfoList = ({ children }) => {
  return <ul className={styles.Infolist}>{children}</ul>
}

export default InfoList
