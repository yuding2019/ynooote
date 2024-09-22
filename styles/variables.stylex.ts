import { create, defineVars } from '@stylexjs/stylex';

// const DARK_MEDIA_QUERY = '@media (prefers-color-scheme: dark)';
const SCREEN_BREAK_POINT = '@media (max-width: 800px)';

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
  primaryDarkTextColor: {
    default: '#000',
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

export const SPACING = defineVars({
  sm: {
    default: '8px',
    [SCREEN_BREAK_POINT]: '4px',
  },
  md: {
    default: '12px',
    [SCREEN_BREAK_POINT]: '6px',
  },
  lg: {
    default: '16px',
    [SCREEN_BREAK_POINT]: '8px',
  },
  xl: {
    default: '24px',
    [SCREEN_BREAK_POINT]: '12px',
  },
  exl: {
    default: '32px',
    [SCREEN_BREAK_POINT]: '16px',
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

export const FONT_WEIGHT = defineVars({
  bold: {
    default: 600,
    [SCREEN_BREAK_POINT]: 400,
  },
});

export const FONT = create({
  heading1: {
    lineHeight: 1.2,
    fontWeight: FONT_WEIGHT.bold,
    color: THEME_TOKENS.primaryDarkTextColor,
    fontSize: {
      default: 28,
      [SCREEN_BREAK_POINT]: 24,
    },
  },
  heading2: {
    lineHeight: 1.2,
    fontWeight: FONT_WEIGHT.bold,
    color: THEME_TOKENS.primaryDarkTextColor,
    fontSize: {
      default: 24,
      [SCREEN_BREAK_POINT]: 20,
    },
  },
  heading3: {
    lineHeight: 1.2,
    fontWeight: FONT_WEIGHT.bold,
    color: THEME_TOKENS.primaryDarkTextColor,
    fontSize: {
      default: 20,
      [SCREEN_BREAK_POINT]: 18,
    },
  },
  heading4: {
    lineHeight: 1.2,
    fontWeight: FONT_WEIGHT.bold,
    color: THEME_TOKENS.primaryDarkTextColor,
    fontSize: {
      default: 18,
      [SCREEN_BREAK_POINT]: 16,
    },
  },
  heading5: {
    lineHeight: 1.2,
    fontWeight: FONT_WEIGHT.bold,
    color: THEME_TOKENS.primaryDarkTextColor,
    fontSize: {
      default: 16,
      [SCREEN_BREAK_POINT]: 14,
    },
  },
  heading6: {
    lineHeight: 1.2,
    fontWeight: FONT_WEIGHT.bold,
    color: THEME_TOKENS.primaryDarkTextColor,
    fontSize: {
      default: 14,
      [SCREEN_BREAK_POINT]: 12,
    },
  },
});
