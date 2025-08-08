import type Customer from '../types/customer';
import customers from '../mockData/customerData';
import CustomerCard from './Customer';

const customerList: Customer[] = customers


export default function CustomerList() {


    return (
        <>
            <h2>Customer List</h2>
            <div>
                {customerList.map((customer: Customer, index: number) => {
                    return (
                        <div key={index}>
                            <CustomerCard customer={customer} />
                        </div>
                    )
                }
                )}
            </div>
            <button >Add</button>
        </>
    )

}