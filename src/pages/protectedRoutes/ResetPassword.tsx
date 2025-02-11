import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const schema = z.object({
  password: z.string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().nonempty('Confirm Password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const ResetPassword = () => {
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

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    toast.success("Password reset successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
    })
  };

  const checkPasswordStrength = (password: string) => {
    const requirements = [
      { regex: /.{6,}/, message: 'At least 6 characters' },
      { regex: /[a-z]/, message: 'At least one lowercase letter' },
      { regex: /[A-Z]/, message: 'At least one uppercase letter' },
      { regex: /[0-9]/, message: 'At least one number' },
      { regex: /[^a-zA-Z0-9]/, message: 'At least one special character' },
    ];
    return requirements.map(req => ({
      ...req,
      valid: req.regex.test(password),
    }));
  };

  const passwordStrength = checkPasswordStrength(password);

  return (
    <section className='flex flex-col md:flex-row gap-4 border border-blue-500 h-[45em] mt-20 mb-20 mx-auto rounded-2xl w-[70%]'>
      <motion.div
        className='flex flex-col items-center justify-center flex-1 w-full h-full px-4'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="text-center mb-8 border-b border-gray-300">
          <h1 className='text-7xl font-bold text-blue-600'>Reset Password</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm p-2">
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder='New Password *'
              {...register("password")}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
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
          <ul className="mb-4">
            {passwordStrength.map((req, index) => (
              <li key={index} className={`text-sm ${req.valid ? 'text-green-500' : 'text-red-500'}`}>
                {req.message}
              </li>
            ))}
          </ul>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Confirm Password *'
            {...register("confirmPassword")}
            className="w-full h-12 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className='text-red-400 text-sm'>{errors.confirmPassword.message}</p>}
          <motion.button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}
          >
            Reset Password
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default ResetPassword;
