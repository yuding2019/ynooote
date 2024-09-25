import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import zhCN from 'dayjs/locale/zh-cn';

import ContentNavigation from '../components/ContentNavigation';
import { ContentNavigateProvider } from '../components/ContentNavigation/context';
import './_app.css';

import { SPACING, THEME_TOKENS } from '../styles/variables.stylex';

const cursorFlash = stylex.keyframes({
  '50%': {
    visibility: 'hidden',
  },
});

const SCREEN_BREAK_POINT = '@media (max-width: 800px)';

const SCROLL_CONTAINER_ID = 'app-scroll-container';

const styles = stylex.create({
  wrapper: {
    width: '100%',
    minWidth: 1280,
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
    backgroundColor: THEME_TOKENS.backgroundColor,
    [SCREEN_BREAK_POINT]: {
      display: 'block',
      overflow: 'auto',
      minWidth: '100%',
    },
  },
  info: {
    flex: 2,
    height: '100%',
    padding: `${SPACING.lg} 0`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    backgroundColor: 'transparent',
    [SCREEN_BREAK_POINT]: {
      width: '100%',
      height: 'fit-content',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      // ios只在-webkit-前缀下支持backdrop-filter
      '-webkit-backdrop-filter': 'blur(16px)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 9999,
    },
  },
  title: {
    width: '100%',
    fontSize: 48,
    fontWeight: 200,
    lineHeight: 1.5,
    paddingRight: 64,
    textAlign: 'end',
    [SCREEN_BREAK_POINT]: {
      fontSize: 32,
      paddingRight: 0,
      paddingLeft: SPACING.xl,
      textAlign: 'start',
    },
  },
  cursor: {
    display: 'inline-block',
    marginLeft: 8,
    animation: `${cursorFlash} 1.6s steps(1) infinite`,
  },
  content: {
    flex: 3,
    height: '100%',
    position: 'relative',
    overflow: 'auto',
    backgroundColor: THEME_TOKENS.lightBackgroundColor,
    transition: 'all 0.3s ease-in-out',
    [SCREEN_BREAK_POINT]: {
      width: '100%',
      height: 'fit-content',
    },
  },
  largeContent: {
    flex: 4,
    backgroundColor: THEME_TOKENS.backgroundColor,
  },
  loadFont: {
    display: 'none',
    position: 'absolute',
    top: -9999,
    left: -9999,
    pointerEvents: 'none',
    userSelect: 'none',
    fontFamily: 'JetBrains Mono',
  },
});

dayjs.locale(zhCN);

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>building...</div>
  }

  const outOfIndexPage = router.pathname !== '/';

  return (
    <div {...stylex.props(styles.wrapper)}>
      <Head>
        <title>yuding 的笔记</title>
        <link
          rel="shortcut icon"
          href={`${process.env.BASE_PATH || ''}/favicon.ico`}
          type="image/x-icon"
        />
        <meta name="google-site-verification" content="HRWXPoUq-hDGzLwQlK8QNFBIAWM9E7OluBbNQPopMjQ" />
        <meta name="google-adsense-account" content="ca-pub-9448338216770987" />
      </Head>

      <ContentNavigateProvider>
        <div {...stylex.props(styles.info)}>
          <div {...stylex.props(styles.title)}>
            yuding 的笔记
            <span {...stylex.props(styles.cursor)}>_</span>
          </div>
          <ContentNavigation scrollId={SCROLL_CONTAINER_ID} />
        </div>

        <div
          {...stylex.props(
            styles.content,
            outOfIndexPage && styles.largeContent,
          )}
          id={SCROLL_CONTAINER_ID}
        >
          <Component {...pageProps} />
        </div>
      </ContentNavigateProvider>

      <div {...stylex.props(styles.loadFont)}>to-load-font-should-hide</div>
    </div>
  );
};

export default App;
