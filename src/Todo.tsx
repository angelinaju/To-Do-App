import react from 'react';
import { useState } from 'react';
import { FaCheck, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import Modal from './Modal'

type TodoProp = {
    todo: {
        id: number, 
        text: string, 
        completed: boolean
    };
    completeTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
};

export default function Todo({todo, completeTodo, deleteTodo} : TodoProp) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="bg-blue-500 p-2 rounded-md flex justify-between items-center my-4 text-white">
            <p className = {`${todo.completed === true ? 'line-through' : ""}`}>{todo.text}</p>
            <div className="flex item-center gap-2 cursor-pointer items-center">
                <IoIosInformationCircle className="hover:text-gray-200 size-5" onClick={() => setOpen(true) }/>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="flex flex-col gap-6 ">
                                <h1 className="text-small text-black justify-left padding-right:4">{todo.text}</h1>
                                <p className= "text-black text-small"></p>
                        </div>
                    </Modal>
                <FaCheckCircle className="hover:text-gray-200" onClick={() => completeTodo(todo.id)}/> 
                <FaTrash className="hover:text-gray-200" onClick={() => deleteTodo(todo.id)} />
            </div>
        </div>
    )
}

