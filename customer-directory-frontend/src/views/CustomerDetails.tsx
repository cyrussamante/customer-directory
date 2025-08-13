import type Customer from '../types/customer';
import { useParams } from 'react-router';
import "./CustomerDetails.css"
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import EditCustomerModal from '../components/EditCustomerModal';
// import Modal from '../components/Modal';

interface props {
    customers: Customer[],
    updateCustomer: (customer: Customer) => Promise<void>,
    deleteCustomer: (customer: Customer) => Promise<void>,
    isLoggedIn: boolean
}

export default function CustomerDetails({ customers, updateCustomer, deleteCustomer, isLoggedIn }: props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const customer = customers.find((customer: Customer) => customer.id === id);

    const handleDeleteClick = () => {
        if (isLoggedIn) setDeleteModal(true);
    };
    const handleCloseDeleteModal = () => setDeleteModal(false);

    const handleDeleteCustomer = async (e: any) => {
        e.preventDefault()
        if (customer) {
            await deleteCustomer(customer);
            setDeleteModal(false);
            navigate('/customers');
        }
    }

    const handleEditClick = () => {
        if (isLoggedIn) setEditModal(true);
    };

    const handleCloseEditModal = () => setEditModal(false);

    const handleCloseClick = () => navigate('/customers');

    const handleEditCustomer = async (updatedCustomer: Customer) => {
        await updateCustomer(updatedCustomer)
        setEditModal(false);
    }

    return (
        <div className="details">
            {customer ? (
                <>
                    <div className="detailsHead">
                        <h2>{customer.name}</h2>
                        <div className="detailsButtons">
                            <button disabled={!isLoggedIn} className="edit" onClick={handleEditClick} >Edit Details </button>
                            <button disabled={!isLoggedIn} className="delete" onClick={handleDeleteClick} >Delete</button>
                            <button onClick={handleCloseClick} >Close Profile</button>
                        </div>
                    </div>
                    <div className="detailsBody">
                        <div className="imageContainer">
                            <img src={customer?.imageUrl} alt={customer.name} />
                        </div>
                        <div className="detailsGrid">
                            <p>Age: </p> <p>{customer.age}</p>
                            <p>Gender: </p> <p>{customer.gender}</p>
                            <p>Email: </p> <p>{customer.email}</p>
                            <p>Address: </p> <p>{customer.address}</p>
                            <p>Number of Orders: </p> <p>{customer.numberOfOrders}</p>
                        </div>
                    </div>

                    {showEditModal && (<EditCustomerModal
                        customer={customer}
                        onClose={handleCloseEditModal}
                        onSave={handleEditCustomer} />)}

                    {/* {showEditModal && (<Modal
                        mode={'edit'}
                        customer={customer}
                        onClose={handleCloseEditModal}
                        onSave={handleEditCustomer} />)} */}

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