import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerList from './views/CustomerList';
import CustomerDetails from './views/CustomerDetails';
import Login from './views/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./App.css"
import { useEffect } from "react";
import type { Customer } from './types/appState';
import { getCustomers } from './api/customersAPI';
import { useDispatch } from 'react-redux';
import { setCustomers, setLogin } from './redux/actions';
import EventsList from './views/EventsList';
//import ChatBot from './components/ChatBot';

function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCustomers();
      dispatch(setCustomers(response.data));
  
      const token = localStorage.getItem('authToken');
      if (token) {
        // fix this: how do based on the token i get which user info from bsckend and setlogin
        //  const userInfo = await getUserInfo(token); 
        // dispatch(setLogin(userInfo.data)); 
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;