import react from 'react';
import { useState, useEffect } from 'react';
import { FaCheck, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import Modal from './Modal'

type TodoProp = {
    todo: {
        id: number, 
        text: string, 
        completed: boolean
        date: Date;
        notes?: string,
    };
    completeTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, updateField: Partial<TodoProp['todo']> ) => void; //optional property to just update this field
};

export default function Todo({todo, completeTodo, deleteTodo, updateTodo} : TodoProp) {
    const [open, setOpen] = useState<boolean>(false);
    const [tempNote, setNote] = useState<string> (todo.notes || '');

    useEffect(() => {
        if (open) setNote(todo.notes || '');
    }, [open, todo.notes]);

    const saveNote = () => {
        updateTodo(todo.id, {notes: tempNote});
        setOpen(false);
    };

    return (
        <div className="bg-blue-500 p-2 rounded-md flex justify-between items-center my-4 text-white">
            <p className = {`${todo.completed === true ? 'line-through' : ""}`}>{todo.text}</p>
            <div className="flex item-center gap-2 cursor-pointer items-center">
                <IoIosInformationCircle className="hover:text-gray-200 size-5" onClick={() => setOpen(true) }/>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="flex flex-col gap-6 ">
                                <h1 className="text-small text-black justify-left padding-right:4">{todo.text}</h1>
                                <p className= "text-black text-small">Created On: {new Date(todo.date).toLocaleString()}</p>

                                <textarea className="p-2 border rounded text-black" 
                                placeholder="Add notes..." value={tempNote} 
                                onChange={(e) => setNote(e.target.value)}></textarea>
                                <button className="mt-2 self-end bg-blue-600 text-white px-4 py-1 rounded hover:text-blue-600" 
                                onClick={() => saveNote()}>Save</button>
                        </div>
                    </Modal>
                <FaCheckCircle className="hover:text-gray-200" onClick={() => completeTodo(todo.id)}/> 
                <FaTrash className="hover:text-gray-200" onClick={() => deleteTodo(todo.id)} />
            </div>
        </div>
    )
}

