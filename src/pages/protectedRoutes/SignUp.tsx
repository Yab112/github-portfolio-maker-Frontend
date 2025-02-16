import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {  z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaGithub, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const schema = z
  .object({
    email: z.string().nonempty('Email is required').email('Invalid email'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password must be less than 100 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string().nonempty('Confirm Password is required'),
    agree: z
      .boolean()
      .refine((val) => val, { message: 'You must agree to continue' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  
type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { signupuser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  //pass the user data to the user endpoint
  const onSubmit = async (data: FormData) => {
    console.log('Form Data:', data);
  try {
    const response = await signupuser(data.email, data.password);
    console.log(response)
    if (response?.status == 201) {
      // Show success toast
      toast.success(`${response.data.message}`);
      navigate('/verify-otp');
    } else {
      // Show error toast if response is undefined
      toast.error('Signup failed. Please try again.');
    }
  } catch (error) {
    // Show error toast if there's an exception
    toast.error('Signup failed. Please try again.');
    console.error('Signup failed:', error);
  }
  };

  const checkPasswordStrength = (password: string) => {
    const requirements = [
      { regex: /.{6,}/, message: 'At least 6 characters' },
      { regex: /[a-z]/, message: 'At least one lowercase letter' },
      { regex: /[A-Z]/, message: 'At least one uppercase letter' },
      { regex: /[0-9]/, message: 'At least one number' },
      { regex: /[^a-zA-Z0-9]/, message: 'At least one special character' },
    ];
    return requirements.map((req) => ({
      ...req,
      valid: req.regex.test(password),
    }));
  };

  const passwordStrength = checkPasswordStrength(password);
  const strengthPercentage =
    (passwordStrength.filter((req) => req.valid).length /
      passwordStrength.length) *
    100;

  return (
    <section className="flex flex-col md:flex-row gap-4 border border-blue-500 h-[45em] mt-20 mb-20 mx-auto rounded-2xl w-[70%]">
      <div className="flex-1 hidden md:flex items-center justify-center bg-blue-600 rounded-l-2xl">
        <img
          src="/log_in_back.jpg"
          alt="Welcome"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </div>
      <motion.div
        className="flex flex-col items-center justify-center flex-1 w-full h-full px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="text-center mb-8 border-b border-gray-300">
          <h1 className="text-7xl font-bold text-blue-600">Sign Up</h1>
          <p className="text-slate-400 text-sm mt-2">
            By continuing you agree to our agreement and acknowledge that you
            understand the Privacy Policy.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm p-2">
          <div className="form-check mb-4">
            <label className="form-check-label text-gray-700 text-sm">
              <input
                type="checkbox"
                {...register('agree')}
                className="form-check-input mr-2"
              />
              I agree to get emails about the cool stuff on Readme Generator and
              Projects
            </label>

            {errors.agree && (
              <p className="text-red-400 text-sm">{errors.agree.message}</p>
            )}
          </div>

          <div className="items-center flex gap-12 mb-4 cursor-pointer border border-gray-300 rounded-lg p-2 bg-blue-900/90">
            <FaGithub className="text-2xl text-gray-200" />
            <span className="text-gray-200 font-semibold">
              Continue With GitHub
            </span>
          </div>
          <input
            type="text"
            placeholder="Email *"
            {...register('email')}
            className="w-full h-12 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
          <div className="relative w-full mb-4">
            <Tooltip
              text={
                <ul className="mb-4">
                  {passwordStrength.map((req, index) => (
                    <li
                      key={index}
                      className={`text-sm flex gap-2 ${req.valid ? 'text-green-500' : 'text-red-500'}`}
                    >
                      <FaCheck />
                      {req.message}
                    </li>
                  ))}
                </ul>
              }
              position="top"
            >
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password *"
                {...register('password')}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Tooltip>
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <div className="absolute inset-y-0 right-12 flex items-center">
              <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strengthPercentage === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${strengthPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password *"
            disabled={password === ''}
            {...register('confirmPassword')}
            className="w-full h-12 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
          <motion.button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </motion.button>
          <div className="text-center mt-4">
            <p className="text-gray-700 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default SignUp;
