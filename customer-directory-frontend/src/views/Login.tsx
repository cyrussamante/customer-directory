import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"
import { getUserInfo, login } from '../api/accountAPI';
import { setLogin } from '../redux/actions';
import { useDispatch } from 'react-redux'
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
      const token = response.data.access_token
      const userInfo = await getUserInfo(token);
      const user = userInfo.data 
      localStorage.setItem('token', token);
      dispatch(setLogin(user, token))
      configureHomePage(user, dispatch, navigate, token);
             
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