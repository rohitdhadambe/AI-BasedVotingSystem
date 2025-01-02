import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase";

const PhoneAuth = () => {
    const [phone, setPhone] = useState(""); // For phone number input
    const [otp, setOtp] = useState(""); // For OTP input
    const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sent status
    const [verificationId, setVerificationId] = useState(""); // Store Firebase verification ID

    useEffect(() => {
        // Set up reCAPTCHA when the component mounts
        const setupRecaptcha = () => {
            // Ensure recaptchaVerifier is properly initialized
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha-container", // reCAPTCHA container ID
                    {
                        size: "invisible", // Make reCAPTCHA invisible
                        callback: (response) => {
                            console.log("reCAPTCHA verified", response);
                        }
                    },
                    auth
                );
            }
        };
        setupRecaptcha();
    }, []);

    // Send OTP
    const sendOtp = async () => {
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            setVerificationId(confirmationResult.verificationId); // Save the verification ID
            setIsOtpSent(true); // Update OTP status
            alert("OTP sent successfully!");
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Ensure the phone number is valid.");
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
        try {
            const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
            await auth.signInWithCredential(credential);
            alert("Phone number verified successfully!");
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Invalid OTP. Please try again.");
        }
    };

    return (
        <div>
            <h2>Phone Authentication</h2>
            <div id="recaptcha-container"></div>

            {!isOtpSent ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button onClick={sendOtp}>Send OTP</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            )}
        </div>
    );
};

export default PhoneAuth;
