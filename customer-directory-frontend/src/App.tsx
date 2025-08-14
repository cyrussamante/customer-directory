import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerList from './views/CustomerList';
import CustomerDetails from './views/CustomerDetails';
import Login from './views/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./App.css"
import { useEffect, useState } from "react";
import type Customer from './types/customer';
import { getCustomers, createCustomer, editCustomer, removeCustomer } from './api/customersAPI';
import ChatBot from './components/ChatBot';

function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoggedIn, setLogIn] = useState(false);

  useEffect(() => {
    getCustomers().then(res => setCustomers(res.data));
    const token = localStorage.getItem('authToken');
    setLogIn(!!token);
  }, []);

  const handleLogin = () => setLogIn(true);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setLogIn(false);
  };

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

  return (
    <>
      <header>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="customers" element={<CustomerList
            customers={customers}
            isLoggedIn={isLoggedIn}
            addCustomer={addCustomer} />} />
          <Route path="/customers/:id" element={<CustomerDetails
            customers={customers}
            updateCustomer={updateCustomer}
            deleteCustomer={deleteCustomer}
            isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      <ChatBot/>
      </main>
      <Footer />
    </>
  )
}

export default App;