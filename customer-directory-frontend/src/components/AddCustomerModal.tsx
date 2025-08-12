import { useState } from "react";
import type Customer from "../types/customer";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../api/customersAPI";
import "./Modal.css";

interface Props {
  onClose: () => void;
  onSaved?: (c: Customer) => void; // parent will append
}

export default function AddCustomerModal({ onClose, onSaved }: Props) {
  const initialFormData: Customer = {
    id: "",
    name: "",
    age: 0,
    gender: "",
    email: "",
    password: "",
    address: "",
    imageUrl: "",
    numberOfOrders: 0,
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // All fields required (image handled by backend)
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.gender.trim() ||
      !formData.password ||
      !formData.address.trim() ||
      !Number.isFinite(formData.age) ||
      !Number.isFinite(formData.numberOfOrders)
    ) {
      alert("All fields are required.");
      return;
    }

    const payload: Omit<Customer, "id" | "imageUrl"> = {
      name: formData.name.trim(),
      age: Number(formData.age),
      gender: formData.gender.trim(),
      email: formData.email.trim(),
      password: formData.password,
      address: formData.address.trim(),
      numberOfOrders: Number(formData.numberOfOrders),
    };

    try {
      const created = await createCustomer(payload);
      onSaved?.(created);     // tell parent to append
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
            <input className="modalInput" name="name" value={formData.name} onChange={handleChange} required />

            <label className="label">Age</label>
            <input className="modalInput" type="number" name="age" value={formData.age} onChange={handleChange} required />

            <label className="label">Gender</label>
            <input className="modalInput" name="gender" value={formData.gender} onChange={handleChange} required />

            <label className="label">Email</label>
            <input className="modalInput" type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label className="label">Password</label>
            <input className="modalInput" type="password" name="password" value={formData.password} onChange={handleChange} required />

            <label className="label">Address</label>
            <input className="modalInput" name="address" value={formData.address} onChange={handleChange} required />

            <label className="label"># of Orders</label>
            <input
              className="modalInput"
              type="number"
              name="numberOfOrders"
              value={formData.numberOfOrders}
              onChange={handleChange}
              required
            />
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
