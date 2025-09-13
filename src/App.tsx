import React, { useState, useRef, useEffect } from 'react';
import { Play, Send, FlaskConical } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ProgressBar } from './components/ProgressBar';
import { Achievement } from './components/Achievement';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, message: "Hello! Ready to learn today?", isBot: true, timestamp: "2:09 PM" },
    { id: 2, message: "Yes, explain atoms in simple words.", isBot: false, timestamp: "2:09 PM" },
    { id: 3, message: "Atoms are the building blocks of everything!", isBot: true, timestamp: "2:09 PM" },
    { id: 4, message: "Can you quiz me on this?", isBot: false, timestamp: "2:10 PM" },
    { id: 5, message: "Sure! Here's a quick question: ...", isBot: true, timestamp: "2:10 PM" }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [xpProgress, setXpProgress] = useState(60);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        message: inputMessage,
        isBot: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(inputMessage);
        const botMessage = {
          id: messages.length + 2,
          message: botResponse,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
        setXpProgress(prev => Math.min(prev + 5, 100));
      }, 1000);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('what') && (lower.includes('atom') || lower.includes('atoms'))) {
      return "An atom is the smallest unit of matter that retains the properties of an element. Think of it like a tiny LEGO block that everything is made of!";
    } else if (lower.includes('molecule')) {
      return "A molecule is formed when two or more atoms bond together. For example, water (H₂O) is a molecule made of 2 hydrogen atoms and 1 oxygen atom!";
    } else if (lower.includes('electron')) {
      return "Electrons are tiny particles that orbit around the nucleus of an atom. They carry negative charge and are responsible for chemical bonding!";
    } else if (lower.includes('quiz') || lower.includes('question')) {
      return "Great! Here's a question: What are atoms made of? (Hint: Think about the three main particles that make up an atom)";
    } else if (lower.includes('proton') || lower.includes('neutron') || lower.includes('electron')) {
      return "Excellent! Atoms are made of protons (positive), neutrons (neutral), and electrons (negative). You're getting the hang of this! 🎉";
    } else {
      return "That's an interesting question! Atoms are fascinating - they make up everything around us, from the air we breathe to the device you're using right now. What would you like to know more about?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <button className="p-3 bg-yellow-400 rounded-xl border-2 border-gray-800 hover:bg-yellow-500 transition-colors">
            <Play size={20} className="text-gray-800 ml-1" />
          </button>
          
          <div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <span>Science</span>
              <FlaskConical size={16} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Atoms & Molecules</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 min-h-[500px] max-h-[600px] overflow-y-auto border border-blue-100">
              {messages.map((msg) => (
                <ChatMessage 
                  key={msg.id} 
                  message={msg.message} 
                  isBot={msg.isBot}
                  timestamp={msg.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="mt-4 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="w-full px-6 py-4 pr-14 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <ProgressBar 
              current={xpProgress} 
              max={100} 
              label="XP Progress" 
            />
            
            {/* Achievements */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
              <Achievement 
                title="First Quiz Completed" 
                icon="star" 
                isCompleted={true} 
              />
              <Achievement 
                title="Atom Explorer" 
                icon="zap" 
                isCompleted={xpProgress >= 50} 
              />
              <Achievement 
                title="Science Enthusiast" 
                icon="award" 
                isCompleted={xpProgress >= 100} 
              />
            </div>
            
            {/* Quick Facts */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">💡 Quick Fact</h4>
              <p className="text-sm text-blue-800">
                A single drop of water contains approximately 1.67 × 10²¹ water molecules!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;