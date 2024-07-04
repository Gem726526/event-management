import React, { useState } from 'react';
import axios from 'axios';
import { FormTitle } from '../../components/form/FormTitle';
import { inputFieldClassName } from '../../constants/classnames';
import { SubmitButton } from '../../components/form/SubmitButton';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setMessage('Login successful');
        } catch (error) {
            setMessage('Login failed');
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
            <div className='card w-[400px] border-1 border p-6 bg-[#ffffff]'>
                <FormTitle title='Login' />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            className={inputFieldClassName}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            className={inputFieldClassName}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <SubmitButton buttonText={'Login'} />
                    <p className='text-center my-3 text-md text-primary'>
                        New here?
                        <Link
                            to={'/signup'}
                            className='text-[#2563EB] underline font-bold ml-2'
                        >
                            SignUp Here.
                        </Link>
                    </p>
                </form>
                {message && <p>{message}</p>}
            </div>

        </div>
    );
};
