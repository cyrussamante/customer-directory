import type { Event } from '../types/appState';
import { useNavigate, useParams } from 'react-router';
import "./RegisteredEvents.css"

import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function RegisteredEvents() {
    const { id } = useParams();
    const events = useSelector((state: RootState) => state.app.events);
    const event = events.find((event: Event) => event.id === id);
    const navigate = useNavigate();


    return (
        <div className="registeredEventsDetails">
            <h2 className="registeredEvents">Registered Events</h2>
            <div className="registeredEventList">
                {events
                    .filter(() => true)// TODO: filter based on registered events.
                    .map((event: Event) => (
                        <div key={event.id} className="eventItem" onClick={() => navigate(`/events/${event.id}`)}>
                            <h3 className="registeredEventTitle">{event.title}</h3>
                            <div className="location-date">
                                <p>{event.location}</p>
                                <p>{new Date(event.startDateTime).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
