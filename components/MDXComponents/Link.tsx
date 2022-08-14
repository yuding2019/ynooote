import { FC } from "react";

import { MDXComponentProps } from "./types";

const Link: FC<MDXComponentProps & { href: string }> = (props) => {
  return (
    <a className="link" href={props.href}>{props.children}</a>
  )
};

export default Link;
