import { FC } from "react";

import { MDXComponentProps } from "./types";
import styles from './index.module.scss';

const P: FC<MDXComponentProps> = (props) => {
  return (
    <p className={styles.p}>{props.children}</p>
  )
};

export default P;
