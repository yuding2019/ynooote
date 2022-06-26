import Head from 'next/head';

import GlobalHeader from '../components/GlobalHeader';

import styles from './_app.module.scss';
import '../styles/styles.scss';

const MDX_PAGE_COMPONENT_NAME = 'MDXContent';

const App = ({ Component, pageProps }) => {
  const pageComponent = Component.name === MDX_PAGE_COMPONENT_NAME
    ? <Component {...pageProps} components={{ h2: () => 2333 }} />
    : <Component {...pageProps} />;

  return (
    <section className={styles.wrap}>
      <Head>
        <title>woooooh</title>
      </Head>

      <GlobalHeader />
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          {pageComponent}
        </div>
      </div>
    </section>
  )
};

export default App;
