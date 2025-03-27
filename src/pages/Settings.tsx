
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { useTheme } from '../contexts/ThemeContext';
import { User, Moon, Sun, Palette, Bell, Shield, LogOut } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  // Get user data from localStorage (as we're not using real auth)
  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || 'User');
  const [email, setEmail] = useState(() => localStorage.getItem('user_email') || 'user@example.com');
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    newCourses: false,
    learningReminders: true,
    communityActivity: false
  });

  useEffect(() => {
    // Try to get user data from local storage on component mount
    const storedName = localStorage.getItem('user_name');
    const storedEmail = localStorage.getItem('user_email');
    
    if (storedName) setUserName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        <div className="pt-16 md:pt-8 px-4 md:px-8 py-6 max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">Manage your account and preferences</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{userName}</h3>
                      <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2.5 rounded-lg text-foreground bg-primary/10 font-medium">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
                    Account Security
                  </button>
                  <button className="w-full text-left px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
                    Billing & Subscriptions
                  </button>
                  <button className="w-full text-left px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
                    Learning Preferences
                  </button>
                  <button className="w-full text-left px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
                    Connected Accounts
                  </button>
                </div>
                
                <div className="p-3 border-t border-border">
                  <button className="flex w-full items-center gap-3 px-4 py-2.5 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              {/* Profile Settings */}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-medium">Profile Settings</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Display Name</label>
                    <input
                      id="name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      id="bio"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="input-field resize-none"
                    ></textarea>
                  </div>
                  
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
              
              {/* Theme Settings */}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-medium">Theme Settings</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`aspect-video rounded-lg border ${
                        theme === 'light' 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      } p-4 text-center transition-all`}
                    >
                      <div className="bg-white rounded-md shadow-sm h-8 mb-2"></div>
                      <div className="flex items-center justify-center gap-2">
                        <Sun className="w-4 h-4" />
                        <span className="text-sm font-medium">Light</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setTheme('dark')}
                      className={`aspect-video rounded-lg border ${
                        theme === 'dark' 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      } p-4 text-center transition-all`}
                    >
                      <div className="bg-gray-900 rounded-md shadow-sm h-8 mb-2"></div>
                      <div className="flex items-center justify-center gap-2">
                        <Moon className="w-4 h-4" />
                        <span className="text-sm font-medium">Dark</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setTheme('blue')}
                      className={`aspect-video rounded-lg border ${
                        theme === 'blue' 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      } p-4 text-center transition-all`}
                    >
                      <div className="bg-blue-500 rounded-md shadow-sm h-8 mb-2"></div>
                      <div className="flex items-center justify-center gap-2">
                        <Palette className="w-4 h-4" />
                        <span className="text-sm font-medium">Blue</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Notification Settings */}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-medium">Notification Settings</h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Email Updates</h4>
                      <p className="text-sm text-muted-foreground">Receive updates about new features</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.emailUpdates}
                        onChange={() => handleNotificationChange('emailUpdates')}
                      />
                      <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t border-border">
                    <div>
                      <h4 className="font-medium">New Courses</h4>
                      <p className="text-sm text-muted-foreground">Get notified about new courses in your areas of interest</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.newCourses}
                        onChange={() => handleNotificationChange('newCourses')}
                      />
                      <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t border-border">
                    <div>
                      <h4 className="font-medium">Learning Reminders</h4>
                      <p className="text-sm text-muted-foreground">Receive reminders to continue your learning</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.learningReminders}
                        onChange={() => handleNotificationChange('learningReminders')}
                      />
                      <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t border-border">
                    <div>
                      <h4 className="font-medium">Community Activity</h4>
                      <p className="text-sm text-muted-foreground">Get notified about replies to your posts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.communityActivity}
                        onChange={() => handleNotificationChange('communityActivity')}
                      />
                      <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Security Settings */}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-medium">Security Settings</h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium mb-1">Current Password</label>
                    <input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium mb-1">New Password</label>
                    <input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="input-field"
                    />
                  </div>
                  
                  <button className="btn-primary">Update Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
