import classNames from 'classnames';

import { globalHeaderNavList } from './nav';

import styles from './index.module.less';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GlobalHeader = () => {
  const { pathname } = useRouter();

  return (
    <header className={styles.globalHeader}>
      <div className={styles.navWrap}>
        <span className={styles.title}>yuding 的笔记<span className={styles.cursor} /></span>
      </div>
    </header>
  );
};

export default GlobalHeader;
