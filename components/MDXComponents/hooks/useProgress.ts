import { useRef, useEffect } from "react";

import { APP_CONTENT_CLASS_NAME } from "../../../common/constant";


const SCROLL_CALC_TIME = 16;

export function useProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!progressRef.current) {
      return;
    }

    let timestamp = 0;
    const handleContentScroll = (e: Event) => {
      if (e.timeStamp - timestamp < SCROLL_CALC_TIME || !progressRef.current) {
        return;
      }
      timestamp = e.timeStamp;
      const scrollEl = e.target as HTMLDivElement;
      const totalHeight = scrollEl.children[0].clientHeight - scrollEl.clientHeight;
      const progress = ~~(scrollEl.scrollTop / totalHeight * 100);
      progressRef.current.style.background = `linear-gradient(to top, #f2fafe 0% ${progress}%, #fff ${progress}% 100%)`;
    };

    const appEl = document.querySelector(`.${APP_CONTENT_CLASS_NAME}`);
    appEl.addEventListener('scroll', handleContentScroll);
    return () => {
      appEl.removeEventListener('scroll', handleContentScroll);
    }
  }, []);

  return progressRef;
}