import type { Customer } from '../types/appState';
import "./CustomerDetails.css";
import { useState } from "react";
import Modal from '../components/CustomerModal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { editCustomer } from '../api/customersAPI';
import { setUser } from '../redux/actions';
import RegisteredEvents from './RegisteredEvents';
import { VITE_API_URL } from '../helpers/api';


export default function CustomerProfile() {
    const [showEditModal, setEditModal] = useState(false);
    const state = useSelector((state: RootState) => state.app);
    const user = state.user;
    const dispatch = useDispatch();

    if (!user) {
        return <div>No user data available.</div>;
    }

    const handleEditClick = () => setEditModal(true);

    const handleCloseEditModal = () => setEditModal(false);

    const handleEditUser = async (updatedCustomer: Customer) => {
        const response = await editCustomer(updatedCustomer.id, updatedCustomer);
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
                        <img src={user?.imageUrl ? `${VITE_API_URL}${user.imageUrl}` : `${VITE_API_URL}/images/default-profile.png`} alt={user?.name} />
                    </div>
                    <div className="customerDetailsGrid">
                        <p className="classifier">Date of Birth </p> <p>{user.dateOfBirth ? user.dateOfBirth : 'Not specified'}</p>
                        <p className="classifier">Gender </p> <p>{user.gender !== "NOT_SPECIFIED" ? user.gender : 'Not specified'}</p>
                        <p className="classifier">Email </p> <p>{user.email}</p>
                        <p className="classifier">Password </p> <p>********</p>
                        <p className="classifier">Address </p> <p>{user.address ? user.address : 'Not specified'}</p>
                        <p className="classifier">Number of Orders </p> <p>{user.numberOfOrders ? user.numberOfOrders : 'Not specified'}</p>
                    </div>
                </div>

                {showEditModal && (<Modal
                    mode={'edit'}
                    customer={user}
                    onClose={handleCloseEditModal}
                    onSave={handleEditUser} />)}

            </div>
            <RegisteredEvents />
        </div>
    )
}