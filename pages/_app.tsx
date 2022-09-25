import Head from "next/head";
import dayjs from "dayjs";
import zhCN from "dayjs/locale/zh-cn";
import classNames from "classnames";

import GlobalHeader from "../components/GlobalHeader";

import { APP_CONTENT_CLASS_NAME } from "../common/constant";

import styles from "./_app.module.scss";
import "../styles/styles.scss";
import "../components/MDXComponents/mdx-component.scss";

dayjs.locale(zhCN);

const App = ({ Component, pageProps }) => {
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
        <Component {...pageProps} />
      </div>
      <div className={styles.empty}>loading font</div>
    </section>
  );
};

export default App;
