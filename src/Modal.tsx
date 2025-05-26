// reusable modal component (pop-up) to display addtl info like date created and notes

type propTypes = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<propTypes> = ({open, onClose, children}) => {  

    return (
        <div className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-200 ${open ? "visible bg-black/50" : "invisible"}`} >
            <div className={`relative bg-white rounded-xl shadow-lg p-6 max-w-lg w-full transform duration-300 transition-all max-w-md ${open ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} >
                <button className = "absolute top-2 right-2 p-1 transition border border-neutral-200 rounded-md text-white bg-white hover:bg-gray:50 hover:text-blue-300"
                 onClick={onClose} >X</button>
                 {children}
            </div>
        </div>
    )
};

export default Modal;