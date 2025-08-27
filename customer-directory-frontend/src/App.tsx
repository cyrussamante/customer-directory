import { Routes, Route, useNavigate } from 'react-router-dom';
import CustomerList from './views/CustomerList';
import CustomerDetails from './views/CustomerDetails';
import Login from './views/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./App.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import EventsList from './views/EventsList';
import EventDetails from './views/EventDetails';
import Register from './views/Register';
import type { RootState } from './redux/store';
import configureHomePage from './helpers/function';
import { setLogin } from './redux/actions';
import { login, getUserInfo } from './api/accountAPI';
import { useLocation } from 'react-router-dom';

//import ChatBot from './components/ChatBot';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData(token);
    }
  }, [location.pathname]);

  async function fetchData(token: string) {
    try {
      const userInfo = await getUserInfo(token);
      const user = userInfo.data;
      dispatch(setLogin(user, token));
      if (location.pathname === '/' || location.pathname === '/login') {
        configureHomePage(user, dispatch, navigate, token);
      }
    } catch {
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    }
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
          <Route path="customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </main>
      {isLoggedIn && <Footer />}
    </>
  )
}

export default App;