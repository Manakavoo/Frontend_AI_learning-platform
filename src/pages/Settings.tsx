
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Bell, Globe, Moon, Sun, User, Lock, MailCheck, LogOut } from 'lucide-react';

interface SettingsOption {
  id: string;
  name: string;
  description: string;
  value: boolean;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  const [notificationSettings, setNotificationSettings] = useState<SettingsOption[]>([
    { id: 'new_videos', name: 'New Videos', description: 'Notify when new videos are added', value: true },
    { id: 'comments', name: 'Comments', description: 'Notify about new comments on your discussions', value: true },
    { id: 'updates', name: 'Course Updates', description: 'Notify about updates to your enrolled courses', value: false },
    { id: 'achievements', name: 'Achievements', description: 'Notify when you earn new achievements', value: true },
    { id: 'newsletter', name: 'Weekly Newsletter', description: 'Receive our weekly learning digest email', value: false }
  ]);
  
  const [appearanceSettings, setAppearanceSettings] = useState<SettingsOption[]>([
    { id: 'dark_mode', name: 'Dark Mode', description: 'Use dark theme across the platform', value: false },
    { id: 'reduced_motion', name: 'Reduced Motion', description: 'Reduce the amount of animations', value: false },
    { id: 'high_contrast', name: 'High Contrast', description: 'Increase contrast for better visibility', value: false }
  ]);
  
  const handleNotificationChange = (id: string) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  };
  
  const handleAppearanceChange = (id: string) => {
    setAppearanceSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        {/* Header */}
        <header className="pt-16 md:pt-8 px-4 md:px-8 pb-6 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </header>
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-card rounded-xl border border-border overflow-hidden">
                  <div className="divide-y divide-border">
                    <button
                      onClick={() => setActiveTab('account')}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                        activeTab === 'account' ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <User className="w-5 h-5" />
                      Account
                    </button>
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                        activeTab === 'notifications' ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <Bell className="w-5 h-5" />
                      Notifications
                    </button>
                    <button
                      onClick={() => setActiveTab('appearance')}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                        activeTab === 'appearance' ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <Sun className="w-5 h-5" />
                      Appearance
                    </button>
                    <button
                      onClick={() => setActiveTab('language')}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                        activeTab === 'language' ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <Globe className="w-5 h-5" />
                      Language
                    </button>
                    <button
                      onClick={() => setActiveTab('privacy')}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                        activeTab === 'privacy' ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <Lock className="w-5 h-5" />
                      Privacy
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                  {activeTab === 'account' && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center border-b border-border pb-6">
                          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl">
                            J
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">Profile Picture</h3>
                            <p className="text-sm text-muted-foreground mb-3">Upload a new profile picture</p>
                            <div className="flex gap-3">
                              <button className="btn-secondary">Upload</button>
                              <button className="text-sm text-muted-foreground hover:text-destructive">Remove</button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-b border-border pb-6 space-y-4">
                          <h3 className="font-medium">Personal Information</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Full Name</label>
                              <input
                                type="text"
                                defaultValue="John Doe"
                                className="input-field"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Username</label>
                              <input
                                type="text"
                                defaultValue="johndoe"
                                className="input-field"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <input
                              type="email"
                              defaultValue="john.doe@example.com"
                              className="input-field"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Bio</label>
                            <textarea
                              rows={3}
                              defaultValue="AI enthusiast and lifelong learner."
                              className="input-field"
                            />
                          </div>
                        </div>
                        
                        <div className="border-b border-border pb-6 space-y-4">
                          <h3 className="font-medium">Change Password</h3>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Current Password</label>
                            <input
                              type="password"
                              className="input-field"
                              placeholder="Enter your current password"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">New Password</label>
                              <input
                                type="password"
                                className="input-field"
                                placeholder="Enter new password"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Confirm New Password</label>
                              <input
                                type="password"
                                className="input-field"
                                placeholder="Confirm new password"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex justify-end gap-3">
                          <button className="btn-secondary">Cancel</button>
                          <button className="btn-primary">Save Changes</button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'notifications' && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="space-y-4">
                          {notificationSettings.map(setting => (
                            <div key={setting.id} className="flex items-center justify-between border-b border-border pb-4">
                              <div>
                                <h3 className="font-medium">{setting.name}</h3>
                                <p className="text-sm text-muted-foreground">{setting.description}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={setting.value}
                                  onChange={() => handleNotificationChange(setting.id)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-2 flex justify-end gap-3">
                          <button className="btn-secondary">Reset to Default</button>
                          <button className="btn-primary">Save Changes</button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'appearance' && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-bold mb-6">Appearance Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          <div className={`border rounded-xl p-4 cursor-pointer transition-all ${!appearanceSettings[0].value ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`}>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-medium">Light Mode</h3>
                              <Sun className="w-5 h-5" />
                            </div>
                            <div className="rounded-lg h-24 bg-card border border-border"></div>
                          </div>
                          
                          <div className={`border rounded-xl p-4 cursor-pointer transition-all ${appearanceSettings[0].value ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`}>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-medium">Dark Mode</h3>
                              <Moon className="w-5 h-5" />
                            </div>
                            <div className="rounded-lg h-24 bg-gray-800 border border-gray-700"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {appearanceSettings.map(setting => (
                            <div key={setting.id} className="flex items-center justify-between border-b border-border pb-4">
                              <div>
                                <h3 className="font-medium">{setting.name}</h3>
                                <p className="text-sm text-muted-foreground">{setting.description}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={setting.value}
                                  onChange={() => handleAppearanceChange(setting.id)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-2 flex justify-end gap-3">
                          <button className="btn-secondary">Reset to Default</button>
                          <button className="btn-primary">Save Changes</button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'language' && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-bold mb-6">Language Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Interface Language</label>
                          <select className="input-field">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="zh">中文</option>
                            <option value="ja">日本語</option>
                          </select>
                          <p className="text-sm text-muted-foreground mt-1">This will change the language of the user interface</p>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Content Language Preference</label>
                          <select className="input-field">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="zh">中文</option>
                            <option value="ja">日本語</option>
                          </select>
                          <p className="text-sm text-muted-foreground mt-1">We will prioritize content in this language when available</p>
                        </div>
                        
                        <div className="pt-2 flex justify-end gap-3">
                          <button className="btn-secondary">Reset to Default</button>
                          <button className="btn-primary">Save Changes</button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'privacy' && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-border pb-4">
                            <div>
                              <h3 className="font-medium">Learning Activity Visibility</h3>
                              <p className="text-sm text-muted-foreground">Allow others to see your learning progress</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={true}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between border-b border-border pb-4">
                            <div>
                              <h3 className="font-medium">Profile Discoverability</h3>
                              <p className="text-sm text-muted-foreground">Allow others to find your profile</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={true}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between border-b border-border pb-4">
                            <div>
                              <h3 className="font-medium">Data Collection</h3>
                              <p className="text-sm text-muted-foreground">Allow us to collect data to improve your experience</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={true}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="border-t border-border pt-6 space-y-4">
                          <h3 className="font-medium">Data Management</h3>
                          
                          <div className="space-y-3">
                            <button className="btn-secondary w-full flex items-center justify-center gap-2">
                              <MailCheck className="w-4 h-4" />
                              Manage Email Preferences
                            </button>
                            
                            <button className="w-full border border-border text-destructive hover:bg-destructive/5 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                              <LogOut className="w-4 h-4" />
                              Delete Account
                            </button>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex justify-end gap-3">
                          <button className="btn-secondary">Reset to Default</button>
                          <button className="btn-primary">Save Changes</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
