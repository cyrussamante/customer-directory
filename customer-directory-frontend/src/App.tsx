import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerList from './views/CustomerList';
import CustomerDetails from './views/CustomerDetails';
import Login from './views/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./App.css"
import { useEffect, useState } from "react";
import type { Customer, Event } from './types/appState';
import { getCustomers, createCustomer, editCustomer, removeCustomer } from './api/customersAPI';
import { getEvents, createEvent, editEvent, removeEvent } from './api/eventsAPI';
import { useDispatch } from 'react-redux';
import { setLogin } from './redux/actions';
import EventsList from './views/EventsList';
//import ChatBot from './components/ChatBot';

function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getCustomers().then(res => setCustomers(res.data));
    const token = localStorage.getItem('authToken');
    getEvents().then(res => setEvents(res.data));

    //fix this: how do based on the token i get which user info from bsckend and setlogin
    // if (token) {
    //   dispatch(setLogin({ user}));
    // }
  }, []);

  const addCustomer = async function (customer: any): Promise<void> {
    await createCustomer(customer);
    getCustomers().then(res => setCustomers(res.data));
  }

  const updateCustomer = async function (customer: Customer): Promise<void> {
    const id = customer.id;
    const response = await editCustomer(id, customer);
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Failed to update customer');
    }
    setCustomers(prev => prev.map(c => (c.id === id ? { ...c, ...customer } : c)));
  };

  const deleteCustomer = async function (customer: Customer): Promise<void> {
    const id = customer.id;
    const response = await removeCustomer(id);
    if (response.status !== 204) {
      throw new Error('Failed to delete customer');
    }
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const addEvent = async function (event: any): Promise<void> {
    await createEvent(event);
    getEvents().then(res => setEvents(res.data));
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="customers" element={<CustomerList
            customers={customers}
            addCustomer={addCustomer} />} />
          <Route path="/customers/:id" element={<CustomerDetails
            customers={customers}
            updateCustomer={updateCustomer}
            deleteCustomer={deleteCustomer}
          />} />
          <Route path="events" element={<EventsList
            events={events}
            addEvent={addEvent} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* remove chatbot */}
        {/* {isLoggedIn && <ChatBot/>} */}
      </main>
      <Footer />
    </>
  )
}

export default App;