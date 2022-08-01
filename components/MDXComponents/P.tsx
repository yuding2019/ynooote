import { FC } from "react";

import { MDXComponentProps } from "./types";

const P: FC<MDXComponentProps> = (props) => {
  return (
    <p className="p">{props.children}</p>
  )
};

export default P;
