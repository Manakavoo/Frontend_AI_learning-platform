import React, { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Bot, User, SendHorizonal, Loader2 } from 'lucide-react';
import { tutorService, Message as ApiMessage } from '../services/tutorService';
import { useToast } from "@/components/ui/use-toast";

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
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const suggestions = [
    {
      text: "Create a roadmap for data science career",
      details: "Help me create a comprehensive learning roadmap for becoming a data scientist from scratch"
    },
    {
      text: "Prepare a weekly study schedule",
      details: "I want to learn machine learning. Can you help me create a balanced weekly study schedule?"
    },
    {
      text: "Explain neural networks simply",
      details: "Can you explain how neural networks work in simple terms with examples?"
    },
    {
      text: "Project ideas for portfolio",
      details: "What are some beginner-friendly data science projects I can build for my portfolio?"
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoadingConversations(true);
      try {
        const conversationsData = await tutorService.getConversations();
        setConversations(conversationsData);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        toast({
          title: "Error",
          description: "Failed to fetch conversations.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingConversations(false);
      }
    };

    fetchConversations();
  }, [toast]);

  const formatMessagesForAPI = (messages: Message[]): ApiMessage[] => {
    const messagesToSend = messages.slice(1);
    return messagesToSend.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isTyping) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const history = formatMessagesForAPI(messages);
      
      const response = await tutorService.sendMessage({
        message: userMessage.text,
        history: history
      });
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI Tutor.",
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
                    {isTyping ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <SendHorizonal className="w-4 h-4" />
                    )}
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
              
              {isLoadingConversations ? (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-medium mb-2">Your Conversations</h3>
                  <div className="flex justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                </div>
              ) : conversations.length > 0 ? (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-medium mb-2">Your Conversations</h3>
                  <div className="space-y-2">
                    {conversations.map(conversation => (
                      <div 
                        key={conversation.id}
                        className="p-2 rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
                      >
                        <p className="text-sm font-medium">{conversation.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(conversation.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-medium mb-3">Try These Learning Paths</h3>
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        onClick={() => setInputValue(suggestion.details)}
                        className="p-3 bg-secondary/50 rounded-lg hover:bg-secondary cursor-pointer transition-colors border border-border/50"
                      >
                        <p className="font-medium text-sm">{suggestion.text}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{suggestion.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
