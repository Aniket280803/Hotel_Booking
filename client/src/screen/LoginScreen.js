import React, { useState } from 'react';
import axios from "axios";
import Loader from '../component/Loader';
import Error from '../component/Error';
import { Link } from 'react-router-dom';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const Login = async () => {
        const user = { email, password };

        try {
            setLoading(true);
            const { data } = await axios.post('/api/users/login', user);
            setLoading(false);
            localStorage.setItem('currentUser', JSON.stringify(data));

            // Redirect based on user role
            if (data.isAdmin) {
                window.location.href = '/Admin';
            } else {
                window.location.href = '/home';
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error.response?.data.message || 'Invalid Credentials');
        }
    };

    return (
        <div>
            {loading && <Loader />}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {error && <Error message={error} />}
                    <div className="container bs">
                        <h2>Login</h2>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn btn-primary mt-3" onClick={Login}>Login</button>
                        <div className="mt-3">
                            <span>Don't Have an Account? </span>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
