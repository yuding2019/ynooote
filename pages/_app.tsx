import { useRouter } from 'next/router';
import Head from 'next/head';
import dayjs from 'dayjs';
import zhCN from 'dayjs/locale/zh-cn';

import GlobalHeader from '../components/GlobalHeader';

import styles from './_app.module.scss';
import '../styles/styles.scss';
import '../components/MDXCompoents/index.scss';

import { useEffect, useState } from 'react';

dayjs.locale(zhCN);

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setShowBack(router.pathname !== '/');
  }, [router.pathname]);

  const handleBack = () => {
    router.replace('/');
  }

  return (
    <section className={styles.wrap}>
      <Head>
        <title>woooooh</title>
      </Head>

      <GlobalHeader />
      <div className={styles.contentWrap}>
        {showBack && (
          <div className={styles.back} onClick={handleBack}>返回列表</div>
        )}
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </div>
    </section>
  )
};

export default App;
