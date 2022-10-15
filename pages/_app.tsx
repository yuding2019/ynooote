import { useState, useEffect } from 'react';
import Head from "next/head";
import dayjs from "dayjs";
import zhCN from "dayjs/locale/zh-cn";
import classNames from "classnames";

import GlobalHeader from "../components/GlobalHeader";

import { APP_CONTENT_CLASS_NAME, GLOBAL_EVENT_NAME } from "../common/constant";

import styles from "./_app.module.less";
import "../styles/styles.less";
import "../components/MDXComponents/mdx-component.less";
import Loading from "../components/Loading";
import Emit from '../common/emit';

dayjs.locale(zhCN);

const App = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const off = Emit.on(GLOBAL_EVENT_NAME.ROUTING_START, () => {
      setIsLoading(true);
    });
    return () => {
      setIsLoading(false);
      off();
    }
  }, [Component]);

  return (
    <section className={styles.wrap}>
      <Head>
        <title>yuding 的笔记</title>
        <link
          rel="shortcut icon"
          href={`${process.env.BASE_PATH || ""}/favicon.ico`}
          type="image/x-icon"
        />
      </Head>

      <GlobalHeader />
      <div className={classNames(styles.contentWrap, APP_CONTENT_CLASS_NAME)}>
        {isLoading ? <Loading /> : <Component {...pageProps} />}
      </div>
      <div className={styles.empty}>to-load-font-should-hide</div>
    </section>
  );
};

export default App;
