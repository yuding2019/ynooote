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
    padding: `${SPACING.xl} ${SPACING.lg}`,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(16px)',
    zIndex: 10,
    opacity: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },

  navigate: {
    whiteSpace: 'nowrap',
    transform: 'translateX(-100%)',
    opacity: 0,
    animation: `${fadeIn} 0.3s ease-in forwards`,
    padding: `${SPACING.sm} ${SPACING.md}`,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 400,
    color: THEME_TOKENS.secondaryTextColor,
    position: 'relative',
    cursor: 'pointer',
    ':last-child': {
      marginBottom: 0,
    },
    ':hover': {
      color: THEME_TOKENS.secondaryTextColorHover,
      background: '#e2e8f0',
      backdropFilter: 'blur(24px)',
    },
  },

  level1: {
    fontSize: 14,
    fontWeight: 500,
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
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    fontFamily: 'JetBrains Mono',
    ':hover': {
      background: '#e2e8f0',
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
                styles.animationDelay(index),
                activeId === navigate.id && styles.activeNavigate,
              )}
              onClick={() => handleClick(navigate)}
            >
              <span {...stylex.props(styles[`level${normalizeLevel(navigate.level)}`])}>{navigate.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentNavigation;
