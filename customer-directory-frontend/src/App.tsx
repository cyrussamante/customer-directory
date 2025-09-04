import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import CustomerList from './views/CustomerList';
import CustomerDetails from './views/CustomerDetails';
import Login from './views/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./App.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import EventsList from './views/EventsList';
import EventDetails from './views/EventDetails';
import Register from './views/Register';
import type { RootState } from './redux/store';
import configureHomePage from './helpers/function';
import { setLogin } from './redux/actions';
import { getUserInfo } from './api/accountAPI';
import CustomerProfile from './views/CustomerProfile';
import EmployeeDetails from './views/EmployeeDetails';
import EmployeeList from './views/EmployeeList';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getUserInfo().then(async (response) => {
      const user = response.data;
      if (user) {
        dispatch(setLogin(user));
        await configureHomePage(user, dispatch);
        if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
          navigate("/events", { replace: true });
        }
        setIsLoading(false);
      }
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="loading">Loading...</div>
    );
  }

  return (
    <>
      <header>
        {isLoggedIn && <Navbar />}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isLoggedIn ? (
            <>
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/:id" element={<CustomerDetails />} />
              <Route path="/events" element={<EventsList />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/profile" element={<CustomerProfile />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </main>
      {isLoggedIn && <Footer />}
    </>
  )
}

export default App;