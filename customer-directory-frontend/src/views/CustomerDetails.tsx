import type Customer from '../types/customer';
import { useParams } from 'react-router';
import "./CustomerDetails.css"

interface props {
    customers: Customer[]
}

export default function CustomerDetails({customers}: props) {
    const { id } = useParams();
    const isLoggedIn = true;
    const customer = customers.find((customer: Customer) => customer.id === id);

    return (
        <div className="details">
            {customer ? (
                <>
                    <div className="detailsHead">
                        <h2>{customer.name} Details</h2>
                        <div className="detailsButtons">
                            <button disabled={!isLoggedIn} className="button edit" >Edit Details </button>
                            <button disabled={!isLoggedIn} className="button delete" >Delete</button>
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
                </>
            ) : (
                <p>Customer not found.</p>
            )}
        </div>
    )
}
