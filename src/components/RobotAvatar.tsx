import React from 'react';

interface RobotAvatarProps {
  size?: 'sm' | 'md' | 'lg';
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({ size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
      {/* Robot body */}
      <div className="w-full h-full bg-yellow-400 rounded-full border-4 border-gray-800 relative">
        {/* Antenna */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-3 bg-gray-800"></div>
          <div className="w-3 h-3 bg-gray-800 rounded-full -mt-1"></div>
        </div>
        
        {/* Face screen */}
        <div className="absolute inset-2 bg-blue-400 rounded-full border-2 border-gray-800 flex items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          {/* Smile */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-2 border-b-2 border-white rounded-full"></div>
          </div>
        </div>
        
        {/* Side panels/ears */}
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-6 bg-gray-800 rounded-l-full"></div>
        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-6 bg-gray-800 rounded-r-full"></div>
      </div>
    </div>
  );
};