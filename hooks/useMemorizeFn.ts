import { useCallback, useRef } from 'react';

export function useMemorizeFn<F extends (...args: any[]) => any>(fn: F) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useCallback((...args: Parameters<F>): ReturnType<F> => {
    return fnRef.current(...args);
  }, []);
}
