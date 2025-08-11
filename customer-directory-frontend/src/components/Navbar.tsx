import { Link } from "react-router-dom";

export default function Navbar() {

    const isLoggedIn = true; //need to change

    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Customer Directory</h2>
            </div>
            <div>
                <Link to="/customers">Home</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/customers">Orders</Link>
                <Link to="/customers">Contact us</Link>
            </div>
            <div>
                {/* if the user is logged in this will logout */}
                <Link to="/login">{!isLoggedIn ? "Login" : "Logout" }</Link>
            </div>
        </nav>
    );
}