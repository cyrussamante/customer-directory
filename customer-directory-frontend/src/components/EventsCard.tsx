import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./EventsCard.css";
import type { Event } from '../types/appState';

interface props {
    event: Event
}

export default function EventsCard({ event }: props): ReactElement {

    const navigate = useNavigate();

    const start = new Date(event.startDateTime);
    const formattedStart = start.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const navigateToEventDetails = () => navigate(`/events/${event.id}`);

    return (
        <div className="eventCard">
            <div className="eventCardBody">
                <img className="eventImg" src={event?.bannerImage ? event.bannerImage : "/images/default-event.png"} alt={event?.title} />
                <div className="eventInfo">
                    <p className="eventTitle">{event.title}</p>
                    <div className="eventFields">
                        <p className="eventDates">{formattedStart}</p>
                        <p className="eventLocation">{event.location}</p>
                    </div>
                    <div className="eventSpecifics">
                        <button onClick={navigateToEventDetails}>View Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}