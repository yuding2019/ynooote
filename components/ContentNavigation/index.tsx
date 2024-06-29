import { useState } from 'react';

import { useRouter } from 'next/router';

import stylex from '@stylexjs/stylex';

import { ContentNavigate } from '../../common/types';
import { isMobile } from '../../common/utils';
import { useContentNavigationContext } from './context';

import { SPACING, THEME_TOKENS } from '../../styles/variables.stylex';

interface ContentNavigationProps {
  scrollId: string;
}

const fadeIn = stylex.keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-20%)',
  },

  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const styles = stylex.create({
  navigation: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transition: 'all 0.3s ease-in',
    transformOrigin: 'left',
    opacity: 0,
    display: 'none',
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },

  show: {
    padding: `${SPACING.xl} ${SPACING.exl}`,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(16px)',
    zIndex: 10,
    opacity: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },

  navigate: {
    whiteSpace: 'nowrap',
    transform: 'translateX(-100%)',
    opacity: 0,
    animation: `${fadeIn} 0.3s ease-in forwards`,
    marginBottom: SPACING.md,
    fontSize: 14,
    fontWeight: 300,
    color: THEME_TOKENS.secondaryTextColor,
    position: 'relative',
    cursor: 'pointer',
    ':last-child': {
      marginBottom: 0,
    },
    '::before': {
      content: '',
      position: 'absolute',
      top: '50%',
      left: -24,
      width: 12,
      height: 1,
      opacity: 0.5,
      backgroundColor: 'currentColor',
    },
    ':hover': {
      color: THEME_TOKENS.secondaryTextColorHover,
    },
  },

  level1: {
    fontSize: 16,
    fontWeight: 400,
  },
  level2: {
    marginLeft: 4,
  },
  level3: {
    marginLeft: 8,
  },
  level4: {
    marginLeft: 12,
  },
  level5: {
    marginLeft: 16,
  },
  level6: {
    marginLeft: 20,
  },

  activeNavigate: {
    color: THEME_TOKENS.primaryTextColor,
  },

  animationDelay: (index) => ({
    animationDelay: `${index * 0.05}s`,
  }),

  back: {
    borderRadius: 8,
    padding: 12,
    paddingRight: 18,
    marginBottom: SPACING.lg,
    cursor: 'pointer',
    background: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    fontFamily: 'JetBrains Mono',
    ':hover': {
      background: '#cbd5e1',
    },
  },
  backIcon: {
    display: 'inline-block',
    width: 16,
    height: 16,
  },
  backText: {
    fontSize: 15,
    fontWeight: 500,
    display: 'inline-block',
    flex: 1,
    textAlign: 'center',
  },
});

const backIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

const ContentNavigation: React.FC<ContentNavigationProps> = (props) => {
  const { scrollId } = props;
  const router = useRouter();

  const { navigates } = useContentNavigationContext();

  const [activeId, setActiveId] = useState(navigates[0]?.id);

  const minLevel = Math.min(...navigates.map((navigate) => navigate.level));
  const normalizeLevel = (level: number) => {
    return level - minLevel + 1;
  };

  const handleClick = (nav: ContentNavigate) => {
    document
      .querySelector(`#${nav.id}`)
      ?.scrollIntoView({ behavior: 'smooth' });

    setActiveId(nav.id);
  };

  if (isMobile()) {
    return null;
  }

  return (
    <div {...stylex.props(styles.navigation, navigates.length && styles.show)}>
      <div>
        <div {...stylex.props(styles.back)} onClick={() => router.back()}>
          <span {...stylex.props(styles.backIcon)}>{backIcon}</span>
          <span {...stylex.props(styles.backText)}>return</span>
        </div>
        {navigates.map((navigate: ContentNavigate, index) => {
          return (
            <div
              key={navigate.id}
              {...stylex.props(
                styles.navigate,
                styles[`level${normalizeLevel(navigate.level)}`],
                styles.animationDelay(index),
                activeId === navigate.id && styles.activeNavigate,
              )}
              onClick={() => handleClick(navigate)}
            >
              {navigate.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentNavigation;
