import React from 'react';
import { RobotAvatar } from './RobotAvatar';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-6`}>
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} items-start max-w-4xl`}>
        {isBot && (
          <div className="mr-3">
            <RobotAvatar size="md" />
          </div>
        )}
        
        <div className={`px-4 py-3 rounded-2xl ${
          isBot 
            ? 'bg-white border border-gray-200 text-gray-800' 
            : 'bg-blue-500 text-white'
        } max-w-md shadow-sm`}>
          <p className="text-sm leading-relaxed">{message}</p>
          {timestamp && (
            <p className={`text-xs mt-1 ${isBot ? 'text-gray-500' : 'text-blue-100'}`}>
              {timestamp}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};