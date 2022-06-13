import React from 'react'
import styles from './Info.module.css'

const InfoListItem = ({ children }) => {
  return <li className={styles.InfoListItem}>{children}</li>
}

export default InfoListItem
