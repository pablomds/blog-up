import { ReactNode} from 'react'

interface IModal {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ open, onClose, children } : IModal) => {
  return (
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-blog-up-black-light/80" : "invisible"}`}>
        <div className={`bg-blog-up-black rounded-xl shadow m-2 p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
            {children}
        </div>
    </div>
  )
}

export default Modal