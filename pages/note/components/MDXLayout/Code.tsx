import { FC } from 'react';

import stylex from '@stylexjs/stylex';

import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

const Code: FC<MDXComponentProps> = (props) => {
  return (
    <code {...stylex.props(mdxComponentStyles.code)}>{props.children}</code>
  );
};

export default Code;
