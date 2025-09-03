import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";
import { getUserInfo, login, register } from '../api/accountAPI';
import { setLogin } from '../redux/actions';
import { useDispatch } from 'react-redux'
import type { User } from '../types/appState';
import configureHomePage from '../helpers/function';

export default function Register() {

    const initialFormData: User = {
        id: '',
        name: '',
        email: '',
        password: '',
        role: 'CUSTOMER',
        token: ''
    }
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
        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role: formData.role
        };
        const isAnyFieldEmpty = Object.values(payload).some(value => value === '');
        if (isAnyFieldEmpty) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const response = await register(payload);
            if (response.status === 201) {
                const loginResp = await login({email: formData.email, password: formData.password})
                const token = loginResp.data.access_token
                const userInfo = await getUserInfo(token);
                const user = userInfo.data 
                localStorage.setItem('token', token);
                dispatch(setLogin(user, token));
                configureHomePage(user, dispatch, navigate, token);
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again.');
        }
    }

    return (
        <div className="login">
            <div className="loginCard">
                <h2>Register</h2>
                <form className="form">
                    <label className="label"> Name</label>
                    <input className="formInput"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
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
                    <label className="label"> Role </label>
                    <select className="formInput"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <button onClick={handleSubmit}>Register</button>
                </form>
                <Link to="/register">Donot have an account? Sign Up!</Link>
            </div>
        </div>
    );
};