import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/actions";
import type { RootState } from "../redux/store";
import { logout } from "../api/accountAPI";


export default function Navbar() {
    const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
    const userRole = useSelector((state: RootState) => state.app.user.role);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            dispatch(setLogout());
            navigate('/');
        }
    };

    return (
        <nav className="navbar">
            <h2 className="logo">managR</h2>
            <div className="options">
                <Link to="/events">Events</Link>

                {userRole === 'CUSTOMER' ? (
                    <Link to="/profile">Profile</Link>
                ) : (
                    <Link to="/customers">Customers</Link>
                )}

                {userRole === 'ADMIN' ? (
                    <Link to="/employees">Employees</Link>
                ) : (
                    <></>
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