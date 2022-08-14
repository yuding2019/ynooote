import { FC, useEffect, useRef } from "react";

import { MDXComponentProps } from "./types";

const Image: FC<MDXComponentProps> = (props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!imgRef.current) {
      return;
    }

    let isFullWidth = false;
    const handleClick = () => {
      if (isFullWidth) {
        imgRef.current.style.width = '360px';
      } else {
        imgRef.current.style.width = '100%';
      }
      isFullWidth = !isFullWidth;
    };
    imgRef.current.addEventListener('click', handleClick);
    return () => {
      imgRef.current?.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <img ref={imgRef} {...props} className={`img ${props.className || ''}`}>{props.children}</img>
  )
};

export default Image;
