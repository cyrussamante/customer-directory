import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerCard.css";
import type Customer from "../types/customer";

export default function CustomerCard(props: any): ReactElement {

    const customer: Customer = props.customer;
    const navigate = useNavigate();
    const isLoggedIn = true;

    const handleViewDetails = () => {
        if (isLoggedIn) {
            navigate(`/customers/${customer.id}`);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="card">
            {/* fix image */}
            <img src={customer?.imageUrl} alt={customer.name} /> 
            <p>{customer.name}</p>
            <button className="button" onClick={handleViewDetails}>View Details</button>
        </div>
    )
}