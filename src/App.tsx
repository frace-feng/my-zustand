import { useState, useSyncExternalStore } from "react";
import "./App.css";
import { create } from "./zustand/index";
import { State } from "./store";
import { NameItem } from "./NameItem";
import { CountItem } from "./CountItem";
interface MyState {
  count: number;
  inc: () => void;
  name: string;
  setName: () => void;
}

// 1 使用useSyncExternalStore的store
const store = new State();

// 3 自定义zustand
export const useStore = create<MyState>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  name: "www",
  setName: () =>
    set(() => ({ name: 'www' + Math.random().toString().slice(2) })),
}));

function App() {
  // 1 使用useSyncExternalStore
  const val = useSyncExternalStore(store.subscribe, store.getSnapshot);

  const update = () => {
    store.setUpdate(val + 3);
  };
  // 2 自定义react强制更新
  const [_, setCount] = useState(0);
  const forceRender = () => {
    setCount((i) => i + 1);
  };
  console.log("---组件更新");
  // 3 自定义zustand
  // const { count, inc } = useStore(state=>({count:state.count, inc:state.inc}));

  return (
    <>
      <NameItem />
      <br />
      <CountItem />
      <br />
      {val}
      <button onClick={update}>更新</button>
      <br />
      <button onClick={forceRender}>点击</button>
    </>
  );
}

export default App;
