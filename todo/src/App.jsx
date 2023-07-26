import { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() =>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue ==null) return []
    return JSON.parse(localValue)
  });


  useEffect(()=>{
localStorage.setItem("ITEMS" , JSON.stringify(todos))
  },[todos])

  function handleSubmit(e) {
    e.preventDefault(); //page will not rerfresh after clicking submit button

    setTodos((currenttodo) => {
      return [
        ...currenttodo,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
      
    });
    setNewItem('')
  }

  function toggleTodo(id , completed){
    setTodos(currenttodo =>{
      return currenttodo.map(todo =>{
        if (todo.id === id) {
          return {...todo , completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
setTodos(currenttodo => {
  return currenttodo.filter(todo => todo.id !== id )
})
  }

 
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className="btn"> Add</button>
      </form>
      <h1>ToDo List</h1>
      <ul>
        {todos.length === 0 && "No ToDo's yet !!"}
        {todos.map((item) => {
          return (
            <li key={item.id}> 
              <label>
                <input type="checkbox" checked= { item.completed}
                onChange={e => toggleTodo(item.id,e.target.checked)} />
                {item.title}
              </label>
              <button
              onClick={() => deleteTodo(item.id)}
              className="btn btn-danger"> Delete </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
