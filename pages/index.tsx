import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import NoteList from '../components/NoteList';

import manifest from '../public/manifest.2022.json';
import styles from './index.module.scss';

const sortNoteByUpdateTime = manifest.sort((prev, next) => {
  return dayjs(prev.updateTime || prev.createTime).isAfter(next.updateTime || next.createTime) ? -1 : 1;
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
