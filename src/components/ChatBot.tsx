
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Bot, User, X, Maximize2, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  videoId?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ videoId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI learning assistant. How can I help you with this video?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's a great question! Let me explain that concept for you.",
        "I'd recommend checking out the section at 3:45 for more details on that topic.",
        "This is a complex topic. I can break it down into simpler steps if you'd like.",
        "I'm not sure about that specific detail, but I can help you find more resources on it.",
        "That's correct! You've understood the key concept very well."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-10">
        <button 
          onClick={() => setIsMinimized(false)}
          className="bg-primary text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card shadow-sm overflow-hidden animate-scale-in">
      <div className="flex items-center justify-between bg-secondary/80 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h3 className="font-medium">AI Learning Assistant</h3>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(true)} 
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-secondary text-secondary-foreground rounded-tl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'bot' && <Bot className="w-4 h-4" />}
                <span className="text-xs font-medium">
                  {message.sender === 'user' ? 'You' : 'AI Assistant'}
                </span>
                <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-border">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask about this video..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-full bg-secondary text-foreground text-sm focus:outline-none"
          />
          <button 
            type="submit" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full disabled:opacity-50"
            disabled={!inputValue.trim()}
          >
            <SendHorizonal className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
