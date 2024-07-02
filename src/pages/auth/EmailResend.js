import React, { useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';

const EmailResend = () => {

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
        <div>
            <h1>Resend Email Confirmation</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleResendEmail}>Resend Email</button>
        </div>
    );
};

export default EmailResend