import stylex from '@stylexjs/stylex';

import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

export const List: React.FC<MDXComponentProps> = (props) => {
  const { children } = props;

  return <div {...stylex.props(mdxComponentStyles.list)}>{children}</div>;
};

export const ListItem: React.FC<MDXComponentProps> = (props) => {
  const { children } = props;

  return (
    <div {...stylex.props(mdxComponentStyles.listItem)}>
      <div {...stylex.props(mdxComponentStyles.listItemOrder)} />
      {children}
    </div>
  );
};

export default () => null;
