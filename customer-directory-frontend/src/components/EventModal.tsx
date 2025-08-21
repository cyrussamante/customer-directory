import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

interface Props {
    mode: 'add' | 'edit';
    event?: any;
    onClose: () => void;
    onSave: (event: any) => void;
}

export default function EventModal({ mode, event, onClose, onSave }: Props) {

    const initialFormData = {
        title: "",
        startDateTime: "",
        endDateTime: "",
        location: "",
        price: 0,
        bannerImage: "",
        description: "",
        capacity: 0,
    };

    const [formData, setFormData] = useState(mode === 'edit' ? event : initialFormData);
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
            title: formData.title.trim(),
            startDateTime: formData.startDateTime,
            endDateTime: formData.endDateTime,
            location: formData.location.trim(),
            price: formData.price,
            description: formData.description.trim(),
            capacity: formData.capacity,  
            bannerImage: formData.bannerImage.trim(),
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
                alert(err?.message || "Failed to create event");
            }
            dialogRef.current?.close();
            navigate("/events");
        }

        if (mode === 'edit') {
            const updatedEvent = {
                id: event.id,
                ...payload,
                bannerImage: event.bannerImage
            }
            onSave(updatedEvent)
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
                {mode === 'add' ? 'Add a new event' : 'Edit event details'}
            </h2>
            <form className="modalForm">
                <div className="modalGrid">
                    <label>Title</label>
                    <input className="modalInput"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        type="text"
                        required
                    />
                    <label>Start Date & Time</label>
                    <input className="modalInput"
                        type="datetime-local"
                        name="startDateTime"
                        value={formData.startDateTime}
                        onChange={handleChange}
                        required
                    />
                    <label>End Date & Time</label>
                    <input className="modalInput"
                        type="datetime-local"
                        name="endDateTime"
                        value={formData.endDateTime}
                        onChange={handleChange}
                        required
                    />
                    <label>Location</label>
                    <input className="modalInput"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        type="text"
                        onChange={handleChange}
                        required
                    />
                    <label>Price</label>
                    <input className="modalInput"
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <label>Banner Image </label>
                    <input className="modalInput"
                        type="text"
                        name="bannerImage"
                        placeholder="Banner Image"
                        value={formData.bannerImage}
                        onChange={handleChange}
                        required
                    />
                    <label>Description</label>
                    <textarea className="modalInput"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                    <label>Capacity</label>
                    <input className="modalInput"
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="Capacity"
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