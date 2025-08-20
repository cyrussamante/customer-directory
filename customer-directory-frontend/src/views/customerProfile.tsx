import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function CustomerProfile() {

    const customers = useSelector((state: RootState) => state.app.customers);

    return (
        <div className="customer-profile">
            <h1>Customer Profile</h1>
            <p>This is the customer profile page.</p>


        </div>
    );
}