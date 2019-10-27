import React, { useState } from "react";
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)} >Complete</button>
        <button onClick={() => removeTodo(index)} >X</button>
      </div>
    </div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add Todo" />
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn React",
      isCompleted: false
    },
    {
      text: "Meet Friend",
      isCompleted: false
    },
    {
      text: "Build Cool App",
      isCompleted: false
    }
  ]);
  const addTodo = text => {
    const NewTodos = [...todos, { text }];
    setTodos(NewTodos);
  };
  const completeTodo = index => {
    const CompleteTodo = [...todos];
    CompleteTodo[index].isCompleted = true;
    setTodos(CompleteTodo)
  };
  const removeTodo = index => {
    const RemoveTodo = [...todos];
    RemoveTodo.splice(index, 1);
    setTodos(RemoveTodo)
  }
  return (
    <div className="app">
      <div className="todo-list">
        {
          todos.map((todo, index) => (
            <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />
          ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}



export default App;