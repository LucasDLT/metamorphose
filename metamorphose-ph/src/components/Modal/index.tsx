

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}
export const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}: ModalProps)=> {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>

        </div>
    )
}