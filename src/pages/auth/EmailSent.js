import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

export const EmailSent = () => {

    const { state } = useLocation();

    const userEmail = state.email;

    const [email, setEmail] = useState('');

    const handleResendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosReq.post('/dj-rest-auth/registration/resend-email/', {
                email: email,
            });
            console.log('Email resent:', response.data);
        } catch (error) {
            console.error('Error resending email:', error);
        }
    };


    return (
        <>
            <div>An email has been sent to {userEmail} </div>
            <div>If you haven't received the email, you can request to resend it here</div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleResendEmail}>Resend Email</button>
        </>


    )
}
