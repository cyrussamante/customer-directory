import type { Event, Registration } from '../types/appState';
import { useParams } from 'react-router';
import "./EventDetails.css"
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import EventModal from '../components/EventModal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { editEvent, removeEvent } from '../api/eventsAPI';
import { deleteEvent, updateEvent } from '../redux/actions';

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const events = useSelector((state: RootState) => state.app.events);
    const event = events.find((event: Event) => event.id === id);
    const userRole = useSelector((state: RootState) => state.app.user.role);
    const token = useSelector((state: RootState) => state.app.token);
    //const registrations = useSelector((state: RootState) => state.app.registrations);
    //const isRegistered = registrations.some((registration: Registration) => registration.eventId === id);
    const isRegistered = false;
    const dispatch = useDispatch();

    const handleDeleteClick = () => setDeleteModal(true);

    const handleCloseDeleteModal = () => setDeleteModal(false);

    const handleDeleteEvent = async (e: any) => {
        e.preventDefault()
        if (event) {
            console.log(event)
            console.log(event.id)
            const response = await removeEvent(event.id, token);
            if (response.status !== 204) {
                throw new Error('Failed to delete event');
            }
            dispatch(deleteEvent(event.id));
            setDeleteModal(false);
            navigate('/events');
        }
    }

    const handleEditClick = () => setEditModal(true);

    const handleCloseEditModal = () => setEditModal(false);

    const handleEditEvent = async (updatedEvent: Event) => {
        const response = await editEvent(event.id, updatedEvent, token);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Failed to update event');
        }
        dispatch(updateEvent(updatedEvent));
        setEditModal(false);
    }

    //  TODO - work on register event.
    const handleRegisterEventClick = () => navigate('/events');

    const handleUnRegisterEventClick = () => navigate('/events');

    const handleCloseProfileClick = () => navigate('/events');

    return (
        <div className="eventDetails">
            {event ? (
                <>
                    <div className="eventDetailsHead">
                        <h2>{event.title}</h2>
                        <div className="eventDetailsButtons">
                            {userRole === 'ADMIN' && (
                                <>
                                    <button className="edit" onClick={handleEditClick} >Edit Details </button>
                                    <button className="delete" onClick={handleDeleteClick} >Delete</button>
                                </>
                            )}
                            <button onClick={handleCloseProfileClick} >Close Event</button>
                        </div>
                    </div>
                    <div className="eventDetailsBody">
                        <div className="eventImageContainer">
                            <img src={event?.bannerImage ? event.bannerImage : '/images/default-event.png'} alt={event.title} />
                        </div>
                        <div className="eventDetailsGrid">
                            <p className="classifier">Event Title </p> <p>{event.title}</p>
                            <p className="classifier">Location </p> <p>{event.location}</p>
                            <p className="classifier">Date</p> <p>{event.startDateTime}</p>
                            <p className="classifier">Price </p> <p>{event.price}</p>
                            <p className="classifier">Capacity </p> <p>{event.capacity}</p>
                            <p className="classifier">Description </p> <p>{event.description}</p>
                        </div>
                        {userRole === 'CUSTOMER' && (
                            <div className="eventDetailsActions">
                                {!isRegistered ? (
                                    <button onClick={handleRegisterEventClick} >Register Event</button>
                                ) : (
                                    <button className="delete" onClick={handleUnRegisterEventClick} >Unregister Event</button>
                                )}
                            </div>
                        )}
                    </div>

                    {showEditModal && (<EventModal
                        mode={'edit'}
                        event={event}
                        onClose={handleCloseEditModal}
                        onSave={handleEditEvent} />)}

                    {showDeleteModal && (<DeleteConfirmationModal
                        onClose={handleCloseDeleteModal}
                        onConfirm={handleDeleteEvent} />)}
                </>
            ) : (
                <p>Event not found.</p>
            )}
        </div>
    )
}