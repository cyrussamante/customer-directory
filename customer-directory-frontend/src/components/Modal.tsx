import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

interface Props {
    mode: 'add' | 'edit';
    customer?: any;
    onClose: () => void;
    onSave: (customer: any) => void;
}

export default function Modal({ mode, customer, onClose, onSave }: Props) {

    const initialFormData = {
        name: "",
        age: 0,
        gender: "",
        email: "",
        password: "",
        address: "",
        numberOfOrders: 0,
    };

    const [formData, setFormData] = useState(mode === 'edit' ? customer : initialFormData);
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const payload = {
            name: formData.name.trim(),
            age: formData.age,
            gender: formData.gender.trim(),
            email: formData.email.trim(),
            password: formData.password,
            address: formData.address.trim(),
            numberOfOrders: formData.numberOfOrders,
        };
        const isAnyFieldEmpty = Object.values(payload).some(value => value === '' );
        if (isAnyFieldEmpty) {
            alert('Please fill in all fields');
            return;
        }

        if (mode === 'add') {
            try {
                onSave(payload);
            } catch (err: any) {
                alert(err?.message || "Failed to create customer");
            }
            dialogRef.current?.close();
            navigate("/customers");
        }

        if (mode === 'edit') {
            const updatedCustomer = {
                id: customer.id,
                ...payload,
                imageUrl: customer.imageUrl
            }
            onSave(updatedCustomer)
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
                {mode === 'add' ? 'Add a new customer' : 'Edit customer details'}
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
                    <label>Age</label>
                    <input className="modalInput"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                    />
                    <label>Gender</label>
                    <input className="modalInput"
                        name="gender"
                        placeholder="Gender"
                        value={formData.gender}
                        type="text"
                        onChange={handleChange}
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

                    <label>Address</label>
                    <input className="modalInput"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        type="text"
                        placeholder="Address"
                        required
                    />
                    <label>Number of Orders</label>
                    <input className="modalInput"
                        name="numberOfOrders"
                        value={formData.numberOfOrders}
                        onChange={handleChange}
                        type="number"
                        placeholder="Orders"
                        required
                    />
                </div>

                <div className="modalButtons">
                    <button className="save" onClick={handleSubmit}>Save</button>
                    <button className="cancel" onClick={handleClose}>Cancel</button>
                </div>
            </form>
        </dialog>
    );
}