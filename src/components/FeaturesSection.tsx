import FeatureCard from "./FeatureCard";
import { features } from "../../data/staticdata";
import { motion } from "framer-motion";

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Powerful Features for Better Documentation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional README files for your projects
          </p>
        </div>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.6 } }
          }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
