import React, { useState, useEffect } from 'react'
import './App.css'

const Todo = ({ index, todo, removeTodo, completeTodo }) => {
  useEffect(() => {
    return () => console.log('todo destroyed!')
  },[])

  return(  
    <div className="todo">
      <span style={{textDecoration: todo.isCompleted? 'line-through': ''}}>{ todo.text }</span>
      <div className="button-group">
        <span className="completed" onClick={()=> completeTodo(index)} >✓</span>
        <span className="close" onClick={()=> removeTodo(index)}>x</span>
      </div>
    </div>
  )
}

const TodoForm = ({ addTodo }) => {
  const [value , setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        className="input"
        value={value}
        placeholder="add Text here.."
        onChange={e => setValue(e.target.value)} 
      />
    </form>
  )
}


function App() {
  const [ todos, setTodos] = useState([
    {
      text: 'Learn react hooks',
      isCompleted: false
    },
    {
      text: 'Learn typescript with react',
      isCompleted: false
    },
    {
      text: 'Improve communication in english',
      isCompleted: false
    }
  ]);

  useEffect(() => {
    console.log('user effects running..')
    return () => {
      console.log('return function in use effects!!')
    }
  },[])

  const addTodo = text => {
    const newTodos = [...todos,{ text,isCompleted: false }];
    setTodos(newTodos);
  }
  const removeTodo = index => {
  
    const newTodos = [...todos]
    newTodos.splice(index,1);
    setTodos(newTodos);
  }
  const completeTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }
  console.log('Rendering...')
  return (
    <div className="app">
      <div className="todo-list">
        { 
          todos.map((todo, index) => (
            <Todo 
              key={index}
              index={index}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo ={completeTodo}
            />
          ))
        }
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )

}
 
export default React.memo(App)