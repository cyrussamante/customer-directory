import type { Customer } from '../types/appState';
import CustomerCard from '../components/CustomerCard';
import { useState } from "react";
import "./CustomerList.css";
import Modal from '../components/Modal';
import ListIcon from '@mui/icons-material/List';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { createCustomer } from '../api/customersAPI';
import { addCustomer } from '../redux/actions';

export default function CustomerList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const token = useSelector((state: RootState) => state.app.token);
    const customers: Customer[] = useSelector((state: RootState) => state.app.customers);
    const dispatch = useDispatch();


    const user = useSelector((state: RootState) => state.app.user);
    const userRole = user?.role;

    if (!user) {
        return <div>No event data available.</div>;
    }

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClick = () => setShowAddModal(true);

    const handleCloseModal = () => setShowAddModal(false);

    const handleAddCustomer = async (customer: any) => {
        const response = await createCustomer(customer, token)
        dispatch(addCustomer(response.data))
        setShowAddModal(false)
    }

    return (
        <div className="customers">
            <div className="customersHeader">
                <ListIcon />
                <h2>Customer List</h2>
            </div>
            <div className="search">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search customers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {userRole === 'ADMIN' && (
                    <button onClick={handleAddClick}>
                        Add Customer
                    </button>
                )}
            </div>

            {filteredCustomers.length === 0 ? (
                <div className="noCustomers">
                    <SentimentDissatisfiedIcon />
                    <p>No customers found.</p>
                </div>
            ) : (
                <div className="customerGrid">
                    {filteredCustomers.map((customer: Customer) => (
                        <CustomerCard key={customer.id} customer={customer} />
                    ))}
                </div>
            )}

            {showAddModal && (<Modal
                mode={'add'}
                onClose={handleCloseModal}
                onSave={handleAddCustomer} />)}
        </ div>
    )
}