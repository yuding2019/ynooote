import classNames from 'classnames';

import { globalHeaderNavList } from './nav';

import styles from './index.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GlobalHeader = () => {
  const { pathname } = useRouter();

  return (
    <header className={styles.globalHeader}>
      <ul className={styles.navWrap}>
        <span className={styles.title}>yuding 的笔记<span className={styles.cursor} /></span>
        {/* {globalHeaderNavList.map((item) => {
          return (
            <li
              className={classNames(styles.navItem, {
                [styles.active]: pathname === item.path
              })}
              key={item.path}
            >
              <Link href={item.path}>
                <span className={styles.text}>{item.title}</span>
              </Link>
            </li>
          )
        })} */}
      </ul>
    </header>
  );
};

export default GlobalHeader;
