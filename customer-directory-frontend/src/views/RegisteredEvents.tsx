import type { Event, Registration } from '../types/appState';
import { useNavigate } from 'react-router';
import "./RegisteredEvents.css"
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

interface Props {
    customerId?: string;
}

export default function RegisteredEvents({ customerId }: Props) {
    const state = useSelector((state: RootState) => state.app);
    const events = state.events;
    const filteredRegistrations = state.registrations.filter((registration: Registration) => {
        if (state.user.role === 'CUSTOMER') {
            return registration.customerId === state.user.id;
        } else {
            return registration.customerId === customerId;
        }
    });
    const navigate = useNavigate();

    return (
        <div className="registeredEventsDetails">
            <h2 className="registeredEvents">Registered Events</h2>
            <div className="registeredEventList">
                {events
                    .filter((event: Event) => filteredRegistrations.some((registration: Registration) => registration.eventId === event.id))
                    .map((event: Event) => (
                        <div key={event.id} className="eventItem" onClick={() => navigate(`/events/${event.id}`)}>
                            <h3 className="registeredEventTitle">{event.title}</h3>
                            <div className="location-date">
                                <p>{event.location}</p>
                                <p>{new Date(event.startDateTime).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                {filteredRegistrations.length === 0 && <span className="noResults">No active registrations found</span>}
            </div>
        </div>
    )
}