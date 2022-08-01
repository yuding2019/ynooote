import { FC } from "react";

import { MDXComponentProps } from "./types";

const Code: FC<MDXComponentProps> = (props) => {
  return (
    <code className="code">{props.children}</code>
  )
};

export default Code;
