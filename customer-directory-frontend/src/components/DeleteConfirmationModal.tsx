import { useRef, useEffect } from "react";
import "./Modal.css"
import WarningIcon from '@mui/icons-material/Warning';

interface props {
    onClose: () => void;
    onConfirm: (e: any) => void;
}

export default function DeleteConfirmationModal({ onClose, onConfirm }: props) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    const handleConfirm = (e: any) => {
        onConfirm(e);
        dialogRef.current?.close();
    };

    const handleClose = () => {
        dialogRef.current?.close();
        onClose();
    };

    return (
        <dialog className="modal" ref={dialogRef} onClose={onClose}>
            <div className="modalForm">
                <h2 className="modalHeading">Are you sure you want to delete?</h2>
                <div className="hint">
                        <WarningIcon />
                        <p className="modalSubheading">This action cannot be reversed.</p>
                    </div>
                <div className="modalButtons">
                    <button className="delete" onClick={handleConfirm}>
                        Confirm
                    </button>
                    <button className="cancel" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    )
}