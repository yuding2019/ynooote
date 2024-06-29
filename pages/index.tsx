import { useState } from 'react';

import Link from 'next/link';

import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import { uniq } from 'lodash';

import Filter from '../components/Filter';
import Tag from '../components/Tag';
import manifest from '../public/manifest.json';

import { styles } from './index.stylex';

const sorted = manifest.sort((prev, next) => {
  return dayjs(prev.createTime).isAfter(next.createTime) ? -1 : 1;
});

const tags = uniq(manifest.flatMap((item) => item.tags || []).filter(Boolean));

const Home = () => {
  const [filters, setFilters] = useState([]);

  return (
    <div {...stylex.props(styles.wrapper)}>
      <Filter
        tags={tags}
        selected={filters}
        onChange={(selected) => setFilters(selected)}
      />
      {sorted
        .filter((item) => {
          if (filters.length) {
            return item.tags.some((tag) => filters.includes(tag));
          }
          return true;
        })
        .map((item) => {
          return (
            <div {...stylex.props(styles.note)} key={item.path}>
              <Link href={item.path} {...stylex.props(styles.title)}>
                {item.title}
              </Link>
              {item.tags.length > 0 && (
                <div {...stylex.props(styles.tagsWrap)}>
                  {item.tags.map((tag) => {
                    return <Tag key={tag} content={tag} />;
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Home;
