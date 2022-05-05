import styles from "./Info.module.css";
import { motion } from "framer-motion";
const InfoGrid = ({ children, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      style={{ color: color }}
      className={styles.container}
    >
      {children}
    </motion.div>
  );
};

export default InfoGrid;
