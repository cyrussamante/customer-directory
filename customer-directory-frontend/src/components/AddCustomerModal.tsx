import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

interface Props {
    onClose: () => void;
    onSave: (customer: any) => void;
}

export default function AddCustomerModal({ onClose, onSave }: Props) {
    const initialFormData = {
        name: "",
        age: 0,
        gender: "",
        email: "",
        password: "",
        address: "",
        numberOfOrders: 0,
    };
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();

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

        try {
            //   const created = await createCustomer(payload);
            onSave(payload);     // tell parent to append
            onClose();              // close modal
            navigate("/customers"); // stay consistent with your flow
        } catch (err: any) {
            alert(err?.message || "Failed to create customer");
        }
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modalCard" onClick={(e) => e.stopPropagation()}>
                <h2 className="heading">Add a new customer</h2>

                <form className="modalForm" onSubmit={handleSubmit}>
                    <div className="modalGrid">
                        <label className="label">Name</label>
                        <input className="modalInput"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            type="text"
                            required />

                        <label className="label">Age</label>
                        <input className="modalInput"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                            required />

                        <label className="label">Gender</label>
                        <input className="modalInput"
                            name="gender"
                            placeholder="Gender"
                            value={formData.gender}
                            type="text"
                            onChange={handleChange}
                            required />

                        <label className="label">Email</label>
                        <input className="modalInput"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required />

                        <label className="label">Password</label>
                        <input className="modalInput"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange} required />

                        <label className="label">Address</label>
                        <input className="modalInput"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            type="text"
                            placeholder="Address"
                            required />
                    </div>

                    <div className="modalButtons">
                        <button className="button save" type="submit">Save</button>
                        <button className="button cancel" type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
