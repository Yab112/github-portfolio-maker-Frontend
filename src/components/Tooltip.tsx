import React, { ReactNode } from 'react';

interface TooltipProps {
  text: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = 'top',
  children,
  className = '',
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 translate-y-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 translate-x-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2';
    }
  };


  return (
    <div className={`group relative ${className}`}>
      {children}
      <div
        className={`absolute z-50 ${getPositionClasses()} hidden group-hover:flex`}
      >
        <div className="relative bg-white text-blue-950 text-xs rounded px-3 py-2 border border-blue-800 w-max p-8">
          {text}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
