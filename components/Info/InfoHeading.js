import styles from "./Info.module.css";
const InfoHeading = ({ text }) => {
  return (
    <div>
      <h3 className={styles.heading}>{text}</h3>
    </div>
  );
};

export default InfoHeading;
