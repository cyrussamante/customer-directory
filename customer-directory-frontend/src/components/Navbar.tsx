import { Link } from "react-router-dom";

interface props {
    isLoggedIn: boolean
}

export default function Navbar({isLoggedIn}: props) {

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
                <Link to="/login">{!isLoggedIn ? "Login" : "Logout" }</Link>
            </div>
        </nav>
    );
}