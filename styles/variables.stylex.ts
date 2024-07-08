import { defineVars } from '@stylexjs/stylex';

// const DARK_MEDIA_QUERY = '@media (prefers-color-scheme: dark)';


export const THEME_TOKENS = defineVars({
  backgroundColor: {
    default: '#f1f5f9',
  },
  backgroundColorHover: {
    default: '#e2e8f0',
  },
  lightBackgroundColor: {
    default: '#fff',
  },

  primaryTextColor: {
    default: '#4b5563',
  },
  primaryTextColorHover: {
    default: '#030712',
  },
  secondaryTextColor: {
    default: '#9ca3af',
  },
  secondaryTextColorHover: {
    default: '#6b7280',
  },
  descriptionTextColor: {
    default: '#d1d5db',
  },
  descriptionTextColorHover: {
    default: '#9ca3af',
  },

  borderColor: {
    default: '#f1f5f9',
  },
});

const SCREEN_BREAK_POINT = '@media (max-width: 800px)';

export const SPACING = defineVars({
  sm: {
    default: '8px',
    [SCREEN_BREAK_POINT]: '4px',
  },
  md: {
    default: '16px',
    [SCREEN_BREAK_POINT]: '8px',
  },
  lg: {
    default: '24px',
    [SCREEN_BREAK_POINT]: '16px',
  },
  xl: {
    default: '32px',
    [SCREEN_BREAK_POINT]: '24px',
  },
  exl: {
    default: '64px',
    [SCREEN_BREAK_POINT]: '24px',
  },
});

export const FONT_SIZE = defineVars({
  heading1: {
    default: '22px',
    [SCREEN_BREAK_POINT]: '20px',
  },
  heading2: {
    default: '20px',
    [SCREEN_BREAK_POINT]: '18px',
  },
  heading3: {
    default: '18px',
    [SCREEN_BREAK_POINT]: '16px',
  },
  heading4: {
    default: '16px',
    [SCREEN_BREAK_POINT]: '14px',
  },
  heading5: {
    default: '15px',
    [SCREEN_BREAK_POINT]: '13px',
  },
  heading6: {
    default: '13px',
    [SCREEN_BREAK_POINT]: '12px',
  },
});
