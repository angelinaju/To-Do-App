import { useEffect, useState } from 'react'
import './App.css'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { IoIosInformationCircle} from 'react-icons/io'
import Todo from './Todo' 
import Modal from './Modal'
import { getItem } from './utils/localStorage'
import type { DragEndEvent } from '@dnd-kit/core'


type Todos = {
  id: number, 
  text: string, 
  completed: boolean,
  date: Date;
  notes?: string, 
}

function App() {

  const [input, setInput] = useState<string>(""); // original input value, update input, initial value
  const [todos, setTodos] = useState<Todos[]>(() => { // run on render and avoid overwriting with an empty array
      const stored = localStorage.getItem("todos");
      if (!stored) return [];

      try {
        const parsed = JSON.parse(stored);        // parse from string -> array of objects
        return parsed.map((todo: any) => ({
          ...todo, 
          date: new Date(todo.date),              // convert date from string -> date object
        }))
      } catch {
        return [];
      }
  });
  
  useEffect(() => {                     // save the todos array to localStorage using useEffect
      localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;        // prevents addition of todos with just spaces

    const newTodo = {
      id: Date.now(),
      text: input, 
      completed: false,
      date: new Date(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);     // add to array
    setInput("");
  };

  const completeTodo = (id : number) => {           // mark as complete or remark as incomplete
      setTodos(todos.map((todo) =>
          todo.id === id ? {...todo, completed: !todo.completed} : todo
      ))
  }

  const deleteTodo = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id)); // filter out the id deleted 
  }

  const updateTodo = (id: number, updateField: Partial<Todos>) => {   // partial updates allows for just updating the notes section
      setTodos((prevTodos) => 
          prevTodos.map((todo) => 
            todo.id === id ? {...todo, ...updateField } : todo
        )  
      );
  };

  return (
    <>
      <div className='bg-blue-950 p-2 min-h-screen w-screen flex justify-center items-center'>
        <div className='max-w-[500px] w-[90%] bg-slate-900 p-4 rounded-md shadow-md'>
          <h1 className='text-center text-white text-2xl'>To-Do List</h1>
          <div className='flex gap-2 justify-center my-8'>
            <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}    
            type="text" placeholder='Add To-do' className= 'flex-3 border-2 outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus-border-white'/>
            <button 
            onClick={() => {addTodo();}}
            className="flex-1 bg-gray-1000 cursor-pointer rounded-md text-sm hover:bg-purple-900 text-white">Add Task</button>
            
          </div>
          <div>
            <h1 className="text-center text-white text-xl">To-Dos</h1>
              {todos.length > 0 ? (
                <>{todos.map((todo) =>  {
                  return <Todo key={todo.id} todo={todo} completeTodo = {completeTodo} deleteTodo = {deleteTodo} updateTodo={updateTodo}/>
              })}</>               
              ): (<h1 className="text-center text-white text-xl font-bold my-2">You've completed all your tasks!</h1>) }
          </div>
        </div> 
      </div>
    </>
  )
}

export default App
