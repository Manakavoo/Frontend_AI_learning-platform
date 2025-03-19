
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart, Settings, LogOut, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/home', name: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/dashboard', name: 'Dashboard', icon: <BarChart className="w-5 h-5" /> },
    { path: '/settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-xl font-medium">MindQuest AI</h1>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow-md animate-slide-down">
          <div className="flex flex-col py-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                  isActive(item.path) 
                    ? 'text-primary font-medium bg-secondary'
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 text-left text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:flex-col h-screen w-64 fixed top-0 left-0 bg-background border-r border-border shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-medium">MindQuest AI</h1>
          <p className="text-muted-foreground text-sm mt-1">AI learning platform</p>
        </div>

        <div className="flex-1 flex flex-col gap-1 px-3 py-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                isActive(item.path) 
                  ? 'text-primary font-medium bg-secondary'
                  : 'text-muted-foreground hover:bg-secondary/50'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="p-3 mt-auto border-t border-border">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
