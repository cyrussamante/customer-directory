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

    const [bannerImageUrl, setBannerImageUrl] = useState<string>("default-event.png");

    useEffect(() => {
        const fetchImage = async () => {
            let imgSrc = "default-event.png";

            if (event?.bannerImage) {
                try {
                    const response = await getImage(event.bannerImage);
                    imgSrc = URL.createObjectURL(response.data);
                } catch (error: any) {
                    if (error?.response?.status === 401 || error?.response?.status === 404) {
                        imgSrc = "default-event.png";
                    } else {
                        imgSrc = "default-event.png";
                    }
                }
            }
            setBannerImageUrl(imgSrc);
        };
        fetchImage();
        return () => {
            if (bannerImageUrl.startsWith("blob:")) {
                URL.revokeObjectURL(bannerImageUrl);
            }
        };
    }, [event, token]);

    return (
        <div className="eventCard">
            <div className="eventCardBody">
                <img src={bannerImageUrl} alt={event.title} />
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