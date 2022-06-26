import Head from 'next/head';
import dayjs from 'dayjs';
import zhCN from 'dayjs/locale/zh-cn';

import GlobalHeader from '../components/GlobalHeader';

import styles from './_app.module.scss';
import '../styles/styles.scss';
import '../components/MDXCompoents/mdx-component.scss';

dayjs.locale(zhCN);

const App = ({ Component, pageProps }) => {
  return (
    <section className={styles.wrap}>
      <Head>
        <title>woooooh</title>
      </Head>

      <GlobalHeader />
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </div>
    </section>
  )
};

export default App;
