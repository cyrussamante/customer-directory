import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"

interface props {
  handleLogin: (email: string, password: string) => void
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleLogin(formData.email, formData.password)
    navigate('/customers')
  };

  return (
    <div className="login">
      <div className="loginCard">
        <h2 className="heading">Login</h2>

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
          <button className="button" onClick={handleSubmit}>Log In</button>
        </form>

        <Link to="/customers">Browse customers without logging in</Link>
      </div>
    </div>
  );
};