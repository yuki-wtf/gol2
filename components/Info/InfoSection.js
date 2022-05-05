import styles from "./Info.module.css";
const InfoSection = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

export default InfoSection;
