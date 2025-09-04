import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import type { Customer } from '../types/appState';

interface props {
    customer: Customer,
}

export default function CustomerCard({ customer }: props): ReactElement {

    const navigate = useNavigate();
    const handleViewDetails = () => navigate(`/customers/${customer.id}`);

    return (
        <div className="card">
            <div className="cardBody">
                <img className="customerImg" src={customer?.imageUrl ? customer.imageUrl : "/images/default-profile.png"} alt={customer?.name} />
                <p>{customer.name}</p>
                <button onClick={handleViewDetails}>View Details</button>
            </div>
        </div>
    )
}