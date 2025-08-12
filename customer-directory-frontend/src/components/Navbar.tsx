import { Link } from "react-router-dom";

interface props {
    isLoggedIn: boolean
    onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: props) {

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
                {isLoggedIn ? (
                    <div>
                        <Link to="/customers" onClick={onLogout}>Logout</Link>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}