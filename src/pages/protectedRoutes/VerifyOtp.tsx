import type React from 'react';
import { useState, useRef, type ChangeEvent, type KeyboardEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOtpUser, resendOtp } = useAuth(); 
  
  // States for managing the resend OTP timer
  const [timer, setTimer] = useState<number>(60); 
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace for moving focus backward
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // OTP form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');

    try {
      await verifyOtpUser(otpString);
      if (location.state?.from === 'signup') {
        navigate('/login');
        toast.success('OTP Verified Successfully, login to continue!');
      } else {
        navigate('/dashboard');
        toast.success('OTP Verified Successfully, user logged in!');
      }
    } catch (error) {
      console.error('OTP Verification Failed:', error);
      toast.error(`OTP verification failed: ${error || error}`);
    }
  };

  // Resend OTP function
  const handleResendOtp = async () => {
    try {
      await resendOtp(); // Call the resend OTP logic from the auth hook
      toast.success('OTP has been resent!');
      // Start the timer countdown after the OTP is resent
      setIsResendDisabled(true);
      setTimer(60); // Reset the timer to 30 seconds
    } catch (error) {
      console.error('Resend OTP Failed:', error);
      toast.error('Failed to resend OTP. Please try again later.');
    }
  };

  // Timer logic for disabling the Resend OTP button
  useEffect(() => {
    if (isResendDisabled && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Enable the button after timer ends
    }
  }, [isResendDisabled, timer]);

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-4 border border-blue-500 h-[40em] mt-20 mb-20 mx-auto rounded-2xl w-[70%] relative bg-cover bg-center"
      style={{ backgroundImage: "url('/log_in_back.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      whileInView={{ opacity: 1 }}
    >
      <div className="bg-slate-100/90 p-8 rounded-lg items-center justify-center flex flex-col flex-1 absolute inset-0 m-auto h-[50%] w-[50%]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-blue-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleResendOtp}
            disabled={isResendDisabled}
            className={`w-full  text-blue-500 py-2 rounded-md hover:underline-offset-1 cursor-pointer transition duration-300 ${isResendDisabled ? 'cursor-not-allowed' : ''}`}
          >
            {isResendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OTPVerification;
