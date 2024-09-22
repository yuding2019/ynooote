import { create } from '@stylexjs/stylex';

import { SPACING, THEME_TOKENS } from '../styles/variables.stylex';

const SCREEN_BREAK_POINT = '@media (max-width: 800px)';

export const styles = create({
  wrapper: {
    width: '100%',
    height: 2000,
    display: 'flex',
    flexDirection: 'column',
    padding: SPACING.xl,
    overflow: 'visible',
  },
  note: {
    width: '100%',
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.xl,
    borderBottom: `1px solid ${THEME_TOKENS.borderColor}`,
    ':last-child': {
      borderBottom: 'none',
    },
  },
  title: {
    display: 'inline-block',
    color: THEME_TOKENS.primaryTextColor,
    fontSize: 22,
    lineHeight: 1.5,
    fontWeight: 300,
    marginBottom: SPACING.md,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.2s ease-in',
    ':hover': {
      color: THEME_TOKENS.primaryTextColorHover,
      textDecoration: 'underline',
    },
    [SCREEN_BREAK_POINT]: {
      fontWeight: 300,
    }
  },
  time: {
    fontSize: 12,
    color: THEME_TOKENS.secondaryTextColor,
    display: 'inline-block',
    width: 'fit-content',
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: '50%',
    left: -150,
    transform: 'translateY(-50%)',
    zIndex: 999,
    fontFamily: 'JetBrains Mono',
  },
  tagsWrap: {
    display: 'flex',
    gap: SPACING.md,
    flexWrap: 'wrap',
  },
});
