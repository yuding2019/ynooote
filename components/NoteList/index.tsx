import styles from './index.module.less';

export interface BaseNoteInfo {
  title: string;
  path: string;
  createTime?: string;
  updateTime?: string;
  tags?: string[];
  img?: string;
}

export interface NoteListProps {
  list: BaseNoteInfo[];
  onClick: (item: BaseNoteInfo) => void;
}

const DEFAULT_IMG = {
  default: './images/dance.gif',
  typescript: 'https://www.typescriptlang.org/static/typescript-jp-bed04107658e1301111868439cd400a5.jpg',
  react: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
}

function getDefaultImgByTag(tags: string[]) {
  const tag = tags.find((tag) => DEFAULT_IMG[tag.toLowerCase()]);
  return DEFAULT_IMG[(tag || '').toLowerCase()] || DEFAULT_IMG.default;
}

function getImgSrc(src: string) {
  if (/^\.?\//.test(src)) {
    const _src = src.startsWith('.') ? src.replace('.', '') : src;
    return `${process.env.BASE_PATH || ''}${_src}`;
  }
  return src;
}

const NoteList: React.FC<NoteListProps> = (props) => {
  const { list, onClick } = props;

  const renderItem = (item: BaseNoteInfo) => {
    const { title, path, createTime, updateTime, tags } = item;

    return (
      <li className={styles.item} key={path} onClick={() => onClick(item)}>
        <div className={styles.content}>
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
        </div>
        <div className={styles.img}>
          <img src={getImgSrc(item.img || getDefaultImgByTag(tags))} />
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
