import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';

import Blockquote from "./Blockquote";
import Code from "./Code";
import Header from './Header';
import P from "./P";
import Pre from "./Pre";
import Link from './Link';

import styles from './index.module.scss';
import { Li, Ul } from './UnorderList';
import Image from './Image';

const MDX_COMPONENTS: import("mdx/types").MDXComponents = {
  blockquote: Blockquote,
  pre: Pre,
  code: Code,
  p: P,
  h1: (props) => <Header {...props} level={1} />,
  h2: (props) => <Header {...props} level={2} />,
  h3: (props) => <Header {...props} level={3} />,
  h4: (props) => <Header {...props} level={4} />,
  h5: (props) => <Header {...props} level={5} />,
  h6: (props) => <Header {...props} level={6} />,
  a: Link,
  ul: Ul,
  li: Li,
  ol: Ul,
  img: Image,
};

export interface MDXPageLayoutProps {
  children: ReactNode;
}

const MDXPageLayout: FC<MDXPageLayoutProps> = (props) => {
  const router = useRouter();
  
  const handleBack = () => {
    router.replace('/');
  }
  
  return (
    <div className={styles.layout}>
      <div className={styles.back} onClick={handleBack}>返回列表</div>
      <MDXProvider components={MDX_COMPONENTS}>
        {props.children}
      </MDXProvider>
    </div>
  );
};

export default MDXPageLayout;
