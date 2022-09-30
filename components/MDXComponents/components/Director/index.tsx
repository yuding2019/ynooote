import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { APP_CONTENT_CLASS_NAME } from "../../../../common/constant";

import styles from "./index.module.less";
import { debounce } from "lodash";

export interface HeaderItem {
  text: string;
  classNames: string[];
  id: string;
  level: number;
  offsetTop: number;
  offsetBottom: number;
}

const SCROLL_DELAY_TIME = 16;
const OFFSET_TOP_RANGE = 30;

const Director = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [headers, setHeaders] = useState<HeaderItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const getHeaders = () => {
      const _headers: HeaderItem[] = [
        ...document.querySelectorAll(".header"),
      ].map((header: HTMLElement, index) => {
        const level = Number(header.tagName.replace(/[a-z]+/gi, ""));
        const text = header.innerText;
        return {
          text,
          level,
          id: `header_${index}`,
          classNames: [...header.classList.values()],
          offsetTop: header.offsetTop,
          offsetBottom: header.offsetTop + header.offsetHeight,
        };
      });
      setHeaders(_headers);
      setActiveId(_headers[0].id);
    };

    setTimeout(() => {
      getHeaders();
    });
  }, []);

  useEffect(() => {
    if (!headers.length) {
      return;
    }
    const scrollContainer = document.querySelector(
      `.${APP_CONTENT_CLASS_NAME}`
    );

    let timestamp = 0;
    const handleScroll = (e: Event) => {
      if (e.timeStamp - timestamp < SCROLL_DELAY_TIME) {
        return;
      }
      timestamp = e.timeStamp;
      const scrollTop = (e.target as HTMLElement).scrollTop;
      const top = scrollTop - OFFSET_TOP_RANGE;
      const bottom = scrollTop + OFFSET_TOP_RANGE;
      const headerInRangeIndex = headers.findIndex((item) => {
        return item.offsetTop >= top && item.offsetBottom <= bottom;
      });
      const headerInRange = headers[headerInRangeIndex];
      if (headerInRange) {
        setActiveId(headerInRange.id);
        if (headerInRangeIndex > 6) {
          contentRef.current?.scrollTo({
            top: (headerInRangeIndex - 5) * 37,
            behavior: "smooth",
          });
        } else {
          contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [headers]);

  if (!headers.length) {
    return <div className={styles.empty} />;
  }

  const handleClick = (headerItem: HeaderItem) => {
    const selector = headerItem.classNames.reduce((_className, current) => {
      if (_className) {
        return `${_className}.${current}`;
      }
      return `.${current}`;
    }, "");
    const matchedHeader = [...document.querySelectorAll(selector)].find(
      (header: HTMLElement) => {
        return header.innerText === headerItem.text;
      }
    );
    if (matchedHeader) {
      matchedHeader.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveId(headerItem.id);
  };

  const minLevel = Math.min.apply(
    null,
    headers.map((i) => i.level)
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>目录</header>
      <div className={styles.content} ref={contentRef}>
        {headers.map((item) => {
          const currentLevel = item.level - minLevel + 1;
          return (
            <div
              className={classNames(styles.item, {
                [styles.active]: item.id === activeId,
              })}
              id={item.id}
              key={item.id}
              style={{
                paddingLeft: currentLevel * 8,
                fontWeight: 600 - item.level * 50,
              }}
              onClick={() => handleClick(item)}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Director;
