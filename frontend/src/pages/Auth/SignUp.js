import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FormTitle } from '../../components/form/FormTitle';
import { SubmitButton } from '../../components/form/SubmitButton';
import { inputFieldClassName } from '../../constants/classnames';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Participant');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
            localStorage.setItem('token', res.data.token);
            setMessage('Sign up successful');
        } catch (error) {
            setMessage('Sign up failed');
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
            <div className='card w-[400px] border-1 border p-6 bg-[#ffffff]'>
                <FormTitle title='Sign Up' />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className={inputFieldClassName}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className={inputFieldClassName}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            className={inputFieldClassName}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="Admin">Admin</option>
                            <option value="EventOrganizer">Event Organizer</option>
                            <option value="Participant">Participant</option>
                        </select>
                    </div>
                    <SubmitButton buttonText={'Submit'} />
                    <p className='text-center my-3 text-md text-primary'>
                        Already have an account?
                        <Link
                            to={'/login'}
                            className='text-[#2563EB] underline font-bold ml-2'
                        >
                            Login Here
                        </Link>
                    </p>
                </form>
                {message && <p>{message}</p>}
            </div>

        </div>
    );
};
