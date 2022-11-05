import dayjs from "dayjs";
import { useRouter } from "next/router";
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
    img: "/images/mine-sweeper.png",
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

  return (
    <div className={styles.wrapper}>
      <NoteList
        selectedTags={tags}
        list={sortNoteByUpdateTime}
        onClick={handleClick}
        onFilter={updateTags}
      />
    </div>
  );
};

export default Home;
