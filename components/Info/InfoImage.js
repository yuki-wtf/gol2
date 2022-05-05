import styles from "./Info.module.css";
const InfoImage = ({
  url,
  alt,
  width = "100%",
  backgroundColor = " var(--howitworks-primary)",
}) => {
  return (
    <div className={styles.InfoImageContainer} style={{ backgroundColor }}>
      <img
        src={url}
        alt={alt}
        className={styles.InfoImage}
        style={{ width: width }}
      ></img>
    </div>
  );
};

export default InfoImage;
