import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 to-transparent"></div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side (Text Content) */}
          <motion.div
            className="space-y-8 text-white"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-extrabold tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              README <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-yellow-300">
                Generator
              </span>
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl font-light text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Easily generate professional README files for your projects in seconds!
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Link to="/login">
                <button className="h-14 px-8 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-lg transition-all duration-300">
                  Get Started
                </button>
              </Link>

              <Link to="/about">
                <button className="h-14 px-8 text-lg font-semibold border border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side (Image & Effect) */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {/* Glowing Effect */}
            <div className="absolute -top-10 -left-10 w-96 h-96 bg-blue-500 opacity-30 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-yellow-400 opacity-30 rounded-full filter blur-3xl"></div>

            {/* Image */}
            <motion.img
              src="/ream_me.jpg"
              alt="README Generator"
              width={600}
              height={600}
              className="relative z-10 rounded-lg shadow-xl border border-white"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
