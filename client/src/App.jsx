import { useState } from "react";
import { useEffect } from "react"
import "./style.css"
import Todolist from "./todolist.jsx"
export default function App() {
  let [todo,setTodo] = useState([]);
  let [newtodo,setNewTodo] = useState("");
  useEffect(()=>{
    async function gettodos(){
      const res = await  fetch("http://localhost:3000/todos");
      const todos = await res.json();

      setTodo(todos);
      // console.log(todos);
    }
    gettodos();
  },[]);
  function content(event){
    setNewTodo(event.target.value);
    console.log(newtodo)
  }
  let setting = async (event)=>{
    event.preventDefault();
    let data = await fetch ("http://localhost:3000/todos/new",{
      method :"POST",
      body : await JSON.stringify({title : newtodo}),
      headers:{
        "Content-Type" : "application/json",
      },
    });
    let res = await data.json();
    setTodo([...todo,res])
     setNewTodo("");
  }
  return (
    <div className="Container">
      <h1 className="title">Awesome Todos</h1>
      <form className="addbar" onSubmit={setting}>
        <input type="text" value={newtodo} onChange={content} placeholder="Enter new todo ..."required/>
        <button type="submit">Add</button>
      </form>
      <div className="Todos">
         { (todo.length > 0) &&
        todo.map((el)=>( 
        <Todolist key={el._id} todo={el} setTodo={setTodo}/>
        ))
      }
      </div>
       
    {/* {<pre>{JSON.stringify(todo,null,2)}</pre>} */}
    </div>
  )
}


