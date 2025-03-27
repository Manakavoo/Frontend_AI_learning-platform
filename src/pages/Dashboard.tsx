
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navigation from '../components/Navigation';
import { userProgress } from '../data/sampleData';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Format data for the time spent chart
  const timeSpentData = userProgress.recentActivities.map(activity => ({
    name: activity.date.split('-')[2], // Just show the day
    hours: activity.timeSpent
  })).reverse();

  // Data for the category distribution pie chart
  const categoryData = [
    { name: 'Machine Learning', value: 40 },
    { name: 'Programming', value: 25 },
    { name: 'Data Science', value: 20 },
    { name: 'Cloud Computing', value: 15 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Stats cards
  const stats = [
    { title: 'Watched Videos', value: 24, total: 45 },
    { title: 'Learning Hours', value: userProgress.totalHours, unit: 'hrs' },
    { title: 'Daily Streak', value: userProgress.streak, unit: 'days' },
    { title: 'Topics Explored', value: 12 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        {/* Header */}
        <header className="pt-16 md:pt-8 px-4 md:px-8 pb-6 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Your Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress</p>
          </div>
        </header>
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="animate-pulse space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-secondary h-32 rounded-xl"></div>
                  ))}
                </div>
                <div className="bg-secondary h-80 rounded-xl"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-secondary h-72 rounded-xl"></div>
                  <div className="bg-secondary h-72 rounded-xl"></div>
                </div>
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <h3 className="text-muted-foreground font-medium mb-2">{stat.title}</h3>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold">{stat.value}</span>
                        {stat.total && (
                          <span className="text-muted-foreground text-lg">/ {stat.total}</span>
                        )}
                        {stat.unit && (
                          <span className="text-muted-foreground text-lg">{stat.unit}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Weekly Time Spent Chart */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-6">
                  <h2 className="text-xl font-bold mb-6">Weekly Learning Activity</h2>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeSpentData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          label={{ value: 'Hours', angle: -90, position: 'insideLeft', offset: -5 }}
                        />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Additional Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Topic Distribution */}
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Learning Topics</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                      {userProgress.recentActivities.map((activity, index) => (
                        <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                          <div>
                            <h4 className="font-medium">{activity.course}</h4>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                          <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {activity.timeSpent} hours
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
