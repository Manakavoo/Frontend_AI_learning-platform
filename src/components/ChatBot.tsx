
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Bot, User, X, Minimize2 } from 'lucide-react';
import { sampleVideos } from '../data/sampleData';

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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current video information for contextualized responses
  const currentVideo = sampleVideos.find(v => v.id === videoId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userQuestion: string) => {
    // Simulate AI thinking with typing indicator
    setIsTyping(true);
    
    // Get contextual information from the current video
    const videoContext = currentVideo ? {
      title: currentVideo.title,
      category: currentVideo.category,
      description: currentVideo.description,
      author: currentVideo.author
    } : null;
    
    // Keywords to detect in user questions
    const keywordResponses: Record<string, string[]> = {
      "what is": [
        `Based on this ${videoContext?.category} video, ${userQuestion.replace('what is', '')} refers to a key concept covered at the beginning of the tutorial.`,
        `In "${videoContext?.title}", ${userQuestion.replace('what is', '')} is explained as a fundamental concept in ${videoContext?.category}.`
      ],
      "how to": [
        `The video demonstrates ${userQuestion} around timestamp 3:45. ${videoContext?.author} shows a step-by-step approach.`,
        `To ${userQuestion.replace('how to', '')}, the video recommends following these steps outlined in the middle section of the tutorial.`
      ],
      "explain": [
        `According to the video, ${userQuestion.replace('explain', '')} works by utilizing the principles discussed in the second half of the presentation.`,
        `${videoContext?.author} explains this in detail during the video. The concept involves several components that work together.`
      ],
      "why": [
        `The reason ${userQuestion.replace('why', '')} is because of the fundamental principles of ${videoContext?.category} discussed in this video.`,
        `As explained by ${videoContext?.author}, ${userQuestion.replace('why', '')} due to the underlying mechanics covered in the tutorial.`
      ],
      "example": [
        `There's a great example of this at around 5:20 in the video where ${videoContext?.author} demonstrates it with a practical case.`,
        `The video provides several examples, particularly in the section where ${videoContext?.author} demonstrates practical applications.`
      ]
    };
    
    // Default responses if no keywords match
    const defaultResponses = [
      `That's an interesting question about "${videoContext?.title}". The video covers this topic in the middle section.`,
      `According to the content in this ${videoContext?.category} video, this concept is fundamental to understanding the overall subject.`,
      `${videoContext?.author} addresses this specifically in the tutorial. I'd recommend focusing on the explanation given around the midpoint of the video.`,
      `This question relates to the core concepts of ${videoContext?.category} covered in this video. The key point to understand is how these elements interact.`,
      `Based on the video content, I can tell you that this is an important aspect of what ${videoContext?.author} is teaching in this tutorial.`
    ];
    
    // Find a matching keyword response or use default
    let response = "";
    const lowercaseQuestion = userQuestion.toLowerCase();
    
    for (const [keyword, responses] of Object.entries(keywordResponses)) {
      if (lowercaseQuestion.includes(keyword)) {
        response = responses[Math.floor(Math.random() * responses.length)];
        break;
      }
    }
    
    // If no keyword matched, use a default response
    if (!response) {
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // Add video-specific context to make it more personalized
    if (videoContext) {
      if (Math.random() > 0.7) {
        response += ` If you're interested in learning more about ${videoContext.category}, this video by ${videoContext.author} is an excellent resource.`;
      }
    }
    
    // Simulate AI processing time (1-2 seconds)
    const typingDelay = 1000 + Math.random() * 1000;
    
    return new Promise<string>(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve(response);
      }, typingDelay);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    // Generate AI response
    const aiResponse = await generateAIResponse(inputValue);
    
    // Add bot message after AI generates a response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
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
        
        {/* Typing indicator */}
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
            placeholder="Ask about this video..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-full bg-secondary text-foreground text-sm focus:outline-none"
          />
          <button 
            type="submit" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full disabled:opacity-50"
            disabled={!inputValue.trim() || isTyping}
          >
            <SendHorizonal className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
