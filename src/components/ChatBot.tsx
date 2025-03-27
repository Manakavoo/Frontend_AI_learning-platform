
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Bot, User, X, Minimize2, Loader2 } from 'lucide-react';
import { tutorService, Message as ApiMessage } from '../services/tutorService';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  videoId?: string;
  videoTitle?: string;
  currentTime?: number;
}

const ChatBot: React.FC<ChatBotProps> = ({ videoId, videoTitle, currentTime = 0 }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm your AI learning assistant. How can I help you with this video?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessagesForAPI = (messages: Message[]): ApiMessage[] => {
    const messagesToSend = messages.slice(1);
    return messagesToSend.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isTyping) return;
    
    // Include timestamp in the user message
    const formattedTime = formatTime(currentTime);
    const userMessageWithTimestamp = `[At ${formattedTime}] ${inputValue}`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageWithTimestamp,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Create video context if we have video information
      const videoContext = videoId && videoTitle ? {
        id: videoId,
        title: videoTitle,
        description: `Current time: ${formattedTime}`
      } : undefined;
      
      // Try to send request to OpenAI endpoint
      try {
        const response = await axios.post('http://localhost/openai', {
          message: inputValue,
          videoContext: videoContext,
          timestamp: formattedTime
        }, { timeout: 10000 });
        
        const botMessage: Message = {
          id: Date.now().toString(),
          text: response.data.response || "I couldn't process that request. Please try again.",
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } catch (apiError) {
        console.error('Error with OpenAI API:', apiError);
        
        // Fallback to simulated response
        const botMessage: Message = {
          id: Date.now().toString(),
          text: `I noticed you asked about this at ${formattedTime} in the video. Here's what I can tell you: "${inputValue}" appears to be related to the concepts being discussed at this timestamp. Would you like me to explain further?`,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI Assistant.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatDisplayTime = (date: Date) => {
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
          {currentTime > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {formatTime(currentTime)}
            </span>
          )}
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
                {message.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                <span className="text-xs font-medium">
                  {message.sender === 'user' ? 'You' : 'AI Assistant'}
                </span>
                <span className="text-xs opacity-70">{formatDisplayTime(message.timestamp)}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[80%]">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="w-4 h-4" />
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
              <div className="flex space-x-1 items-center h-5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-border">
        <div className="relative">
          <input
            type="text"
            placeholder={`Ask about this video${currentTime ? ` at ${formatTime(currentTime)}` : ''}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-full bg-secondary text-foreground text-sm focus:outline-none"
          />
          <button 
            type="submit" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full disabled:opacity-50"
            disabled={!inputValue.trim() || isTyping}
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <SendHorizonal className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
