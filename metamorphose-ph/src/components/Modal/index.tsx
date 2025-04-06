

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}
export const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}: ModalProps)=> {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>

        </div>
    )
}