import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./EventsCard.css";
import type { Event } from '../types/appState';
import { getImage } from "../api/imagesAPI";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface props {
    event: Event
}

export default function EventsCard({ event }: props): ReactElement {

    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.app.token);

    const start = new Date(event.startDateTime);
    const formattedStart = start.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const navigateToEventDetails = () => navigate(`/events/${event.id}`);

    return (
        <div className="eventCard">
            <div className="eventCardBody">
                <img className="eventImg" src={event?.bannerImage ? event.bannerImage : "/images/default-event.png"} alt={event?.title} />
                <div className="event-info">
                    <div className="event-specifics">
                        <div className="title-location">
                            <p className="event-title">{event.title}</p>
                            <p className="event-location">{event.location}</p>
                        </div>
                        <p className="event-dates">{formattedStart}</p>
                    </div>
                    <button className="event-button" onClick={navigateToEventDetails}>View Details</button>
                </div>
            </div>
        </div>
    )
}