import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./EventsCard.css";
import type { Event } from '../types/appState';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface props {
    event: Event,
    isLoggedIn: boolean
}

export default function EventsCard({ event, isLoggedIn }: props): ReactElement {

    const navigate = useNavigate();

    // Format dates to readable strings
    const start = new Date(event.startDateTime);
    const formattedStart = start.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const navigateToEventDetails = () => {
        if (isLoggedIn) {
            navigate(`/events/${event.id}`);
        }
    };

    return (
        <div className="eventCard">
            <div className="eventCardBody">
                <img src={event?.bannerImage ? event.bannerImage : '/images/default-event.png'} alt={event.title} />
                <div className="event-info">
                    <div className="event-specifics">
                        <div className="title-location">
                            <p className="event-title">{event.title}</p>
                            <p className="event-location">{event.location}</p>
                        </div>
                        <p className="event-dates">{formattedStart}</p>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <button className="event-button" disabled={!isLoggedIn} onClick={navigateToEventDetails}>View Details</button>

                </div>
            </div>
            <div className="eventCardIcon">
                {!isLoggedIn && <VisibilityOffIcon />}
            </div>
        </div>
    )
}