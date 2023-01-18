import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { CanvasPlatform, CanvasLine } from "../common/canvas";
import { GLOBAL_EVENT_NAME } from "../common/constant";
import Emit from "../common/emit";
import { useTagFilter } from "../common/useTagFilter";

import NoteList, { BaseNoteInfo } from "../components/NoteList";

import manifest from "../public/manifest.2022.json";
import styles from "./index.module.less";

const gameList = [
  {
    title: "扫雷",
    tags: ["web game"],
    path: "/sweeper",
    createTime: "2022-09-26 13:58",
    updateTime: "2022-09-26 16:31",
    img: "/images/mine-sweeper.png",
  },
  {
    title: "2048",
    tags: ["web game"],
    path: "/2048",
    createTime: "2022-10-22 16:01",
    updateTime: "2022-12-4 12:36",
    img: "/images/2048.png",
  },
];

const sortNoteByUpdateTime = [...gameList, ...manifest].sort((prev, next) => {
  return dayjs(prev.createTime).isAfter(next.createTime) ? -1 : 1;
});

const Home = () => {
  const router = useRouter();

  const { tags, updateTags } = useTagFilter();

  const handleClick = (item: BaseNoteInfo) => {
    router.push(item.path);
    Emit.emit(GLOBAL_EVENT_NAME.ROUTING_START);
  };

  const ref = useRef<any>(null);
  const platformRef = useRef<CanvasPlatform>();
  useEffect(() => {
    const platform = new CanvasPlatform({ container: ref.current });

    platform.appendNode(
      new CanvasLine({
        id: platform.id(),
        points: Array.from({ length: 10 }, (_, index) => {
          return {
            id: platform.id().toString(),
            x: index * 30,
            y: ~~(Math.random() * 100),
          };
        }),
      })
    );

    platformRef.current = platform
    return () => {
      platformRef.current.release();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        ref={ref}
        style={{ width: 300, height: 400, margin: "auto", background: "#eee", overflow: 'visible', zIndex: 99 }}
      />
      {/* <NoteList
        selectedTags={tags}
        list={sortNoteByUpdateTime}
        onClick={handleClick}
        onFilter={updateTags}
      /> */}
    </div>
  );
};

export default Home;
