import react from 'react';
import { useState, useEffect } from 'react';
import { FaCheck, FaCheckCircle, FaTrash, FaGripVertical } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import Modal from './Modal'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

type TodoProp = {
    todo: {
        id: number, 
        text: string, 
        completed: boolean
        date: Date;
        notes?: string,
        dueDate?: Date;
    };
    completeTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, updateField: Partial<TodoProp['todo']> ) => void; //optional property to just update this field
};

export default function Todo({todo, completeTodo, deleteTodo, updateTodo} : TodoProp) {
    const [open, setOpen] = useState<boolean>(false);
    const [tempNote, setNote] = useState<string> (todo.notes || '');
    const [tempDueDate, setDueDate] = useState<Date | null>(todo.dueDate || null);

    useEffect(() => {             // tempnote state resets each time the pop-up opens
        if (open) {
            setNote(todo.notes || '');
            setDueDate(todo.dueDate || null);
        }
    }, [open, todo.notes, todo.dueDate]);

    const saveFields = () => {      // only updates the todo with the temp note/date if save is clicked
        updateTodo(todo.id, {notes: tempNote, dueDate: tempDueDate ?? undefined });
        setOpen(false);
    };

    const {             // drag & drop library
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: todo.id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl flex justify-between items-center my-4 text-white shadow-md">
            <h2 className = {`flex-1 ${todo.completed === true ? 'line-through text-gray-500' : "font-medium"}`}>{todo.text}</h2>
            <div className="flex item-center gap-3 items-center">
                <FaGripVertical {...listeners} className="cursor-grab active:cursor-grabbing text-white hover:text-gray-200 size-6" />
                <IoIosInformationCircle className="hover:text-blue-200 cursor-pointer text-lg size-8" onClick={() => setOpen(true) }/>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="flex flex-col gap-4 ">
                                <h1 id="title" className="text-lg font-semibold text-blue-800 break-words">{todo.text}</h1>
                                <p className= "text-sm text-gray-600">Created: {new Date(todo.date).toLocaleString()}</p>

                                <DatePicker label="Due Date" value={tempDueDate} onChange={(newValue) => setDueDate(newValue)} />
                        
                                <textarea className="p-2 border border-gray-300 rounded-md text-sm text-gray-800 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Add notes..." value={tempNote} 
                                onChange={(e) => setNote(e.target.value)}></textarea>
                                <button className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition" 
                                onClick={() => saveFields()}>Save</button>
                        </div>
                    </Modal>
                <FaCheckCircle className="hover:text-green-300 cursor-pointer size-7" onClick={() => completeTodo(todo.id)}/> 
                <FaTrash className="hover:text-red-300 cursor-pointer size-7" onClick={() => deleteTodo(todo.id)} />
            </div>
        </div>
    )
}

