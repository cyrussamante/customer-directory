import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/actions";
import type { RootState } from "../redux/store";

export default function Navbar() {
    const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
    const userRole = useSelector((state: RootState) => state.app.user.role);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch(setLogout());
      };

    return (
        <nav className="navbar">
            <h2>Client Atlas</h2>
            <div className="options">
                <Link to="/customers">Home</Link>
                {userRole === 'customer' ? (
                    <Link to="/customerProfile">Profile</Link>
                ) : (
                    <Link to="/customers">Customers</Link>
                )}
                <Link to="/events">Events</Link>
                <Link to="/customers">Contact</Link>
            </div>
            <div>
                {isLoggedIn ? (
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                ) : (
                    <Link to="/">Login</Link>
                )}
            </div>
        </nav>
    );
}