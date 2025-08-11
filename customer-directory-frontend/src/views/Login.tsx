import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"

export default function Login() {
  
  const initialFormData = { email: '', password: '' }
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    //aunticate user
    //change is logged in state
    navigate('/customers')
  };

  return (
    <div className="login">
      <div className="loginCard">
        <h2 className="heading">Login</h2>

        <form className="form" onSubmit={handleSubmit}>
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
          <button className="button" type="submit">Log In</button>
        </form>

        <Link to="/customers">Browse customers without logging in</Link>
      </div>
    </div>
  );
};