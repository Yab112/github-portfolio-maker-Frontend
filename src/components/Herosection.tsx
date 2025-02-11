import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InfiniteScroll from './InfiniteScroll';

export default function HeroSection() {
  return (
    <section className="items-center md:pt-32 md:pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-9xl font-bold tracking-tight text-gray-900"
              style={{ WebkitTextStroke: '2px #2563EB' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.span
                className="inline-block text-transparent bg-clip-text font-outline-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                README
              </motion.span>
              <br />
              <motion.span
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 font-outline-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Generator
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Generate README files for your projects with ease
            </motion.p>
            <Link to="/login">
              <button className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                Get Started
              </button>
            </Link>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl transform rotate-2 w-[48em] border border-slate-300"></div>
            <motion.img
              src="/ream_me.jpg"
              alt="Tool icon"
              width={1200}
              height={1224}
              className="relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
        </div>
        <InfiniteScroll />
      </div>
    </section>
  );
}
