import React, { useState } from 'react';
import axios from "axios";
import Loader from '../component/Loader';
import Error from '../component/Error';
import Success from '../component/Success';
import { Link } from 'react-router-dom';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async () => {
    if (password === rePassword) {
      const user = { name, email, password };
      try {
        setLoading(true);
        await axios.post('/api/users/register', user);
        setLoading(false);
        setSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setRePassword('');
      } catch (error) {
        setLoading(false);
        setError(error.response?.data.message || 'Something went wrong');
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error message={error} />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration successful" />}
          <div className="container bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={register}>Register</button>
            <div className="mt-3">
              <span>Already Have an Account? </span>
              <Link to="/Login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
