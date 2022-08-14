import { FC, cloneElement } from "react";

import { MDXComponentProps } from "./types";

const Header: FC<MDXComponentProps & { level: number }> = (props) => {
  const HeadTag = `h${props.level}`;
  const el = <HeadTag />;
  return cloneElement(el, { className: `header h${props.level}`, children: props.children });
};

export default Header;
