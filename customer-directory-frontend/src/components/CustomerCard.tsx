import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerCard.css";
import type { Customer } from '../types/appState';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface props {
    customer: Customer,
    isLoggedIn: boolean
}

export default function CustomerCard({ customer, isLoggedIn }: props): ReactElement {

    const navigate = useNavigate();

    const handleViewDetails = () => {
        if (isLoggedIn) {
            navigate(`/customers/${customer.id}`);
        }
    };

    return (
        <div className="card">
            <div className="icon">
                {!isLoggedIn && <VisibilityOffIcon />}
            </div>
            <div className="cardBody">
                <img src={customer?.imageUrl} alt={customer.name} />
                <p>{customer.name}</p>
                <button disabled={!isLoggedIn} onClick={handleViewDetails}>View Details</button>
            </div>
        </div>
    )
}