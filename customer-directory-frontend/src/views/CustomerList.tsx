import type Customer from '../types/customer';
import CustomerCard from '../components/CustomerCard';
import { useState } from "react";
import "./CustomerList.css";
import AddCustomerModal from '../components/AddCustomerModal';

interface props {
    customers: Customer[];
}

export default function CustomerList({customers}: props) {

    const [searchTerm, setSearchTerm] = useState("");
    const isLoggedIn = true; //need to change
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClick = () => {
        if (isLoggedIn) setShowAddModal(true);
    };

    const handleCloseModal = () => setShowAddModal(false);

    return (
        <div className="customers">
            <h2 className="heading">Customer List</h2>

            <div className="search">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search customers by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button disabled={!isLoggedIn} className="addButton" onClick={handleAddClick}>
                    Add Customer
                </button>
            </div>

            {filteredCustomers.length === 0 ? (
                <p className="heading">No customers found.</p>
            ) : (
                <div className="grid">
                    {filteredCustomers.map((customer: Customer) => (
                        <CustomerCard key={customer.id} customer={customer} />
                    ))}
                </div>
            )}

            {showAddModal && (<AddCustomerModal onClose={handleCloseModal} />)}
        </ div>
    )
}