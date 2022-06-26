import { FC } from "react";

import { MDXComponentProps } from "./types";
import styles from './index.module.scss';

const Code: FC<MDXComponentProps> = (props) => {
  return (
    <code className={styles.code}>{props.children}</code>
  )
};

export default Code;
