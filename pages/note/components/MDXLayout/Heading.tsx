import { FC, cloneElement, useEffect, useRef } from 'react';

import stylex from '@stylexjs/stylex';

import { randomId } from '../../../../common/utils';
import { useContentNavigationContext } from '../../../../components/ContentNavigation/context';
import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

const Heading: FC<MDXComponentProps & { level: number }> = (props) => {
  const { level, children } = props;

  const ref = useRef<HTMLElement>(null);
  const { append } = useContentNavigationContext();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const id = `heading_${randomId()}`;
    ref.current.id = id;
    const remove = append({
      id,
      level,
      title: ref.current.textContent,
    });

    return () => {
      remove();
    };
  }, []);

  const HeadTag = `h${level}`;
  return cloneElement(<HeadTag />, {
    children,
    ref,
    ...stylex.props(
      mdxComponentStyles.heading,
      mdxComponentStyles[`heading${level}`],
    ),
  });
};

export default Heading;
