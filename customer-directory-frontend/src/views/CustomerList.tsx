import type Customer from '../types/customer';
import CustomerCard from '../components/CustomerCard';
import { useState } from "react";
import "./CustomerList.css";
import Modal from '../components/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import ListIcon from '@mui/icons-material/List';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

interface props {
    customers: Customer[];
    isLoggedIn: boolean;
    addCustomer: (customer: any) => Promise<void>,
}

export default function CustomerList({ customers, isLoggedIn, addCustomer }: props) {

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClick = () => {
        if (isLoggedIn) setShowAddModal(true);
    };

    const handleCloseModal = () => setShowAddModal(false);

    const handleAddCustomer = async (customer: any) => {
        await addCustomer(customer)
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
                <button disabled={!isLoggedIn} onClick={handleAddClick}>
                    Add Customer
                </button>
            </div>
            <div className="searchLabels">
                {!isLoggedIn && (
                    <div className="hint">
                        <WarningIcon />
                        <p>Login to add customers</p>
                    </div>
                )}
            </div>

            {filteredCustomers.length === 0 ? (
                <div className="noCustomers">
                    <SentimentDissatisfiedIcon />
                    <p>No customers found.</p>
                </div>
            ) : (
                <div className="grid">
                    {filteredCustomers.map((customer: Customer) => (
                        <CustomerCard key={customer.id} customer={customer} isLoggedIn={isLoggedIn} />
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