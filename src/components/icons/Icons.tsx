import {
    Cpu,
    Clock,
    Settings,
    Moon,
    Sun,
    Bell,
    ChevronDown,
    FileText,
    User,
    GitHub,
    Send,
  } from "react-feather";
  
  // Rename exports to match your preferred naming convention
  export const Bot = Cpu;
  export const History = Clock;
  export const FileCode = FileText;
  
  // Directly export other icons
  export {
    Settings,
    Moon,
    Sun,
    Bell,
    ChevronDown,
    User,
    GitHub,
    Send,
  };
  
  // Define IconProps if needed (react-feather already includes proper types)
  export type { IconProps } from "react-feather";