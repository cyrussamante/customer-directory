import type { Customer } from '../types/appState';
import { useParams } from 'react-router';
import "./CustomerDetails.css"
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { editCustomer, removeCustomer } from '../api/customersAPI';
import { deleteCustomer, updateCustomer } from '../redux/actions';

export default function CustomerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const customers = useSelector((state: RootState) => state.app.customers);
    const customer = customers.find((customer: Customer) => customer.id === id);
    const userRole = useSelector((state: RootState) => state.app.user.role);
    const dispatch = useDispatch();

    const handleDeleteClick = () => setDeleteModal(true);

    const handleCloseDeleteModal = () => setDeleteModal(false);

    const handleDeleteCustomer = async (e: any) => {
        e.preventDefault()
        if (customer) {
            console.log(customer)
            console.log(customer.id)
            const response = await removeCustomer(customer.id);
            if (response.status !== 204) {
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
        const response = await editCustomer(customer.id, updatedCustomer);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Failed to update customer');
        }
        dispatch(updateCustomer(updatedCustomer));
        setEditModal(false);
    }

    const handleCloseProfileClick = () => navigate('/customers');

    return (
        <div className="details">
            {customer ? (
                <>
                    <div className="detailsHead">
                        <h2>{customer.name}</h2>
                        <div className="detailsButtons">
                            <button className="edit" onClick={handleEditClick} >Edit Details </button>
                            {userRole === 'admin' && <button className="delete" onClick={handleDeleteClick} >Delete</button>}
                            {userRole === 'admin' && <button onClick={handleCloseProfileClick} >Close Profile</button>}
                        </div>
                    </div>
                    <div className="detailsBody">
                        <div className="imageContainer">
                            <img src={customer?.imageUrl} alt={customer.name} />
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
                <p>Customer not found.</p>
            )}
        </div>
    )
}