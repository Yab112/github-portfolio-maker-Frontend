import { useState, useEffect } from 'react';
import { steps } from '../../data/staticdata';
import { motion } from 'framer-motion';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/ream_me.jpg', '/code.jpg', '/glass.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="how-it-works" className="py-20 my-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Create Perfect READMEs in Minutes
              </h2>
              <p className="text-xl text-gray-600">
                Follow our simple process to generate professional documentation
                for your projects
              </p>
            </div>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <Step
                  key={index}
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl transform rotate-2"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-xl">
              <motion.div
                className="relative w-80 h-96"
                whileHover={{ scale: 0.85 }}
              >
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="README Generator Interface"
                    className={`absolute top-0 left-28 w-full h-full  object-cover rounded-lg transition-opacity duration-1000 ease-in-out ${currentImage === index ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </motion.div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full ${currentImage === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
