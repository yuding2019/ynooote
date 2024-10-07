import stylex from '@stylexjs/stylex';
import { PhotoView } from 'react-photo-view';

import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

const Image: React.FC<MDXComponentProps & { src: string; alt?: string }> = (
  props,
) => {
  const { src, alt } = props;

  return (
    <PhotoView src={src}>
      <img {...stylex.props(mdxComponentStyles.image)} src={src} alt={alt} />
    </PhotoView>
  );
};

export default Image;
