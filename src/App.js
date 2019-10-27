import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

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
  const [todos, setTodos] = useState([]);

  //use for the side effects such as displaying data from API
  useEffect(() => {
    axios.get('https://reactclientpanel-7b847.firebaseio.com/todos.json')
      .then(result => {
        console.log(result.data)
        const todoArray = [];
        const todoData = result.data;
        for (const key in todoData) {
          todoArray.push(todoData[key].todo)
        }
        setTodos(todoArray[0])
      })
  }, []);

  const addTodo = text => {
    const NewTodos = [...todos, { text }];
    setTodos(NewTodos);
    axios.post('https://reactclientpanel-7b847.firebaseio.com/todos.json', { todo: NewTodos })
      .then(resp => console.log(resp.data))
      .catch(err => console.log(err))
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