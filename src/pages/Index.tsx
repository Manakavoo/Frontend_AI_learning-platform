
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-secondary opacity-50 blur-[100px]" />
          <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary opacity-30 blur-[100px]" />
          <div className="absolute -bottom-[20%] left-[30%] w-[50%] h-[50%] rounded-full bg-accent opacity-30 blur-[100px]" />
        </div>

        <div className="container-custom relative z-10 max-w-5xl text-center">
          <div className={`transition-all duration-1000 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-block bg-secondary/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-6 shadow-sm">
              AI-Powered Learning Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-balance">
              Learn Smarter with <span className="text-primary">MindQuest</span> AI
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty">
              Personalized learning experiences powered by artificial intelligence. 
              Master new skills with adaptive content tailored to your unique learning style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/login')}
                className="btn-primary flex items-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={() => navigate('/login')}
                className="btn-secondary"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Preview Image */}
        <div 
          className={`w-full max-w-5xl mx-auto mt-14 md:mt-20 px-4 transition-all duration-1000 delay-200 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
              alt="MindQuest AI Platform"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section (truncated for simplicity) */}
      <section className="py-20 px-4 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            Unlock the power of AI-based learning
          </h2>
          
          {/* Features would go here */}
        </div>
      </section>
    </div>
  );
};

export default Index;
