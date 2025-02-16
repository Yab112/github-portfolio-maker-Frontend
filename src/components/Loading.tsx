import React from "react";
import { motion } from "framer-motion";

interface LoadingProps {
  size?: string; // Base size for outer spinner
  color1?: string; // Color for outer spinner
  color2?: string; // Color for middle spinner
  color3?: string; // Color for inner spinner
  borderWidth?: string; // Border thickness
  speed?: number; // Animation speed multiplier
  className?: string; // Additional custom styles
}

const Loading: React.FC<LoadingProps> = ({
  size = "w-24 h-24",
  color1 = "border-blue-500",
  color2 = "border-green-500",
  color3 = "border-red-500",
  borderWidth = "border-4",
  speed = 1,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className={`absolute rounded-full ${size} ${borderWidth} ${color1} border-t-transparent`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2 / speed, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle Ring */}
        <motion.div
          className={`absolute rounded-full ${borderWidth} ${color2} border-t-transparent`}
          style={{ width: "75%", height: "75%" }} // 75% of outer ring
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5 / speed, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className={`absolute rounded-full ${borderWidth} ${color3} border-t-transparent`}
          style={{ width: "50%", height: "50%" }} // 50% of outer ring
          animate={{ rotate: 360 }}
          transition={{ duration: 1 / speed, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default Loading;
