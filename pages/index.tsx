import dayjs from 'dayjs';
import NoteList from '../components/NoteList';

import manifest from '../public/manifest.2022.json';
import styles from './index.module.scss';

const sortNoteByUpdateTime = manifest.sort((prev, next) => {
  return dayjs(prev.updateTime || prev.createTime).isAfter(next.updateTime || next.createTime) ? -1 : 1;
});

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <NoteList list={sortNoteByUpdateTime} onClick={console.log} />
    </div>
  )
}

export default Home;
