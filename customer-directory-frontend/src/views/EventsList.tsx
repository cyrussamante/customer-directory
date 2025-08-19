import type { Event } from '../types/appState';
import EventsCard from '../components/EventsCard';
import { useState } from "react";
import "./EventsList.css";
import Modal from '../components/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import ListIcon from '@mui/icons-material/List';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { addEvent } from '../redux/actions';
import { createEvent } from '../api/eventsAPI';



export default function EventsList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
    const events: Event[] = useSelector((state: RootState) => state.app.events);
    const dispatch = useDispatch();

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClick = () => {
        if (isLoggedIn) setShowAddModal(true);
    };

    const handleCloseModal = () => setShowAddModal(false);

    const handleAddEvent = async (event: any) => {
        const response = await createEvent(event)
        dispatch(addEvent(response.data))
        setShowAddModal(false)
    }

    return (
        <div className="events">
            <div className="eventsHeader">
                <ListIcon />
                <h2>Events</h2>
            </div>
            <div className="search">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search events"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button disabled={!isLoggedIn} onClick={handleAddClick}>
                    Add Event
                </button>
            </div>
            <div className="searchLabels">
                {!isLoggedIn && (
                    <div className="hint">
                        <WarningIcon />
                        <p>Login to add events</p>
                    </div>
                )}
            </div>

            {filteredEvents.length === 0 ? (
                <div className="noEvents">
                    <SentimentDissatisfiedIcon />
                    <p>No events found.</p>
                </div>
            ) : (
                <div className="grid">
                    {filteredEvents.map((event: Event) => (
                        <EventsCard key={event.id} event={event} isLoggedIn={isLoggedIn} />
                    ))}
                </div>
            )}

            {showAddModal && (<Modal
                mode={'add'}
                onClose={handleCloseModal}
                onSave={handleAddEvent} />)}
        </ div>
    )
}