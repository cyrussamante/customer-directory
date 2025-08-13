import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CustomerList from './views/CustomerList';
import CustomerDetails from './views/CustomerDetails';
import Login from './views/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./App.css"
import { useEffect, useState } from "react";
import type Customer from './types/customer';
import { getCustomers, createCustomer, editCustomer, removeCustomer, login } from './api/customersAPI';

function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoggedIn, setLogIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers().then(res => setCustomers(res.data));
    const token = localStorage.getItem('authToken');
    setLogIn(!!token);
  }, []);

  const handleLogin = async function (e: string, p: string) {
    const response = await login({ email: e, password: p });
    const data = response.data;
    if (data) {
      localStorage.setItem('authToken', data);
      setLogIn(true);
      navigate('/customers');
    } else {
      throw new Error(data.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setLogIn(false);
    navigate('/customers');
  };

  const addCustomer = async function (customer: any): Promise<void> {
    await createCustomer(customer);
    getCustomers().then(res => setCustomers(res.data));
  }

  const updateCustomer = async function (customer: Customer): Promise<void> {
    const id = customer.id;
    const response = await editCustomer(id, customer);
    // Axios resolves only for 2xx; there's no response.ok
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Failed to update customer');
    }
    // (optional but helpful) reflect the change in local state
    setCustomers(prev => prev.map(c => (c.id === id ? { ...c, ...customer } : c)));
  };

  const deleteCustomer = async function (customer: Customer): Promise<void> {
    const id = customer.id;
    const response = await removeCustomer(id);
    if (response.status !== 204) {
      throw new Error('Failed to delete customer');
    }
    // (optional) update UI immediately
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
      </main>
      <Footer />
    </>
  )
}

export default App;