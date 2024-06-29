import { FC } from 'react';

import stylex from '@stylexjs/stylex';

import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

const Paragraph: FC<MDXComponentProps> = (props) => {
  return (
    <p {...stylex.props(mdxComponentStyles.paragraph)}>{props.children}</p>
  );
};

export default Paragraph;
