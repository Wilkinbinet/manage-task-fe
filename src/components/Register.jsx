import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, registerSuccess, registerFailed } from '../features/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { REGISTER_URL } from '../util/api';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  const schema = yup.object().shape({
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await schema.validate({ userName, email, password });

      setError('');
      dispatch(register());

      setIsLoading(true); 

      try {
        const response = await axios.post(REGISTER_URL, {
          userName,
          email,
          password,
        });
        if (response.status === 201) {
          setShowDialog(true);
        } else {
          dispatch(registerSuccess(response.data));
        }
      } catch (error) {
        dispatch(registerFailed(`Error interno, Consulte el administrador. Codigo: ${error.response.status}`));
      } finally {
        setIsLoading(false); // fin de carga
      }
    } catch (validationError) {
      setError(validationError.message);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const handleAcceptDialog = () => {
    setShowDialog(false);
    navigate('/');
  };

  useEffect(() => {
    return () => {
      setError('');
      setUserName('');
      setEmail('');
      setPassword('');
    };
  }, []);

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Registrar</h1>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="form-control"
              disabled={isLoading}  
            />
          </div>
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
            <button type="submit" className="btn btn-primary" disabled={isLoading}>Registrar</button>
            <button type="button" onClick={handleBackToLogin} className="btn btn-link">Volver al login</button>
          </div>
        </form>
        {(auth.error || error) && (
          <div className="error-message">
            {auth.error}
            {error}
          </div>
        )}
        {isLoading && <div className="loading-message">Cargando...</div>} 
      </div>
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3 className="dialog-title">Registro exitoso</h3>
            <p className="dialog-message">¡Tu registro ha sido exitoso!</p>
            <button type="button" onClick={handleAcceptDialog} className="btn btn-primary dialog-button">Aceptar</button>
          </div>
        </div>
      )}
      {isLoading && 
        <div className="loading-overlay">
          <div className="loading-message">Cargando...</div>
        </div>
      }
    </div>
  );
};

export default Register;
