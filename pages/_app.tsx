import { useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './_app.module.scss';
import '../styles/styles.scss';

const MDX_PAGE_COMPONENT_NAME = 'MDXContent';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    document.title = 'woooooh';
  }, []);

  const pageComponent = Component.name === MDX_PAGE_COMPONENT_NAME
    ? <Component {...pageProps} components={{ h2: () => 2333 }} />
    : <Component {...pageProps} />;

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>{router.pathname}</header>
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          {pageComponent}
        </div>
      </div>
    </section>
  )
};

export default App;
