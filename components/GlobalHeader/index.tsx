import styles from './index.module.less';

const GlobalHeader = () => {
  return (
    <header className={styles.globalHeader}>
      <div className={styles.navWrap}>
        <span className={styles.title}>yuding 的笔记<span className={styles.cursor} /></span>
      </div>
    </header>
  );
};

export default GlobalHeader;
