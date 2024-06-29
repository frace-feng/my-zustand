import { useStore } from "./App";

export function NameItem(){
  const { name, setName } = useStore(state=>({name:state.name, setName:state.setName}));
  console.log('-----name')
  return (
    <>
    <span>{name}</span>
    <button onClick={()=>setName()}>改变name</button>
    </>
  )
}