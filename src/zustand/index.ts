import { useSyncExternalStoreWithSelector } from "../hooks/useSyncExternalStoreWithSelector";

type UpdateFn<T> = (arg: T) => Partial<T>;
type SetFn<T> = (update: UpdateFn<T>) => void
type CreateFn<T> = ((set: SetFn<T>) => T);

function create<T extends object>() {
  return (fn: CreateFn<T>) => {

    const cb: Set<(() => void)> = new Set();
    let state  = {} as T;

    const set: SetFn<T> = (update) => {
      const newState = update(state);
      state  = { ...state , ...newState };
      cb.forEach(c=>c())
      return state;
    };

    state  = fn(set);

    const store = {
      subscribe: (callback: (() => void)) => {
        cb.add(callback);
        return () => {
          cb.delete(callback)
        };
      },
      getSnapshot: () => {
        return state ;
      },
    };
    

    function useStore<U>(selector?: (arg: T) => U): U | T {
      const state = useSyncExternalStoreWithSelector<U|T>(store.subscribe, store.getSnapshot, selector);
      return state;
    }
    return useStore;
  }
}
export {
  create
}