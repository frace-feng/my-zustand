import { useStore } from "./App";

export function CountItem(){
  
  const { count, inc } = useStore(state=>({count:state.count, inc:state.inc}));
  console.log('-----count')
  return (
    <>
    <span>{count}</span>
    <button onClick={()=>inc()}>改变count</button>
    </>
  )
}