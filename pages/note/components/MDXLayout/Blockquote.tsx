import { FC } from 'react';

import stylex from '@stylexjs/stylex';

import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

const Blockquote: FC<MDXComponentProps> = (props) => {
  return (
    <div {...stylex.props(mdxComponentStyles.blockquote)}>{props.children}</div>
  );
};

export default Blockquote;
