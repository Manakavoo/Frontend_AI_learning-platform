
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Menu, X, Home, BookOpen, BarChart3, Settings, 
  MessageSquare, Users, LogOut, BookMarked, BrainCircuit, FileText
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useMobile } from '../hooks/use-mobile';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isMobile = useMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Home', icon: <Home className="w-5 h-5" />, path: '/home' },
    { name: 'AI Tutor', icon: <BrainCircuit className="w-5 h-5" />, path: '/ai-tutor' },
    { name: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Community', icon: <Users className="w-5 h-5" />, path: '/community' },
    { name: 'Articles', icon: <FileText className="w-5 h-5" />, path: '/articles' },
    { name: 'Quiz', icon: <BookMarked className="w-5 h-5" />, path: '/quiz' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-foreground hover:bg-secondary"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="ml-2 font-bold text-lg text-primary">LearnAI</Link>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300 transform ${
        isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 border-b border-border flex items-center px-6 justify-between">
            <Link to="/" className="font-bold text-xl text-primary">LearnAI</Link>
            {isMobile && (
              <button 
                onClick={toggleSidebar}
                className="p-1.5 rounded-md text-foreground hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Nav Links */}
          <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => isMobile && setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary/80'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Logout button */}
          <div className="p-3 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg font-medium text-sm hover:bg-secondary transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
