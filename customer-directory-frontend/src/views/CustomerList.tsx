import type Customer from '../types/customer';
import CustomerCard from '../components/CustomerCard';
import { useState } from "react";
import "./CustomerList.css";
import AddCustomerModal from '../components/AddCustomerModal';

interface props {
    customers: Customer[];
    isLoggedIn: boolean;
    addCustomer: (customer: any) => Promise<void>,
}

export default function CustomerList({customers, isLoggedIn, addCustomer}: props) {

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
            <h2 className="heading">Customer List</h2>
            <p className="heading">Please login to view details and add a new customers.</p>

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
                        <CustomerCard key={customer.id} customer={customer} isLoggedIn={isLoggedIn}/>
                    ))}
                </div>
            )}

            {showAddModal && (<AddCustomerModal onClose={handleCloseModal} onSave={handleAddCustomer} />)}
        </ div>
    )
}