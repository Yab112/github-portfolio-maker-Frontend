import type React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

// Define type-safe icon names
export type IconNames = keyof typeof Icons;

export interface FeatureCardProps {
  icon: IconNames;
  title: string;
  description: string;
}

const hoverEffects = {
  hover: { scale: 1.08, rotate: 2, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" },
  tap: { scale: 0.95, rotate: -1 },
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const IconComponent = Icons[icon] as React.ElementType;

  return (
    <motion.div
      className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={hoverEffects.hover}
      whileTap={hoverEffects.tap}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
