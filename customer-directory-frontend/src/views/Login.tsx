import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"
import { login } from '../api/customersAPI';

interface props {
  handleLogin: () => void
}

export default function Login({ handleLogin }: props) {

  const initialFormData = { email: '', password: '' }
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await login({ email: formData.email, password: formData.password });
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Invalid credentials. Please try again");
      }
      const data = response.data;
      localStorage.setItem('authToken', data);
      handleLogin()
      navigate('/customers');
    } catch (error) {
      alert('Login failed! Try again.');
    }
  }

    return (
      <div className="login">
        <div className="loginCard">
          <h2>Login</h2>
          <form className="form">
            <label className="label"> Email Address</label>
            <input className="formInput"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label className="label"> Password </label>
            <input className="formInput"
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Log In</button>
          </form>
          <Link to="/customers">Browse customers without logging in</Link>
        </div>
      </div>
    );
  };