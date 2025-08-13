import type Customer from '../types/customer';
import CustomerCard from '../components/CustomerCard';
import { useState } from "react";
import "./CustomerList.css";
import Modal from '../components/Modal';

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
            <h2>Customer List</h2>
            <div className="search">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button disabled={!isLoggedIn} onClick={handleAddClick}>
                    Add Customer
                </button>
            </div>
            <div className="searchLabels">
                <p></p>
                {/* <p>Search customers by name</p> */}
                {!isLoggedIn ? (<p>Login to add customers</p>) : <></>}
            </div>

            {filteredCustomers.length === 0 ? (
                <p>No customers found.</p>
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