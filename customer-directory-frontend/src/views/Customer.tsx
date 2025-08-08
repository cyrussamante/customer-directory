import type { ReactElement } from "react";

export default function CustomerCard(props: any): ReactElement {

    const customer = props.customer;

    return (
        <>
            <div>
                <img></img>
                <h4>{customer.name}</h4>
                <button>View Details</button>
            </div>
        </>

    )
}