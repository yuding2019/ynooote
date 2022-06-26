import { FC } from "react";

import { MDXComponentProps } from "./types";

const Header: FC<MDXComponentProps & { level: number }> = (props) => {
  const Tag = `h${props.level}`;
  return (
    <Tag className={`header h${props.level}`}>{props.children}</Tag>
  )
};

export default Header;
