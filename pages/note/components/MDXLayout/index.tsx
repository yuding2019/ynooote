import { FC, ReactNode } from 'react';

import { MDXProvider } from '@mdx-js/react';
import stylex from '@stylexjs/stylex';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import Anchor from './Anchor';
import Blockquote from './Blockquote';
import Code from './Code';
import Heading from './Heading';
import Image from './Image';
import { List, ListItem } from './List';
import Paragraph from './Paragraph';
import Pre from './Pre';

import { styles } from './styles.stylex';

export interface MDXLayoutProps {
  meta?: { title: string; tags: string[] };
  children: ReactNode;
}

const MDX_COMPONENTS = {
  p: Paragraph,
  a: Anchor,
  ul: List,
  li: ListItem,
  ol: List,
  pre: Pre,
  img: Image,
  code: Code,
  blockquote: Blockquote,
  h1: (props) => <Heading {...props} level={1} />,
  h2: (props) => <Heading {...props} level={2} />,
  h3: (props) => <Heading {...props} level={3} />,
  h4: (props) => <Heading {...props} level={4} />,
  h5: (props) => <Heading {...props} level={5} />,
  h6: (props) => <Heading {...props} level={6} />,
};

const MDXLayout: FC<MDXLayoutProps> = (props) => {
  const { meta, children } = props;

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.title)}>{meta?.title}</div>
      <PhotoProvider>
        <MDXProvider components={MDX_COMPONENTS}>{children}</MDXProvider>
      </PhotoProvider>
    </div>
  );
};

export default MDXLayout;
