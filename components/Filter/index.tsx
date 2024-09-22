import stylex from '@stylexjs/stylex';

import Tag from '../Tag';

import { THEME_TOKENS } from '../../styles/variables.stylex';

export interface FilterProps {
  tags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
}

const SCREEN_BREAK_POINT = '@media (max-width: 800px)';

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
    padding: '32px 0',
    borderBottom: `1px solid ${THEME_TOKENS.borderColor}`,
    fontSize: 15,
    lineHeight: 1.5,
    color: THEME_TOKENS.primaryTextColor,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px)',
    position: 'sticky',
    top: 0,
    [SCREEN_BREAK_POINT]: {
      display: 'none',
    },
  },
});

const Filter: React.FC<FilterProps> = (props) => {
  const { tags, selected, onChange } = props;

  return (
    <div {...stylex.props(styles.wrapper)}>
      <span>分类标签：</span>
      {tags.map((tag) => {
        return (
          <Tag
            isSelected={selected.includes(tag)}
            key={tag}
            content={tag}
            onClick={() => {
              if (selected.includes(tag)) {
                onChange(selected.filter((item) => item !== tag));
              } else {
                onChange([...selected, tag]);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default Filter;
