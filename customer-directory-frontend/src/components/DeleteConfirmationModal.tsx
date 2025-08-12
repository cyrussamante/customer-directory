import "./Modal.css"

interface props {
    onClose: () => void;
    onConfirm: (e: any) => void;
}

export default function DeleteConfirmationModal ({onClose, onConfirm}: props) {

    return (
        <div className="modal" onClick={onClose}>
            <div className="modalCard" onClick={e => e.stopPropagation()}>
                <h2 className="heading">Are you sure you want to delete?</h2>
                <form className="modalForm">
                    <label className="heading">This action cannot be reversed.</label>
                    <div className="modalButtons">
                        <button className="delete" onClick={onConfirm}>
                            Confirm
                        </button>
                        <button className="cancel" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}