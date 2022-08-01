import { FC } from "react";

import { MDXComponentProps } from "./types";

export const Ul: FC<MDXComponentProps> = (props) => {
  return (
    <ul className="ul">{props.children}</ul>
  )
};

export const Li: FC<MDXComponentProps> = (props) => {
  return (
    <li className="li">{props.children}</li>
  )
};
