import {type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import type { User } from '../types/appState';

interface props {
    employee: User,
}

export default function EmployeeCard({ employee }: props): ReactElement {

    const navigate = useNavigate();

    const handleViewDetails = () => navigate(`/employees/${employee.id}`);

    return (
        <div className="card">
            <div className="cardBody">
                <img className="employeeImg" src="/images/default-profile.png" alt={employee?.name} />
                <p>{employee.name}</p>
                <button onClick={handleViewDetails}>View Details</button>
            </div>
        </div>
    )
}