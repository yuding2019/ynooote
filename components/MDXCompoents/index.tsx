import { MDXProvider } from '@mdx-js/react';

import Blockquote from "./Blockquote";
import Code from "./Code";
import P from "./P";
import Pre from "./Pre";

const MDX_COMPONENTS = {
  blockquote: Blockquote,
  pre: Pre,
  code: Code,
  p: P,
};

const MDXPageLayout = (props) => {
  return (
    <MDXProvider components={MDX_COMPONENTS}>
      {props.children}
    </MDXProvider>
  )
};

export default MDXPageLayout;
