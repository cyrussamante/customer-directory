import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import { uploadImage } from "../api/imagesAPI";
import { generateEventDescription, generateEventDetails } from "../api/aiAPI";

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
        price: "",
        bannerImage: "/images/default-event.png",
        description: "",
        capacity: "",
    };

    const [formData, setFormData] = useState(mode === 'edit' ? event : initialFormData);
    const navigate = useNavigate();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

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
        let bannerImage = formData.bannerImage;
        if (imageFile) {
            try {
                const response = await uploadImage(imageFile);
                bannerImage = response.data.imageUrl;
            } catch (err) {
                console.log(err)
                alert('Image upload failed');
                return;
            }
        }
        const payload = {
            title: formData.title.trim(),
            startDateTime: formData.startDateTime,
            endDateTime: formData.endDateTime,
            location: formData.location.trim(),
            price: Number(formData.price),
            description: formData.description.trim(),
            capacity: Number(formData.capacity),
            bannerImage: bannerImage,
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
                alert(err?.message || "Failed to create event");
            }
            dialogRef.current?.close();
            navigate("/events");
        }

        if (mode === 'edit') {
            const updatedEvent = {
                id: event.id,
                ...payload
            }
            onSave(updatedEvent)
            dialogRef.current?.close();
        }
    };

    const handleClose = () => {
        dialogRef.current?.close();
        onClose();
    };

    // const handleGenerateWithAI = async () => {
    //     if (!prompt.trim()) return;
    //     setIsGenerating(true);
    //     try {
    //         const response = await generateEventDetails(prompt);
    //         const eventData = response.data;
    //         setFormData({
    //             ...eventData,
    //             startDateTime: new Date(eventData.startDateTime).toISOString().slice(0, 16),
    //             endDateTime: new Date(eventData.endDateTime).toISOString().slice(0, 16),
    //             price: eventData.price.toString(),
    //             capacity: eventData.capacity.toString()
    //         });
    //         setPrompt("");
    //     } catch (error) {
    //         console.error('Failed to generate event:', error);
    //         alert('Failed to generate event details. Please try again.');
    //     } finally {
    //         setIsGenerating(false);
    //     }
    // };

    const handleGenerateEventDescription = async () => {
        if (!formData.title || !formData.startDateTime || !formData.endDateTime) {
            alert('Please fill in all required fields');
            return;
        }
        setIsGenerating(true);
        try {
            const response = await generateEventDescription(formData);
            const eventDescription = response.data.description;
            setFormData((prevData: any) => ({
                ...prevData,
                description: eventDescription
            }));
        } catch (error) {
            console.error('Failed to generate event description:', error);
            alert('Failed to generate event description. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <dialog className="modal eventModal" ref={dialogRef} onClose={onClose}>
            <h2 className="modalHeading">{mode === 'add' ? 'Add a new event' : 'Edit details'}</h2>
            {/* {mode === 'add' && (
                <div className="aiAssist">
                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the event you want to create..." />
                    <button onClick={handleGenerateWithAI} disabled={isGenerating || !prompt}>
                        {isGenerating ? 'Generating...' : 'Generate with AI'}
                    </button>
                </div>
            )} */}
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
                    <label>Capacity</label>
                    <input className="modalInput"
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="Capacity"
                        required
                    />
                    <div className="descriptionLabel">
                        <label>Description</label>
                        {mode === 'add' && (
                        <button type="button" className="generateDescriptionBtn" onClick={handleGenerateEventDescription} disabled={isGenerating}>
                            {isGenerating ? 'Generating...' : 'Generate with AI'}
                        </button>
                        )}
                    </div>
                    <textarea className="modalInput description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                    <label>Banner Image</label>
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