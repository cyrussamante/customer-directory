import type { Customer } from '../types/appState';
import "./CustomerDetails.css";
import { useState } from "react";
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { editCustomer } from '../api/customersAPI';
import { setUser } from '../redux/actions';
import RegisteredEvents from './RegisteredEvents';

export default function CustomerProfile() {
    const [showEditModal, setEditModal] = useState(false);
    const state = useSelector((state: RootState) => state.app);
    const user = state.user;
    const token = state.token;
    const dispatch = useDispatch();

    if (!user) {
        return <div>No user data available.</div>;
    }

    const handleEditClick = () => setEditModal(true);

    const handleCloseEditModal = () => setEditModal(false);

    const handleEditUser = async (updatedCustomer: Customer) => {
        const response = await editCustomer(updatedCustomer.id, updatedCustomer, token);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Failed to update customer');
        }
        dispatch(setUser(updatedCustomer))
        setEditModal(false);
    }

    return (
        <div className="detailsPage">
            <div className="customerDetails">
                <div className="detailsHead">
                    <h2>{user.name}</h2>
                    <div className="detailsButtons">
                        <button className="edit" onClick={handleEditClick} >Edit Details </button>
                    </div>
                </div>
                <div className="detailsBody">
                    <div className="imageContainer">
                        <img src={user?.imageUrl} alt={user.name} />
                    </div>
                    <div className="detailsGrid">
                        <p className="classifier">Age </p> <p>{user.age}</p>
                        <p className="classifier">Gender </p> <p>{user.gender}</p>
                        <p className="classifier">Email </p> <p>{user.email}</p>
                        <p className="classifier">Address </p> <p>{user.address}</p>
                        <p className="classifier">Number of Orders </p> <p>{user.numberOfOrders}</p>
                    </div>
                </div>

                {showEditModal && (<Modal
                    mode={'edit'}
                    customer={user}
                    onClose={handleCloseEditModal}
                    onSave={handleEditUser} />)}

            </div>
            <RegisteredEvents/>
        </div>
    )
}