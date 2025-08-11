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
  const [isLoggedIn, setLogIn ] = useState(false);
  const handleLogin = () => setLogIn(true);

  useEffect(() => { getCustomers() }, []);

  const getCustomers = async function () {
    await fetch('/api/customers')
      .then(response => response.json())
      .then(data => { setCustomers(data) })
      .catch((error) => {console.error(error)});
  };

  const updateCustomer = async function (customer: Customer): Promise<void> {
    const id = customer.id
    await fetch(`/api/customers/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer),
    })
    .then((response) => response.json())
    .then((data) => {console.log(data);})
    .catch((error) => {console.error(error)});
  };

  const deleteCustomer = async function (customer: Customer): Promise<void> {
    const id = customer.id
    await fetch(`/api/customers/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id),
    })
    .then((response) => response.json())
    .then((data) => {console.log(data);})
    .catch((error) => {console.error(error)});
  };

  return (
    <>
      <header>
        <Navbar isLoggedIn={isLoggedIn} />
      </header>
      <main>
        <Routes>
        <Route path="/" element={<Navigate to="/customers" replace />} />
        <Route path="customers" element={<CustomerList customers={customers} isLoggedIn={isLoggedIn}/>} /> 
        <Route path="/customers/:id" element={<CustomerDetails
            customers={customers}
            updateCustomer={updateCustomer}
            deleteCustomer={deleteCustomer}
            isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;
