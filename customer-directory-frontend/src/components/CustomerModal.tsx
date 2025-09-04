import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from '../api/imagesAPI';
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
        dateOfBirth: "",
        gender: "",
        email: "",
        password: "",
        address: "",
        numberOfOrders: "",
        imageUrl: "/images/default-profile.png",
        role: "CUSTOMER"
    };

    const [formData, setFormData] = useState(mode === 'edit' ? customer : initialFormData);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
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

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview("");
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let imageUrl = formData.imageUrl;
        if (imageFile) {
            try {
                const response = await uploadImage(imageFile);
                imageUrl = response.data.imageUrl;
            } catch (err) {
                console.log(err)
                alert('Image upload failed');
                return;
            }
        }
        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role: 'CUSTOMER',
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender.trim(),
            address: formData.address.trim(),
            numberOfOrders: Number(formData.numberOfOrders),
            imageUrl: imageUrl
        };
        const isAnyFieldEmpty = Object.values(payload).some(value => value === '');
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
                ...payload
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
                {mode === 'add' ? 'Add a new customer' : 'Edit details'}
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
                    <label>Date of Birth</label>
                    <input className="modalInput"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        placeholder="Date of Birth"
                        required
                    />
                    <label>Gender</label>
                    <select className="modalInput"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                        <option value="NOT_SPECIFIED">Not Specified</option>
                    </select>
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
                    <label>Image</label>
                    <input className="modalInput bannerImg" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} />
                    {imageFile && imagePreview && (
                        <img className="profileImagePreview" src={imagePreview} alt="Preview" />
                    )}
                </div>

                <div className="modalButtons">
                    <button className="save" onClick={handleSubmit}>Save</button>
                    <button className="cancel" onClick={handleClose}>Cancel</button>
                </div>
            </form>
        </dialog>
    );
}