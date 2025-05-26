// reusable modal component (pop-up) to display addtl info like date created and notes

type propTypes = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<propTypes> = ({open, onClose, children}) => {  

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`} >
            <div className={`max-h-[700px] bg-white rounded-lg shadow p-6 transition-all max-w-md ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} >
                <button className = "absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-white bg-white hover:bg-gray:50 hover:text-blue-300"
                 onClick={onClose} >X</button>
                 {children}
            </div>
        </div>
    )
};

export default Modal;