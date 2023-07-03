import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, loginSuccess, loginFailed } from '../features/authSlice';
import axios from 'axios';
import * as yup from 'yup';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { LOGIN_URL } from '../util/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await schema.validate({ email, password });

      setError('');
      setServerError('');
      dispatch(login());

      setIsLoading(true);

      try {
        const response = await axios.post(LOGIN_URL, {
          email,
          password,
        });
        dispatch(loginSuccess(response.data));
        navigate('/tasks');
      } catch (error) {
        console.error(error);
        dispatch(loginFailed(error.message));
        setServerError('Error en el servidor');
      } finally {
        setIsLoading(false);
      }

    } catch (validationError) {
      setError(validationError.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-title">Gestión Tareas Web App</h3>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-control"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-control"
              disabled={isLoading}
            />
          </div>
          <div className="form-group btn-container">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>Login</button>
            <Link to="/register" className="btn btn-link custom-register">Crear una cuenta</Link>
          </div>
          {isLoading && <div className="loading-message">Cargando...</div>}
          {error && <div className="error-message">{error}</div>}
          {serverError && <div className="error-message">{serverError}</div>}
        </form>
      </div>
      {isLoading && 
        <div className="loading-overlay">
          <div className="loading-message">Cargando...</div>
        </div>
      }
    </div>
  );
};

export default Login;
