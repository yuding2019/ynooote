import stylex from '@stylexjs/stylex';

import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

const Image: React.FC<MDXComponentProps & { src: string; alt?: string }> = (
  props,
) => {
  const { src, alt } = props;

  return (
    <img {...stylex.props(mdxComponentStyles.image)} src={src} alt={alt} />
  );
};

export default Image;
