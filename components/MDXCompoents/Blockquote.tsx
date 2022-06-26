import { FC } from "react";

import { MDXComponentProps } from "./types";
import styles from './index.module.scss';

const Blockquote: FC<MDXComponentProps> = (props) => {
  return (
    <blockquote className={styles.blockquote}>{props.children}</blockquote>
  )
};

export default Blockquote;
