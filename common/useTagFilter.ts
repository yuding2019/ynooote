import { useEffect, useState } from "react";

function syncTags(tags: string[]) {
  const query = tags.length
    ? `?tags=${window.encodeURIComponent(
        tags.reduce((tag, current) => {
          if (tag) {
            return `${tag}&${current}`;
          }
          return current;
        }, "")
      )}`
    : "";
  const state = window.history.state;
  const path = window.location.pathname;
  window.history.replaceState(state, null, `${path}${query}`);
}

function getTagsFromUrl() {
  let query = window.location.search;
  query = query.startsWith("?") ? query.slice(1) : query;
  const queryEntries = query.split("&");
  const tagsQuery = queryEntries.filter((entry) => {
    return entry.startsWith("tags");
  })[0];
  if (tagsQuery) {
    return decodeURIComponent(tagsQuery.replace('tags=', '')).split('&');
  }
  return [];
}

export function useTagFilter() {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const _tags = getTagsFromUrl();
    setTags(_tags);
  }, []);

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
    syncTags(newTags);
  };

  return { tags, updateTags };
}
