import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"
import { login } from '../api/accountAPI';
import { setLogin } from '../redux/actions';
import { useDispatch } from 'react-redux'
import type { User } from '../types/appState';
import configureHomePage from '../helpers/function';
export default function Login() {

  const initialFormData = { email: '', password: '' }
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await login(formData);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Invalid credentials. Please try again");
      }
      const data = response.data;

      //ideally in data we will get the whole user object
      // rn only getting token
      localStorage.setItem('authToken', data);

      //mock data for test only
      const user: User = {
        id: '123',
        name: 'inreet',
        email: formData.email,
        password: formData.password,
        role: "customer",
        //to test employee view
        //role: 'employee',
        // to test customer view
        //role: 'customer',
        token: data
      }
      dispatch(setLogin(user))
      configureHomePage(user, dispatch, navigate);
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
        <Link to="/register">Donot have an account? Sign Up!</Link>
      </div>
    </div>
  );
};