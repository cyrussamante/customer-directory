import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/actions";
import type { RootState } from "../redux/store";
import { persistor } from '../redux/store';


export default function Navbar() {
    const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
    const userRole = useSelector((state: RootState) => state.app.user.role);
    const id = useSelector((state: RootState) => state.app.user.id);

    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        persistor.purge();
        dispatch(setLogout());
    };

    return (
        <nav className="navbar">
            <h2>Client Atlas</h2>
            <div className="options">
                <Link to="/events">Events</Link>
                {userRole === 'CUSTOMER' ? (
                    <Link to={`/customers/${id}`}>Profile</Link>
                ) : (
                    <Link to="/customers">Customers</Link>
                )}
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