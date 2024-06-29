import { createContext, useContext, useMemo, useState } from 'react';

import { noop } from 'lodash';

import { ContentNavigate } from '../../common/types';
import { useMemorizeFn } from '../../hooks/useMemorizeFn';

type Remover = () => void;

interface ContentNavigationContextValue {
  navigates: ContentNavigate[];
  /** 添加目录导航item */
  append: (nav: ContentNavigate) => Remover;
}

export const ContentNavigationContext =
  createContext<ContentNavigationContextValue>({
    navigates: [],
    append: () => noop,
  });

export function useContentNavigationContext() {
  return useContext(ContentNavigationContext);
}

export const ContentNavigateProvider: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const { children } = props;

  const [navigates, setNavigates] = useState<ContentNavigate[]>([]);

  const appendNavigate = useMemorizeFn((navigate: ContentNavigate) => {
    setNavigates((prev) => [...prev, navigate]);
    return () => {
      setNavigates((prev) => prev.filter((item) => item.id !== navigate.id));
    };
  });

  const value = useMemo(() => {
    return {
      navigates,
      append: appendNavigate,
    };
  }, [navigates]);

  return (
    <ContentNavigationContext.Provider value={value}>
      {children}
    </ContentNavigationContext.Provider>
  );
};
