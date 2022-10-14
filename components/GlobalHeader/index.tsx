import { useEffect, useRef } from 'react';
import { GLOBAL_EVENT_NAME } from '../../common/constant';

import Emit from '../../common/emit';

import styles from './index.module.less';

const GlobalHeader = () => {
  const routerChangeProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!routerChangeProgressRef.current) {
      return;
    }

    const off = Emit.on(GLOBAL_EVENT_NAME.ROUTER_CHANGE, (startProgress: boolean) => {
      if (startProgress) {
        routerChangeProgressRef.current.style.display = 'block';
        routerChangeProgressRef.current.style.width = '100%';
      } else {
        routerChangeProgressRef.current.style.display = 'none';
        routerChangeProgressRef.current.style.width = '0';
      }
    });

    return off;
  }, []);

  return (
    <header className={styles.globalHeader}>
      <div className={styles.navWrap}>
        <span className={styles.title}>yuding 的笔记<span className={styles.cursor} /></span>
      </div>
      <div className={styles.progress} ref={routerChangeProgressRef} />
    </header>
  );
};

export default GlobalHeader;
