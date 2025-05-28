import { useEffect, useState, useRef } from 'react'
import './App.css'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { IoIosInformationCircle} from 'react-icons/io'
import Todo from './Todo' 
import Modal from './Modal'
import { getItem } from './utils/localStorage'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { de } from 'date-fns/locale'
import { itemsEqual } from '@dnd-kit/sortable/dist/utilities'



type Todos = {
  id: number, 
  text: string, 
  completed: boolean,
  date: Date;
  notes?: string, 
  dueDate?: Date;
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
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
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

  const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIdx = todos.findIndex(todo => todo.id === active.id);
      const newIdx = todos.findIndex(todo => todo.id === over.id);

      setTodos((prev) => arrayMove(prev, oldIdx, newIdx));
  }


  return (
  
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <>
      <div className='bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 min-h-screen w-screen flex justify-center items-start py-10 px-4'>
        <div id="box" className='w-full max-w-3xl bg-slate-800 p-6 rounded-2xl shadow-2xl'>
          <h1 className='text-white text-3xl font-semibold text-center mb-6'>My To-Do List</h1>
          <div className='flex flex-col sm:flex-row gap-3 mb-6'>
            <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}    
            type="text" placeholder='Add Task' className= 'flex-grow bg-slate-700 text-white placeholder-gray-400 p-3 rounded-md focus:ring-blue-500 focus:outline-none'/>
            <button 
            onClick={() => {addTodo();}}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition">Add Task</button>
            
          </div>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={todos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                  {todos.length > 0 ? (
                    todos.map((todo) => (
                      <Todo key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                    ))
                  ) : <p className="text-center text-white text-bold text-xl my-2">You've completed all your tasks!</p>}
              </div>
            </SortableContext>
          </DndContext>
        </div> 
      </div>
    </>
    </LocalizationProvider>
  )
}

export default App
