import type { Customer } from '../types/appState';
import { useParams } from 'react-router';
import "./CustomerDetails.css"
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { editCustomer, removeCustomer } from '../api/customersAPI';
import { deleteCustomer, updateCustomer, setUser } from '../redux/actions';
import RegisteredEvents from './RegisteredEvents';

export default function CustomerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const customers = useSelector((state: RootState) => state.app.customers);
    const customer = customers.find((customer: Customer) => customer.id === id);
    const user = useSelector((state: RootState) => state.app.user);
    const token = useSelector((state: RootState) => state.app.token);
    const dispatch = useDispatch();

    if (!user) {
        return <div>No customer data available.</div>;
    }

    const handleDeleteClick = () => setDeleteModal(true);

    const handleCloseDeleteModal = () => setDeleteModal(false);

    const handleDeleteCustomer = async (e: any) => {
        e.preventDefault()
        if (customer) {
            console.log(customer)
            console.log(customer.id)
            const response = await removeCustomer(customer.id, token);
            if (response.status !== 200) {
                throw new Error('Failed to delete customer');
            }
            dispatch(deleteCustomer(customer.id));
            setDeleteModal(false);
            navigate('/customers');
        }
    }

    const handleEditClick = () => setEditModal(true);

    const handleCloseEditModal = () => setEditModal(false);

    const handleEditCustomer = async (updatedCustomer: Customer) => {
        const response = await editCustomer(updatedCustomer.id, updatedCustomer, token);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Failed to update customer');
        }
        if (user.role === "ADMIN") {
            dispatch(updateCustomer(updatedCustomer));
        }
        else {
            dispatch(setUser(updatedCustomer))
        }
        setEditModal(false);
    }

    const handleCloseProfileClick = () => navigate('/customers');

    console.log(customer.imageUrl)

    return (
        <div className="detailsPage">
            <div className="customerDetails">
                {customer && user.role !== "CUSTOMER" ? (
                    <>
                        <div className="detailsHead">
                            <h2>{customer.name}</h2>
                            <div className="detailsButtons">
                                <button className="edit" onClick={handleEditClick} >Edit Details </button>
                                {user.role === 'ADMIN' && <button className="delete" onClick={handleDeleteClick} >Delete</button>}
                                {user.role === 'ADMIN' && <button onClick={handleCloseProfileClick} >Close Profile</button>}
                            </div>
                        </div>
                        <div className="detailsBody">
                            <div className="imageContainer">
                                <img className="customerImg" src={customer?.imageUrl ? customer.imageUrl : "/images/default-profile.png"} alt={customer?.name} />

                            </div>
                            <div className="detailsGrid">
                                <p className="classifier">Age </p> <p>{customer.age}</p>
                                <p className="classifier">Gender </p> <p>{customer.gender}</p>
                                <p className="classifier">Email </p> <p>{customer.email}</p>
                                <p className="classifier">Address </p> <p>{customer.address}</p>
                                <p className="classifier">Number of Orders </p> <p>{customer.numberOfOrders}</p>
                            </div>
                        </div>

                        {showEditModal && (<Modal
                            mode={'edit'}
                            customer={customer}
                            onClose={handleCloseEditModal}
                            onSave={handleEditCustomer} />)}

                        {showDeleteModal && (<DeleteConfirmationModal
                            onClose={handleCloseDeleteModal}
                            onConfirm={handleDeleteCustomer} />)}
                    </>
                ) : (
                    <>
                        <div className="detailsHead">
                            <h2>{user.name}</h2>
                            <div className="detailsButtons">
                                <button className="edit" onClick={handleEditClick} >Edit Details </button>
                            </div>
                        </div>
                        <div className="detailsBody">
                            <div className="imageContainer">
                                <img src={customer.imageUrl} alt={customer?.name} />
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
                            onSave={handleEditCustomer} />)}
                    </>
                )}
            </div>
            <RegisteredEvents />
        </div>

    )
}