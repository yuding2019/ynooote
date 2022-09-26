import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import NoteList from '../components/NoteList';

import manifest from '../public/manifest.2022.json';
import styles from './index.module.scss';

const gameList = [
  {
    title: '扫雷',
    tags: ['扫雷', 'web game'],
    path: '/sweeper',
    createTime: '2022-09-26 13:58',
    img: '/images/mine-sweeper.png',
  }
]

const sortNoteByUpdateTime = [...gameList, ...manifest].sort((prev, next) => {
  return dayjs(prev.createTime).isAfter(next.createTime) ? -1 : 1;
});

const Home = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <NoteList list={sortNoteByUpdateTime} onClick={(item) => router.push(item.path)} />
    </div>
  )
}

export default Home;
