import { useEffect, useState } from 'react'
import './App.css'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { IoIosInformationCircle} from 'react-icons/io'
import Todo from './Todo' 
import Modal from './Modal'


type Todos = {
  id: number, 
  text: string, 
  completed: boolean,
  date: Date;
}

function App() {

  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date[]>([]);

  const newDate = () => {
      setDate([...date, new Date()]);
  };

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input, 
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInput("");
  };

  const completeTodo = (id : number) => {
      setTodos(todos.map((todo) =>
          todo.id === id ? {...todo, completed: !todo.completed} : todo
      ))
  }

  const deleteTodo = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id)); // filter out the id deleted 
  }



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
                  return <Todo key={todo.id} todo={todo} completeTodo = {completeTodo} deleteTodo = {deleteTodo}/>
              })}</>               
              ): (<h1 className="text-center text-white text-xl font-bold my-2">You have completed all your tasks!</h1>) }
          </div>
        </div> 
      </div>
    </>
  )
}

export default App
