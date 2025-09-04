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
import { addRegistration, deleteEvent, deleteRegistration, updateEvent } from '../redux/actions';
import { createRegistration, removeRegistration } from '../api/registrationsAPI';
import { RegisterCustomerModal } from '../components/RegisterCustomerModal';

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const [showRegisterCustomerModal, setRegisterCustomerModal] = useState(false);
    const state = useSelector((state: RootState) => state.app);
    const events = state.events;
    const event = events.find((event: Event) => event.id === id);
    const userRole = state.user.role;
    const registrations = state.registrations;
    const currentRegistration = registrations.find((registration: Registration) => registration.eventId === id);
    const dispatch = useDispatch();

    const handleDeleteClick = () => setDeleteModal(true);

    const handleCloseDeleteModal = () => setDeleteModal(false);

    const handleDeleteEvent = async (e: any) => {
        e.preventDefault()
        if (event) {
            console.log(event)
            console.log(event.id)
            const response = await removeEvent(event.id);
            if (response.status !== 200) {
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
        const response = await editEvent(event.id, updatedEvent);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Failed to update event');
        }
        dispatch(updateEvent(updatedEvent));
        setEditModal(false);
    }

    const handleRegisterEventClick =  async () => {
        const registration = {
            eventId: event.id,
            customerId: state.user.id,
            dateRegistered: new Date().toISOString()
        };
        const response = await createRegistration(registration);
        if (response.status !== 200) {
            throw new Error('Failed to register event');
        }
        dispatch(addRegistration(response.data));
    }

    const handleUnRegisterEventClick = async () => {
        const registration = registrations.find((reg: Registration) => reg.eventId === event.id && reg.customerId === state.user.id);
        if (registration) {
            const response = await removeRegistration(registration.id);
            if (response.status !== 200) {
                throw new Error('Failed to unregister event');
            }
            dispatch(deleteRegistration(registration.id));
        }
    }

    const handleRegisterCustomers = async (customerIds: string[]) => {
        for (const customerId of customerIds) {
            const registration = {
                eventId: event.id,
                customerId,
                dateRegistered: new Date().toISOString()
            };
            const response = await createRegistration(registration);
            if (response.status !== 200) {
                throw new Error('Failed to register customer');
            }
            dispatch(addRegistration(response.data));
        }
    }

    const handleUnregisterCustomers = async (customerIds: string[]) => {
        for (const customerId of customerIds) {
            const registration = registrations.find((reg: Registration) => reg.eventId === event.id && reg.customerId === customerId);
            if (registration) {
                const response = await removeRegistration(registration.id);
                if (response.status !== 200) {
                    throw new Error('Failed to unregister customer');
                }
                dispatch(deleteRegistration(registration.id));
            }
        }
    }

    const handleRegisterCustomerClick = async () => setRegisterCustomerModal(true);

    const handleCloseRegisterCustomerModal = () => setRegisterCustomerModal(false);

    const handleCloseProfileClick = () => navigate(-1);

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
                           <img className="eventImage" src={event?.bannerImage ? event.bannerImage : "/images/default-event.png"} alt={event?.title} />
                        </div>
                        <div className="eventDetailsGrid">
                            <p className="classifier">Event Title </p> <p>{event.title}</p>
                            <p className="classifier">Location </p> <p>{event.location}</p>
                            <p className="classifier">Start Date </p> <p>{new Date(event.startDateTime).toLocaleString()}</p>
                            <p className="classifier">End Date </p> <p>{new Date(event.endDateTime).toLocaleString()}</p>
                            <p className="classifier">Price </p> <p>{event.price}</p>
                            <p className="classifier">Capacity </p> <p>{event.capacity}</p>
                            <p className="classifier">Description </p> <p>{event.description}</p>
                        </div>
                        {userRole === 'CUSTOMER' && (
                            <div className="eventDetailsActions">
                                {!currentRegistration ? (
                                    <button onClick={handleRegisterEventClick} >Register Event</button>

                                ) : (
                                    <div>
                                        <p className="registrationStatus"> ✔ You registered for this event on {new Date(currentRegistration.dateRegistered).toLocaleString()}</p>
                                        <button className="delete" onClick={handleUnRegisterEventClick} >Unregister Event</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {userRole === 'ADMIN' && (
                            <div className="eventDetailsActions">
                                <button onClick={handleRegisterCustomerClick} >Register Customers</button>
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

                    {showRegisterCustomerModal && (<RegisterCustomerModal
                        eventId={event.id}
                        onClose={handleCloseRegisterCustomerModal}
                        onSave={handleRegisterCustomers}
                        onUnregister={handleUnregisterCustomers}
                    />)}
                </>
            ) : (
                <p>No event data available.</p>
            )}
        </div>
    )
}