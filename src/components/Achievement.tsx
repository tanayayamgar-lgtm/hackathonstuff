import React from 'react';
import { Star, CheckCircle, Award, Zap } from 'lucide-react';

interface AchievementProps {
  title: string;
  icon?: 'star' | 'check' | 'award' | 'zap';
  isCompleted?: boolean;
}

export const Achievement: React.FC<AchievementProps> = ({ 
  title, 
  icon = 'star', 
  isCompleted = true 
}) => {
  const iconMap = {
    star: Star,
    check: CheckCircle,
    award: Award,
    zap: Zap
  };
  
  const IconComponent = iconMap[icon];
  
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
      isCompleted 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
    }`}>
      <div className={`p-2 rounded-full ${
        isCompleted ? 'bg-green-100' : 'bg-gray-100'
      }`}>
        <IconComponent size={16} className={isCompleted ? 'text-green-600' : 'text-gray-400'} />
      </div>
      
      <span className="text-sm font-medium">{title}</span>
      
      {isCompleted && (
        <div className="ml-auto">
          <CheckCircle size={16} className="text-green-500" />
        </div>
      )}
    </div>
  );
};