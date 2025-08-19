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

    const handleRegisterEvent = () => {
        if (isLoggedIn) {
            navigate(`/events/${event.id}`);
        }
    };

    return (
        <div className="eventCard">
            <div className="eventCardBody">
                <img src={event?.bannerImage ? event.bannerImage : '/images/default-event.png'} alt={event.title} />
                <div className="event-info">
                    <div className="title-location">
                        <h1>{event.title}</h1>
                        <p>{event.location}</p>
                    </div>
                    <p>{event.startDateTime.toString()} - {event.endDateTime.toString()}</p>
                    <p>{event.description}</p>
                    <button disabled={!isLoggedIn} onClick={handleRegisterEvent}>Register for Event</button>

                </div>
            </div>
            <div className="eventCardIcon">
                {!isLoggedIn && <VisibilityOffIcon />}
            </div>
        </div>
    )
}