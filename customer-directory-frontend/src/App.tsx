import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerList from './views/CustomerList';
import CustomerDetails from './views/CustomerDetails';
import Login from './views/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./App.css"
import { useEffect, useState } from "react";
import type Customer from './types/customer';

function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => { getCustomers() }, []);

  const getCustomers = async function () {
    await fetch('/api/customers')
      .then(response => response.json())
      .then(data => { setCustomers(data) })
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="customers" element={<CustomerList customers={customers}/>} />
          <Route path="/customers/:id" element={<CustomerDetails customers={customers} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;
