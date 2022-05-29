import { useEffect } from 'react';

import styles from './_app.module.scss';
import '../styles/styles.scss';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'woooooh';
  }, []);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>{router.pathname}</header>
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </div>
    </section>
  )
}

export default App;
