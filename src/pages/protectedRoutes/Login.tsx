import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string()
    .nonempty('Email is required')
    .email('Invalid email'),
  password: z.string()
    .nonempty('Password is required')
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    toast.success("This is a success toast!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="flex flex-col md:flex-row gap-4 border border-blue-500 h-[40em] mt-20 mb-20 mx-auto rounded-2xl w-[70%]">
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
          <h1 className="text-7xl font-bold text-blue-600">Login</h1>
          <p className="text-slate-400 text-sm max-w-3xl mt-4">
            By continuing you agree to our agreement and acknowledge that you
            understand the Privacy Policy.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm p-2">
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
            className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className='text-red-400 text-sm'>{errors.email.message}</p>}
          <div className="relative w-full mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password *"
              {...register('password')}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className='text-red-400 text-sm'>{errors.password.message}</p>}
          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <motion.button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
          <div className="text-center">
            <p className="text-gray-700 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
