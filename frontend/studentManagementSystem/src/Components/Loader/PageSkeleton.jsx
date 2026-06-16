import styles from "./PageSkeleton.module.css";
const PageSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${styles.skeleton}`}></div>

      <div className={styles.cards}>
        <div className={`${styles.card} ${styles.skeleton}`}></div>
        <div className={`${styles.card} ${styles.skeleton}`}></div>
        <div className={`${styles.card} ${styles.skeleton}`}></div>
      </div>

      <div className={`${styles.table} ${styles.skeleton}`}></div>
    </div>
  );
};

export default PageSkeleton;
