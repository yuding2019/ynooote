import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import NoteList, { BaseNoteInfo } from '../components/NoteList';
import Emit from '../common/emit';

import manifest from '../public/manifest.2022.json';
import styles from './index.module.less';
import { GLOBAL_EVENT_NAME } from '../common/constant';

const gameList = [
  {
    title: '扫雷',
    tags: ['扫雷', 'web game'],
    path: '/sweeper',
    createTime: '2022-09-26 13:58',
    updateTime: '2022-09-26 16:31',
    img: '/images/mine-sweeper.png',
  }
]

const sortNoteByUpdateTime = [...gameList, ...manifest].sort((prev, next) => {
  return dayjs(prev.createTime).isAfter(next.createTime) ? -1 : 1;
});

const Home = () => {
  const router = useRouter();

  const handleClick = (item: BaseNoteInfo) => {
    router.push(item.path);
    Emit.emit(GLOBAL_EVENT_NAME.ROUTER_CHANGE, true);
  }

  return (
    <div className={styles.wrapper}>
      <NoteList list={sortNoteByUpdateTime} onClick={handleClick} />
    </div>
  )
}

export default Home;
