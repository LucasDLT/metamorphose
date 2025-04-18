

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}
export const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}: ModalProps)=> {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 " onClick={onClose}>
            <div className="p-4 rounded-lg shadow-md max-w-[90vw] max-h-[90vh]"  onClick={(e) => e.stopPropagation()}>
                {children}
            </div>

        </div>
    )
}