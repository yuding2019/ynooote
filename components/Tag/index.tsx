import stylex from '@stylexjs/stylex';

import { THEME_TOKENS } from '../../styles/variables.stylex';

export interface TagProps {
  content: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const styles = stylex.create({
  tag: {
    fontSize: 13,
    lineHeight: 1.2,
    padding: '4px 8px',
    fontWeight: 300,
    color: THEME_TOKENS.secondaryTextColor,
    backgroundColor: '#f1f5f9',
    transition: 'color 0.1s ease-in',
    borderRadius: 6,
    '@media (max-width: 800px)': {
      fontSize: 11,
      fontWeight: 200,
    },
  },
  selectable: {
    cursor: 'pointer',
    ':hover': {
      color: THEME_TOKENS.secondaryTextColorHover,
      backgroundColor: '#e2e8f0',
    },
  },
  selected: {
    color: '#fff',
    backgroundColor: '#2563eb',
    ':hover': {
      color: '#fff',
      backgroundColor: '#1d4ed8',
    },
  },
});

const Tag: React.FC<TagProps> = (props) => {
  const { content, isSelected, onClick } = props;
  return (
    <div
      {...stylex.props(
        styles.tag,
        !!onClick && styles.selectable,
        isSelected && styles.selected,
      )}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default Tag;
