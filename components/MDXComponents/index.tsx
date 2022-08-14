import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { MDXProvider } from "@mdx-js/react";

import Blockquote from "./Blockquote";
import Code from "./Code";
import Header from "./Header";
import P from "./P";
import Pre from "./Pre";
import Link from "./Link";
import { Li, Ul } from "./UnorderList";
import Image from "./Image";

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
  img: Image
};

export interface MDXPageLayoutProps {
  meta?: { title: string; tags: string[] };
  children: ReactNode;
}

const MDXPageLayout: FC<MDXPageLayoutProps> = (props) => {
  const { meta, children } = props;
  const router = useRouter();

  const handleBack = () => {
    router.replace("/");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.toolbar}>
        <div className={styles.tool} onClick={handleBack}>
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWxlZnQiIGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ii8+PC9zdmc+" alt="" />
        </div>
      </div>
      {meta.title && (
        <div className={styles.titleWrap}>
          <div className={styles.title}>{meta.title}</div>
          {meta.tags.length > 0 && (
            <div className={styles.tagsWrap}>
              {meta.tags.map((tag) => {
                return <span className={styles.tag}>{tag}</span>;
              })}
            </div>
          )}
        </div>
      )}
      <MDXProvider components={MDX_COMPONENTS}>{children}</MDXProvider>
    </div>
  );
};

export default MDXPageLayout;
