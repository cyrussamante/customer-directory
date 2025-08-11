import { useState } from "react";
import type Customer from "../types/customer";
import "./Modal.css"

interface props {
    customer: Customer
    onClose: () => void;
    onSave: (updatedCustomer: Customer) => void;
}

export default function EditCustomerModal({customer, onClose, onSave }: props) {

    const [formData, setFormData] = useState(customer);

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
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modalCard" onClick={e => e.stopPropagation()}>
                <h2 className="heading">Add a new customer</h2>
                <form className="modalForm">
                    <div className="modalGrid">
                        <label className="label">Name</label>
                        <input className="modalInput"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label className="label">Age</label>
                        <input className="modalInput"
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                        <label className="label">Gender</label>
                        <input className="modalInput"
                            type="text"
                            name="gender"
                            placeholder="Gender"
                            value={formData.gender}
                            onChange={handleChange}
                        />
                        <label className="label">Email</label>
                        <input className="modalInput"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label className="label">Password</label>
                        <input className="modalInput"
                            type="text"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <label className="label">Address</label>
                        <input className="modalInput"
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <label className="label">Image</label>
                        {/* <input className="modalInput"
                            type="text"
                            name="address"
                            placeholder="Image"
                            value={formData.address}
                            onChange={handleChange}
                        /> */}
                        {/* replace with upload button */}
                    </div>
                    <div className="modalButtons">
                        <button className="button save" onClick={handleSubmit}>
                            Save
                        </button>
                        <button className="button cancel" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}