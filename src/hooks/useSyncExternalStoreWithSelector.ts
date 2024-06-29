import { useMemo, useSyncExternalStore,useRef } from 'react';
import { isEqual } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useSyncExternalStoreWithSelector<U, T>(subscribe: (onStoreChange: () => void) => () => void, getState: () => U, selector?: (state: U) => T): T {
  const selectorRef = useRef(selector);
  selectorRef.current = selector;
  const { getSnapshot } = useMemo(() => {
    let prevSnapshot: U = getState();
    let prevSelectValue: T = (selectorRef.current ? selectorRef.current(prevSnapshot) : prevSnapshot) as T;
    const getSnapshot = () => {
      const nextSnapshot = getState();
      if (prevSnapshot === nextSnapshot || !selectorRef.current) {
        prevSnapshot = nextSnapshot;
        return prevSelectValue;
      }
      const nextSelectValue = selectorRef.current(nextSnapshot);
      if (isEqual(nextSelectValue, prevSelectValue)) {
        return prevSelectValue;
      }
      prevSelectValue = nextSelectValue;
      prevSnapshot = nextSnapshot;
      return nextSelectValue
    }
    return {
      getSnapshot
    }
  }, [getState])
  return useSyncExternalStore(subscribe, getSnapshot) as T
}