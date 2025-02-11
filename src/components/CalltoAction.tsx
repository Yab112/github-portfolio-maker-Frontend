import { motion } from "framer-motion";

const CalltoAction = () => {
  return (
    <section className="flex flex-col gap-4 bg-gradient-to-r from-[#004ff9] to-[#0066b2] w-full h-72 mt-9 mb-20 mx-auto rounded-2xl shadow-lg">
      <motion.div
        className="flex flex-col items-center justify-center h-full px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="text-4xl text-center font-sans font-bold text-white mt-6">
          Want to build your README file? Let's start!
        </h1>
        <div className="flex gap-3 justify-center items-center mt-6">
          <input
            type="text"
            placeholder="Enter your GitHub username"
            className="border border-gray-400 rounded-lg h-12 w-64 px-4 text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="GitHub username input"
          />
          <motion.button
            className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Start generating README"
          >
            Start
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CalltoAction;
