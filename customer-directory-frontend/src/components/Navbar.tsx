import { Link } from "react-router-dom";

interface props {
    isLoggedIn: boolean
    onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: props) {

    return (
        <nav className="navbar">
            <h2>Client Atlas</h2>
            <div className="options">
                <Link to="/customers">Home</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/customers">Orders</Link>
                <Link to="/customers">Contact us</Link>
            </div>
            <div>
                {isLoggedIn ? (
                    <Link to="/customers" onClick={onLogout}>Logout</Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}