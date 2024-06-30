import { FC } from 'react';

import stylex from '@stylexjs/stylex';

import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

const Anchor: FC<MDXComponentProps & { href: string }> = (props) => {
  return (
    <a
      {...stylex.props(mdxComponentStyles.anchor)}
      href={props.href}
      target="_blank"
    >
      {props.children}
    </a>
  );
};

export default Anchor;
