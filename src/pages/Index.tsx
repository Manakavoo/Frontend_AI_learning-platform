
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, ChartLine } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);


  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Adaptive Learning",
      description: "AI-powered system adapts to your learning style and pace for optimal results.",
      icon: <Brain className="text-primary w-6 h-6" />
    },
    {
      title: "Smart Content",
      description: "Curated content and resources that match your learning objectives.",
      icon: <BookOpen className="text-primary w-6 h-6" />
    },
    {
      title: "Progress Tracking",
      description: "Detailed analytics and insights to monitor your learning journey.",
      icon: <ChartLine className="text-primary w-6 h-6" />
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your free account to get started with personalized learning."
    },
    {
      number: 2,
      title: "Assessment",
      description: "Take a quick assessment so our AI can understand your learning style."
    },
    {
      number: 3,
      title: "Start Learning",
      description: "Follow your personalized learning path and track your progress."
    }
  ];

  const testimonials = [
    {
      quote: "LearnAI has transformed how I approach learning new skills. The personalized approach helped me master concepts I struggled with for years.",
      name: "Sarah Johnson",
      role: "Software Developer"
    },
    {
      quote: "As an educator, I'm impressed by how LearnAI adapts to different learning styles. My students have shown remarkable improvement.",
      name: "Michael Rodriguez",
      role: "Professor"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">LearnAI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-primary">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary">Courses</a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary">Developers</a>
              {/* <a href="#pricing" className="text-gray-700 hover:text-primary">Pricing</a> */}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-primary hover:text-primary/80">Login</button>
              <button onClick={() => navigate('/signup')} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Sign Up</button>
            </div>
            <div className="md:hidden">
              {/* <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button> */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                      className="text-gray-700"
                      aria-label="Toggle mobile menu"
                      aria-expanded={mobileMenuOpen ? "true" : "false"} // Converts boolean to "true"/"false"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                </button>

            </div>
          </div>
        </div>
        
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-primary">Features</a>
            <a href="#courses" className="block px-3 py-2 text-gray-700 hover:text-primary">Working</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-primary">Developers</a>
            {/* <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-primary">Pricing</a> */}
            <button onClick={() => navigate('/login')} className="block w-full px-3 py-2 text-left text-gray-700 hover:text-primary">Login</button>
            <button onClick={() => navigate('/login')} className="block w-full px-3 py-2 text-left text-white bg-primary rounded-lg hover:bg-primary/90">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 pt-32">
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
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Learn Smarter with <span className="text-primary">Learn</span>AI
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Our AI-driven system creates personalized learning paths just for you!
              Master new skills with adaptive content tailored to your unique learning style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/login')}
                className="btn-primary flex items-center gap-2 group"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={() => navigate('/login')}
                className="btn-secondary"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        
        {/* Preview Image */}
        <div 
          className={`w-full max-w-5xl mx-auto mt-14 md:mt-20 px-4 transition-all duration-1000 delay-200 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            {/* <img
              src="/api/placeholder/800/450"
              alt="Learn AI Platform"
              className="w-full h-auto"
            /> */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LearnAI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-1/2 h-0.5 bg-gray-300 transform -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className={`transition-all duration-1000 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="text-4xl font-bold text-white mb-2">100+</h3>
              <p className="text-blue-100">Active Students</p>
            </div>
            <div className={`transition-all duration-1000 delay-200 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
              <p className="text-blue-100">Courses Available</p>
            </div>
            <div className={`transition-all duration-1000 delay-400 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="text-4xl font-bold text-white mb-2">4.9/5</h3>
              <p className="text-blue-100">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Journey?</h2>
          <p className="text-xl mb-8">Join 10,000+ learners advancing their careers with AI-powered education</p>
          <button 
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-white text-primary hover:bg-gray-100 rounded-lg font-medium text-lg transition-colors"
          >
            Start Learning for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Courses</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-4">Get the latest updates and learning resources delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <button className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;