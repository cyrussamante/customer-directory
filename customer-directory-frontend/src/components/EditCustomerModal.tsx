import { useState, useRef, useEffect } from "react";
import type Customer from "../types/customer";
import "./Modal.css"

interface props {
    customer: Customer
    onClose: () => void;
    onSave: (updatedCustomer: Customer) => void;
}

export default function EditCustomerModal({ customer, onClose, onSave }: props) {

    const [formData, setFormData] = useState(customer);
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
        const updatedCustomer = formData
        onSave(updatedCustomer)
        dialogRef.current?.close();
    };

    const handleClose = () => {
        dialogRef.current?.close();
        onClose();
    };

    return (
        <dialog className="modal" ref={dialogRef} onClose={onClose}>
            <h2 className="modalHeading">Edit details</h2>
            <form className="modalForm">
                <div className="modalGrid">
                    <label>Name</label>
                    <input className="modalInput"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Age</label>
                    <input className="modalInput"
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    <label>Gender</label>
                    <input className="modalInput"
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                    <input className="modalInput"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                    <input className="modalInput"
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label>Address</label>
                    <input className="modalInput"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    {/* <label>Image</label>
                        <input className="modalInput"
                            type="text"
                            name="address"
                            placeholder="Image"
                            value={formData.address}
                            onChange={handleChange}
                        /> 
                         replace with upload button */}
                </div>
                <div className="modalButtons">
                    <button className="save" onClick={handleSubmit}>
                        Save
                    </button>
                    <button className="cancel" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </dialog>
    )
}