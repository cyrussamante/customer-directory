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

    const handleViewDetails = () => {
        if (isLoggedIn) {
            navigate(`/events/${event.id}`);
        }
    };

    return (
        <div className="eventCard">
            <div className="eventCardIcon">
                {!isLoggedIn && <VisibilityOffIcon />}
            </div>
            <div className="eventCardBody">
                <img src={event?.bannerImage} alt={event.title} />
                <p>{event.title}</p>
                <button disabled={!isLoggedIn} onClick={handleViewDetails}>View Details</button>
            </div>
        </div>
    )
}