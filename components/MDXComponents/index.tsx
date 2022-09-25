import { FC, ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";

import Blockquote from "./Blockquote";
import Code from "./Code";
import Header from "./Header";
import P from "./P";
import Pre from "./Pre";
import Link from "./Link";
import { Li, Ul } from "./UnorderList";
import Image from "./Image";

import Director from "./components/Director";
import Toolbar from "./components/Toolbar";

import styles from "./index.module.scss";

const MDX_COMPONENTS = {
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
  meta?: { title: string; tags: string[] };
  children: ReactNode;
}

const MDXPageLayout: FC<MDXPageLayoutProps> = (props) => {
  const { meta, children } = props;

  return (
    <div className={styles.layout}>
      <Toolbar />
      <div className={styles.content}>
        {meta.title && (
          <div className={styles.titleWrap}>
            <div className={styles.title}>{meta.title}</div>
            {meta.tags.length > 0 && (
              <div className={styles.tagsWrap}>
                {meta.tags.map((tag) => {
                  return (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <MDXProvider components={MDX_COMPONENTS}>{children}</MDXProvider>
      </div>
      <Director />
    </div>
  );
};

export default MDXPageLayout;
