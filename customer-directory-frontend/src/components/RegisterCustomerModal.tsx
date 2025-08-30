import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store'
import type { Customer, Registration } from '../types/appState';
import CloseIcon from '@mui/icons-material/Close';
import './RegisterCustomerModal.css';

interface Props {
    eventId: string;
    onClose: () => void;
    onSave: (customerIds: string[]) => void;
}

export function RegisterCustomerModal({ eventId, onClose, onSave }: Props) {
    const [customerIds, setCustomerIds] = useState<string[]>([]);
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const state = useSelector((state: RootState) => state.app);
    const customers = state.customers;
    const registrations = state.registrations;
    const registeredCustomers = registrations
        .filter((registration: Registration) => registration.eventId === eventId)
        .map((registration: Registration) => registration.customerId);
    const availableCustomers = customers.filter((customer: Customer) => !registeredCustomers.includes(customer.id));
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCustomers = availableCustomers.filter((customer: Customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !customerIds.includes(customer.id)
    );

    const selectedCustomers = customers.filter((customer: Customer) =>
        customerIds.includes(customer.id)
    );

    const handleCustomerSelect = (customerId: string) => {
        setCustomerIds([...customerIds, customerId]);
    };

    const handleCustomerRemove = (customerId: string) => {
        setCustomerIds(customerIds.filter(id => id !== customerId));
    };

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSave(customerIds);
        dialogRef.current?.close();
    };

    const handleClose = () => {
        dialogRef.current?.close();
        onClose();
    };

    return (
        <dialog className="modal" ref={dialogRef} onClose={onClose}>
            <div className="modalForm">
                <h2 className="modalHeading">Register Customers</h2>
                <div className="searchBar">
                    <input type="text"
                        placeholder="Search customers"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="selectedCustomers">
                    {selectedCustomers.map((customer: Customer) => (
                        <div key={customer.id} className="selectedCustomerCard">
                            <span>{customer.name}</span>
                            <CloseIcon className="removeIcon" onClick={() => handleCustomerRemove(customer.id)} />
                        </div>
                    ))}
                </div>

                <div className="customersList">
                    {filteredCustomers.map((customer: Customer) => (
                        <div key={customer.id} className="customerCard" onClick={() => handleCustomerSelect(customer.id)}>
                            <img className="customerImage" src={customer.imageUrl || "/images/default-profile.png"} alt={customer.name} />
                            <div className="customerInfo">
                                <span className="customerName">{customer.name}</span>
                                <span className="customerEmail">{customer.email}</span>
                            </div>
                        </div>
                    ))}
                    <div className="noResults">
                        {filteredCustomers.length === 0 && <span>No customers found</span>}
                    </div>
                </div>

                <div className="modalButtons">
                    <button className="cancel" onClick={handleClose}>Cancel</button>
                    <button className="save" onClick={handleSubmit} disabled={customerIds.length === 0}>Register Selected Customers</button>
                </div>

            </div>
        </dialog>
    );
}