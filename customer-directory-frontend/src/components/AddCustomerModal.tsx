import { useState } from "react";
import type Customer from "../types/customer";
import { useNavigate } from 'react-router-dom';
import "./Modal.css"

interface props {
    onClose: () => void;
}

export default function AddCustomerModal({ onClose }: props) {

    const initialFormData: Customer = {
        id: '',
        name: '',
        age: 0,
        email: '',
        password: '',
        address: '',
        imageUrl: '',
        numberOfOrders: 0
    }
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        //save to backend 
        navigate('/customers')
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modalCard" onClick={e => e.stopPropagation()}>
                <h2 className="heading">Add a new customer</h2>
                <form className="modalForm">
                    <input className="modalInput"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
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