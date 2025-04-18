interface IConfirmModal {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: (event: React.FormEvent<HTMLFormElement>) => Promise<void> ;
    title: string;
    message: string;
}

export const ConfirmModal: React.FC<IConfirmModal> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
        <form onSubmit={onConfirm}
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">{message}</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                        type="button"
                    >
                        Cancelar
                    </button>
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        type="submit"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </form>    
    );
}