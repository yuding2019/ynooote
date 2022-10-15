import styles from "./index.module.less";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
