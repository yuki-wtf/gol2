import styles from "./Spacer.module.css";
const Spacer = ({ size = 16 }) => {
  return <div className={styles.Spacer} style={{ height: size }} />;
};

export default Spacer;
