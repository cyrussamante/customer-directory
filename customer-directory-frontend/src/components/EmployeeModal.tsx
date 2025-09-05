import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

interface Props {
    mode: 'add' | 'edit';
    employee?: any;
    onClose: () => void;
    onSave: (employee: any) => void;
}

export default function Modal({ mode, employee, onClose, onSave }: Props) {

    const initialFormData = {
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE",
    };

    const [formData, setFormData] = useState(mode === 'edit' ? { ...employee, password: '' } : initialFormData);
    const navigate = useNavigate();
    const dialogRef = useRef<HTMLDialogElement>(null);


    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();


        const payload: { name: string; email: string; role: string; password?: string } = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            role: formData.role,
        };

        if (formData.password && formData.password.trim() !== "") {
            payload.password = formData.password;
        }

        const isAnyFieldEmpty = Object.values(payload).some(value => value === '');
        if (isAnyFieldEmpty) {
            alert('Please fill in all fields');
            return;
        }

        if (mode === 'add') {
            if (!formData.password || formData.password.trim() === "") {
                alert('Password is required for new employees');
                return;
            }
            try {
                onSave(payload);
            } catch (err: any) {
                alert(err?.message || "Failed to create employee");
            }
            dialogRef.current?.close();
            navigate("/employees");
        }
        if (mode === 'edit') {
            const updatedEmployee = {
                id: employee.id,
                ...payload
            }
            onSave(updatedEmployee)
            dialogRef.current?.close();
        }
    };

    const handleClose = () => {
        dialogRef.current?.close();
        onClose();
    };

    return (
        <dialog className="modal" ref={dialogRef} onClose={onClose}>
            <h2 className="modalHeading">
                {mode === 'add' ? 'Add a new employee' : 'Edit employee details'}
            </h2>
            <form className="modalForm">
                <div className="modalGrid">
                    <label>Name</label>
                    <input className="modalInput"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        type="text"
                        required
                    />
                    <label>Email</label>
                    <input className="modalInput"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                    <input className="modalInput"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label>Role</label>
                    <select className="modalInput"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select a Role</option>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <div className="modalButtons">
                    <button className="save" onClick={handleSubmit}>Save</button>
                    <button className="cancel" onClick={handleClose}>Cancel</button>
                </div>
            </form>
        </dialog>
    );
}