import { FC } from "react";

import { MDXComponentProps } from "./types";

const Blockquote: FC<MDXComponentProps> = (props) => {
  return (
    <blockquote className="blockquote">{props.children}</blockquote>
  )
};

export default Blockquote;
