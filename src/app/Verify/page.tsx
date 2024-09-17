"use client";
import React, { useState } from 'react';
import styles from './verify.module.css';
import CustomInput from '../../Utils/customInput';
import CustomButton from '../../Utils/customButton';
import axios from "axios";
import { useRouter } from 'next/navigation';

interface VerifyProps {
    email: string;
}

const Verify: React.FC<VerifyProps> = ({ email }) => {
    console.log(email);
    
    const [otp, setOtp] = useState('');
    const [verifyResponse, setVerifyResponse] = useState('');
    const [generateResponse, setGenerateResponse] = useState('');
    const router = useRouter();
    const generateOTP = async () => {
        const body = {email}
        
        try {
            const res = await axios.post('http://localhost:5000/generate-otp',body,{withCredentials:true});
            console.log(res);
            setGenerateResponse('OTP sent successfully');
        } catch (error) {
            setGenerateResponse('Error generating OTP');
        }
    };

    const verifyOTP = async () => {
        try {
            console.log(otp);
            const res = await axios.post('http://localhost:5000/verify-otp', { email, otp },{withCredentials:true});
            console.log("response verify",res);
            setVerifyResponse('OTP verified');
            router.push('/Login');
        } catch (error) {
            console.log(error);
            setVerifyResponse('Error verifying OTP');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Email Verification</h2>
            <div className={styles.form}>
            {/* Display the email */}
            <CustomInput
            label='Email'
            inputType='email'
            value={email}
            name='email'
            className={styles.customLabel}
            />
            <CustomButton label="Generate OTP" onClick={generateOTP} />
            <p className={styles.message}>{generateResponse}</p>
            <br></br>
            <CustomInput
            label="Name"
            inputType="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            />
            <CustomButton label="Verify OTP" onClick={verifyOTP} />
            <p className={styles.message}>{verifyResponse}</p>
            </div>
        </div>
    );
};

export default Verify;
