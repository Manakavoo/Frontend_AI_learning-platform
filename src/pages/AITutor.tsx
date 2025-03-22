
import React, { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Bot, User, SendHorizonal } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Tutor. I can help you with your learning journey, answer questions about various topics, and provide personalized learning recommendations. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateTutorResponse = (userQuestion: string) => {
    // Simulate AI thinking with typing indicator
    setIsTyping(true);
    
    // Keywords to detect in user questions
    const keywordResponses: Record<string, string[]> = {
      "learn": [
        "To learn effectively, I recommend breaking the topic into smaller chunks and practicing regularly. What specific subject are you interested in?",
        "Learning is a journey! A combination of video tutorials, hands-on practice, and reading materials usually works best. Would you like recommendations for your topic?"
      ],
      "recommend": [
        "Based on your interests, I'd recommend starting with fundamental concepts before moving to advanced topics. Would you like a structured learning path?",
        "I'd be happy to make some recommendations! To personalize them better, could you tell me about your current knowledge level and goals?"
      ],
      "roadmap": [
        "A good learning roadmap should include theory, practice, and projects. I can help you create one tailored to your goals. What are you looking to achieve?",
        "Creating a personalized roadmap is a great way to stay focused. Let's start by identifying your current skills and your target expertise level."
      ],
      "difficult": [
        "Many learners find that concept challenging! Breaking it down into smaller parts and practicing with examples often helps. Would you like me to explain it differently?",
        "When facing difficult concepts, try approaching them from different angles. Visual learners might benefit from diagrams, while others prefer step-by-step explanations."
      ],
      "project": [
        "Working on projects is an excellent way to solidify your learning! For beginners, I suggest starting with guided projects before creating something from scratch.",
        "Projects are where learning comes alive! Consider choosing something that interests you personally - you'll be more motivated to overcome obstacles."
      ]
    };
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question! To provide the most helpful response, could you share a bit more about your learning goals?",
      "I'm here to help with your learning journey. Could you elaborate on your question so I can give you more specific guidance?",
      "As your AI Tutor, I'd be happy to assist with that. To provide tailored advice, it would help to know your current knowledge level in this area.",
      "Great question! Learning is highly personal, so to give you the best answer, I'd like to know what you're hoping to achieve.",
      "I can definitely help with that. To make my response more relevant to your needs, could you tell me what you've already tried or learned on this topic?"
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
    
    // Simulate AI processing time (1.5-3 seconds)
    const typingDelay = 1500 + Math.random() * 1500;
    
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
    const aiResponse = await generateTutorResponse(inputValue);
    
    // Add bot message
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        <div className="pt-16 md:pt-0 px-4 md:px-8 py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">AI Tutor</h1>
          <p className="text-muted-foreground mb-6">Your personal learning assistant</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-card rounded-xl border border-border shadow-sm p-4 h-[calc(100vh-12rem)] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 p-2">
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
                          {message.sender === 'user' ? 'You' : 'AI Tutor'}
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
                        <span className="text-xs font-medium">AI Tutor</span>
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
              
              <form onSubmit={handleSubmit} className="mt-4 border-t border-border pt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask me anything about your learning journey..."
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
            
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">How I Can Help You</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="p-1.5 bg-primary/10 text-primary rounded-full mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Answer Questions</p>
                    <p className="text-sm text-muted-foreground">Get explanations on complex topics</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="p-1.5 bg-primary/10 text-primary rounded-full mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Create Learning Paths</p>
                    <p className="text-sm text-muted-foreground">Get personalized roadmaps for your goals</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="p-1.5 bg-primary/10 text-primary rounded-full mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Recommend Resources</p>
                    <p className="text-sm text-muted-foreground">Find the best learning materials</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="p-1.5 bg-primary/10 text-primary rounded-full mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Practice Exercises</p>
                    <p className="text-sm text-muted-foreground">Get challenges to test your knowledge</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium mb-2">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setInputValue("Help me learn programming")}
                    className="px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                  >
                    Programming
                  </button>
                  <button 
                    onClick={() => setInputValue("I need a data science roadmap")}
                    className="px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                  >
                    Data Science
                  </button>
                  <button 
                    onClick={() => setInputValue("How to learn machine learning?")}
                    className="px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                  >
                    Machine Learning
                  </button>
                  <button 
                    onClick={() => setInputValue("What project should I build to practice web development?")}
                    className="px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                  >
                    Web Development
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
