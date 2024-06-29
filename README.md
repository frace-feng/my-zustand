# 自定义zustand

第一步：先从如何使用来看
使用例子：

```js
export const useStore = create<MyState>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  name: "www",
  setName: () =>
    set(() => ({ name: 'www' + Math.random().toString().slice(2) })),
}));
const { count, inc } = useStore(state=>({count:state.count, inc:state.inc}));
  return (
    <>
    <span>{count}</span>
    <button onClick={()=>inc()}>改变count</button>
    </>
  )
```

第二步：声明一个create函数，参数接收函数SET，函数的执行结果是一个自定义state对象，返回一个函数FN，函数执行之后返回的是做了selector处理之后的state对象

第三步：借用useSyncExternalStoreWithSelector在store的值发生变化的时候，可以让组件按需更新

第四步：按需更新如何实现
缓存之前的selector值，与新 的selector值取对比，不同的话就取做组件更新，值相同返回旧值，组件不会重新渲染更新。

缺点：
性能不会太好，组件虽然不会更新，但是每次数据都会去比较，如果数据量大的话性能花销会很大。
