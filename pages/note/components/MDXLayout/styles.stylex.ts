import stylex from '@stylexjs/stylex';

import { SPACING, THEME_TOKENS } from '../../../../styles/variables.stylex';

export const styles = stylex.create({
  wrapper: {
    padding: `${SPACING.xl} ${SPACING.exl}`,
  },
  title: {
    fontSize: 32,
    fontWeight: 100,
    marginBottom: SPACING.xl,
  },
});

export const mdxComponentStyles = stylex.create({
  paragraph: {
    fontSize: 16,
    lineHeight: 2,
    fontWeight: 400,
    color: THEME_TOKENS.primaryTextColor,
    marginBottom: SPACING.lg,
    textAlign: 'justify',
    ':hover': {
      color: THEME_TOKENS.primaryTextColorHover,
    },
    ':last-child': {
      marginBottom: 0,
    },
  },

  heading: {
    lineHeight: 2,
    marginTop: SPACING.md,
    color: THEME_TOKENS.primaryTextColorHover,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 500,
  },
  heading2: {
    fontSize: 22,
    fontWeight: 500,
  },
  heading3: {
    fontSize: 20,
    fontWeight: 500,
  },
  heading4: {
    fontSize: 18,
    fontWeight: 500,
  },
  heading5: {
    fontSize: 16,
    fontWeight: 500,
  },
  heading6: {
    fontSize: 14,
    fontWeight: 500,
  },

  anchor: {
    color: THEME_TOKENS.primaryTextColor,
    textDecoration: 'none',
    ':hover': {
      color: THEME_TOKENS.primaryTextColorHover,
      textDecoration: 'underline',
    },
  },

  blockquote: {
    backgroundColor: THEME_TOKENS.backgroundColor,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    position: 'relative',
    whiteSpace: 'pre-wrap',
    textAlign: 'justify',
    '::before': {
      position: 'absolute',
      content: '',
      width: 4,
      top: 0,
      left: -4,
      bottom: 0,
      backgroundColor: '#3b82f6',
    },
    ':hover': {
      backgroundColor: THEME_TOKENS.backgroundColorHover,
    },
  },

  pre: {
    fontSize: 13,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    position: 'relative',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    overflow: 'auto',
    border: '1px solid #e2e8f0',
  },
  codeLine: {
    fontSize: 13,
    minWidth: 'fit-content',
    whiteSpace: 'pre',
  },
  codeLineOrder: {
    display: 'inline-block',
    width: 22,
    textAlign: 'end',
    marginRight: 6,
    paddingRight: 6,
    borderRight: '1px solid #e2e8f0',
    color: THEME_TOKENS.descriptionTextColor,
  },

  image: {
    width: '100%',
    maxWidth: 360,
    display: 'block',
    margin: '0 auto',
    '@media (max-width: 800px)': {
      maxWidth: '100%',
    },
  },

  list: {
    fontSize: 16,
    lineHeight: 1.5,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    color: THEME_TOKENS.primaryTextColor,
  },
  listItem: {
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.sm,
    position: 'relative',
    transition: 'all 0.15s',
    ':last-child': {
      marginBottom: 0,
    },
    '::before': {
      position: 'absolute',
      content: '',
      width: 6,
      height: 6,
      top: 8,
      left: -6,
      borderRadius: '50%',
      background: 'currentColor',
    },
    ':hover': {
      color: THEME_TOKENS.primaryTextColorHover,
    },
  },
});
