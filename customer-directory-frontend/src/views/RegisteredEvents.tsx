import type { Event } from '../types/appState';
import { useParams } from 'react-router';
import "./RegisteredEvents.css"

import {useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function RegisteredEvents() {
    const { id } = useParams();
    const events = useSelector((state: RootState) => state.app.events);
    const event = events.find((event: Event) => event.id === id);

    return (
        <div className="registeredEventsDetails">
            <h2>Registered Events</h2>
            <div className="registeredEventList">
                {events
                    .filter(() => true)// TODO: filter based on registered events.
                    .map((event: Event) => (
                        
                        <div key={event.id} className="eventItem">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}
