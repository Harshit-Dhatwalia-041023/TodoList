

export default function Todolist({todo,setTodo}){
const updateStatus =  async (id,status)=>{
   let data = await fetch (`http://localhost:3000/todos/${id}`,{
    method : "PUT",
    body: JSON.stringify({completed: !status}),
    headers: {
      "content-Type":"application/json"
    },
   });
   let res = await data.json();
   if(res._id){
    setTodo(currentTodos =>{
      return currentTodos.map((currentTodo)=>{
        if(currentTodo._id === id){
          return {...currentTodo,completed : !currentTodo.completed};
        }
        return currentTodo;
      })
    })
   }
 }
 const deleteTodo =async (id)=>{
  let data = await fetch(`http://localhost:3000/todos/${id}`,{
    method :"DELETE"
  })
  let res = await data.json();
  if(res.mssg){
    setTodo(currentTodos=>(
      currentTodos.filter((currentTodo)=> (currentTodo._id !== id))
  ))
  }
 }
    return (
        <div key={todo._id} className="todo">
          <p>{todo.title}</p>
          <div>
            <button className="todo_status" onClick={()=>updateStatus(todo._id,todo.completed)}>
              {(todo.completed) ?<span>&#9745;</span> :<span>&#9744;</span> }
            </button> &nbsp;&nbsp;&nbsp;
            <button className="todo_delete" onClick={()=>deleteTodo(todo._id)}>Delete</button>
          </div>
         </div>
    )
}