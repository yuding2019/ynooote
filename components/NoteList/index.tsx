import styles from './index.module.scss';

export interface BaseNoteInfo {
  title: string;
  path: string;
  createTime?: string;
  updateTime?: string;
  tags?: string[];
}

export interface NoteListProps {
  list: BaseNoteInfo[];
  onClick: (item: BaseNoteInfo) => void;
}

const NoteList: React.FC<NoteListProps> = (props) => {
  const { list, onClick } = props;

  const renderItem = (item: BaseNoteInfo) => {
    const { title, path, createTime, updateTime, tags } = item;

    return (
      <li className={styles.item} key={path} onClick={() => onClick(item)}>
        <header className={styles.titleWrap}>
          <span className={styles.title}>{title}</span>
          <span className={styles.time}>最近更新时间：{updateTime || createTime}</span>
        </header>
        <div className={styles.createTime}>
          创建时间：{createTime}
        </div>
        <div className={styles.tagWrap}>
          {tags?.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
      </li>
    )
  };

  return (
    <ul className={styles.wrapper}>
      {list.map(renderItem)}
    </ul>
  )
};

export default NoteList;
