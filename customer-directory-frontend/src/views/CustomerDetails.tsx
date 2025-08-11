import type Customer from '../types/customer';
import { useParams } from 'react-router';
import "./CustomerDetails.css"
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import EditCustomerModal from '../components/EditCustomerModal';

interface props {
    customers: Customer[]
}

export default function CustomerDetails({ customers }: props) {
    const { id } = useParams();
    const isLoggedIn = true;
    const navigate = useNavigate();
    const [showDeleteModal, setDeleteModal] = useState(false);

    let customer = customers.find((customer: Customer) => customer.id === id);
    
    const handleDeleteClick = () => {
        if (isLoggedIn) setDeleteModal(true);
    };
    const handleCloseDeleteModal = () => setDeleteModal(false);
    const handleDeleteCustomer = () => {

        //send delete request to backend
        setDeleteModal(false);
        navigate('/customers');
    }

    const [showEditModal, setEditModal] = useState(false);

    const handleEditClick = () => {
        if (isLoggedIn) setEditModal(true);
    };
    const handleCloseEditModal = () => setEditModal(false);

    const handleEditCustomer = (updatedCustomer: Customer) => {
        customer = updatedCustomer
        //send edit request to backend
        setEditModal(false);
    }

    return (
        <div className="details">
            {customer ? (
                <>
                    <div className="detailsHead">
                        <h2>{customer.name}</h2>
                        <div className="detailsButtons">
                            <button
                                disabled={!isLoggedIn}
                                className="button edit"
                                onClick={handleEditClick}
                            >Edit Details </button>
                            <button
                                disabled={!isLoggedIn}
                                className="button delete"
                                onClick={handleDeleteClick}
                            >Delete</button>
                        </div>
                    </div>
                    <div className="detailsBody">
                        <div className="detailsGrid">
                            <p>Age: </p><p>{customer.age}</p>
                            <p>Gender: </p><p>{customer.gender}</p>
                            <p>Email: </p><p>{customer.email}</p>
                            <p>Address: </p><p>{customer.address}</p>
                            <p>Number of Orders: </p><p>{customer.numberOfOrders}</p>
                        </div>
                    </div>

                    {showEditModal && (<EditCustomerModal
                        customer = {customer}
                        onClose= {handleCloseEditModal}
                        onSave= {handleEditCustomer} />)}

                    {showDeleteModal && (<DeleteConfirmationModal
                        onClose= {handleCloseDeleteModal}
                        onConfirm= {handleDeleteCustomer} />)}
                </>

            ) : (
                <p>Customer not found.</p>
            )}
        </div>
    )
}
