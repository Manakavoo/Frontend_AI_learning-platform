
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  author: string;
  description: string;
  createdAt: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "15:23",
    views: "12K",
    author: "AI Academy",
    description: "Learn the fundamentals of machine learning in this introductory video. We'll cover key concepts, algorithms, and practical applications.",
    createdAt: "2023-09-15",
    category: "Machine Learning"
  },
  {
    id: "2",
    title: "Data Structures Explained",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "23:45",
    views: "8.5K",
    author: "Code Masters",
    description: "A comprehensive guide to understanding data structures. Learn about arrays, linked lists, trees, and more in this detailed tutorial.",
    createdAt: "2023-10-02",
    category: "Programming"
  },
  {
    id: "3",
    title: "Neural Networks Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "42:18",
    views: "15.3K",
    author: "AI Academy",
    description: "Dive deep into neural networks. This video covers architectures, training methods, and implementing neural networks in Python.",
    createdAt: "2023-08-28",
    category: "Deep Learning"
  },
  {
    id: "4",
    title: "Python for Data Science",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "31:42",
    views: "21K",
    author: "Data Science Experts",
    description: "Learn how to use Python for data science. This tutorial covers pandas, numpy, matplotlib, and essential data analysis techniques.",
    createdAt: "2023-09-22",
    category: "Data Science"
  },
  {
    id: "5",
    title: "Modern Web Development",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    duration: "28:15",
    views: "11.7K",
    author: "Web Wizards",
    description: "Explore modern web development frameworks and tools. This video covers React, Node.js, and best practices for building responsive applications.",
    createdAt: "2023-10-08",
    category: "Web Development"
  },
  {
    id: "6",
    title: "Advanced SQL Techniques",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "19:54",
    views: "7.2K",
    author: "Database Masters",
    description: "Master advanced SQL techniques for database optimization. Learn about complex queries, indexing, and performance tuning.",
    createdAt: "2023-09-05",
    category: "Databases"
  },
  {
    id: "7",
    title: "Intro to Natural Language Processing",
    thumbnail: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    duration: "35:27",
    views: "9.3K",
    author: "AI Academy",
    description: "Get started with Natural Language Processing (NLP). This introduction covers tokenization, sentiment analysis, and building simple NLP applications.",
    createdAt: "2023-08-17",
    category: "NLP"
  },
  {
    id: "8",
    title: "Cloud Computing Essentials",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    duration: "26:33",
    views: "6.8K",
    author: "Cloud Experts",
    description: "Learn the essentials of cloud computing. This video introduces key concepts, service models, and major cloud providers like AWS, Azure, and GCP.",
    createdAt: "2023-10-12",
    category: "Cloud Computing"
  }
];

export const categories: Category[] = [
  { id: "1", name: "Machine Learning", count: 24 },
  { id: "2", name: "Programming", count: 42 },
  { id: "3", name: "Deep Learning", count: 18 },
  { id: "4", name: "Data Science", count: 31 },
  { id: "5", name: "Web Development", count: 37 },
  { id: "6", name: "Databases", count: 15 },
  { id: "7", name: "NLP", count: 12 },
  { id: "8", name: "Cloud Computing", count: 22 }
];

export const recommendedSearches = [
  "Machine Learning basics",
  "Python tutorials",
  "React JS introduction",
  "Data Science projects",
  "Neural networks explained",
  "Cloud computing for beginners"
];

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export const questionnaire: Question[] = [
  {
    id: "1",
    text: "What is your primary goal for using our platform?",
    options: [
      { id: "1a", text: "Learn new skills" },
      { id: "1b", text: "Advance my career" },
      { id: "1c", text: "Academic purposes" },
      { id: "1d", text: "Personal interest" }
    ]
  },
  {
    id: "2",
    text: "What is your current expertise level in AI and data science?",
    options: [
      { id: "2a", text: "Beginner" },
      { id: "2b", text: "Intermediate" },
      { id: "2c", text: "Advanced" },
      { id: "2d", text: "Expert" }
    ]
  },
  {
    id: "3",
    text: "Which areas are you most interested in learning about?",
    options: [
      { id: "3a", text: "Machine Learning" },
      { id: "3b", text: "Deep Learning" },
      { id: "3c", text: "Natural Language Processing" },
      { id: "3d", text: "Computer Vision" }
    ]
  },
  {
    id: "4",
    text: "How much time can you dedicate to learning each week?",
    options: [
      { id: "4a", text: "Less than 2 hours" },
      { id: "4b", text: "2-5 hours" },
      { id: "4c", text: "5-10 hours" },
      { id: "4d", text: "More than 10 hours" }
    ]
  },
  {
    id: "5",
    text: "What is your preferred learning style?",
    options: [
      { id: "5a", text: "Video tutorials" },
      { id: "5b", text: "Interactive exercises" },
      { id: "5c", text: "Reading documentation" },
      { id: "5d", text: "Project-based learning" }
    ]
  }
];

export const userProgress = {
  completedCourses: 4,
  totalCourses: 12,
  totalHours: 26.5,
  streak: 8,
  certificates: 2,
  recentActivities: [
    { date: "2023-10-14", course: "Neural Networks Fundamentals", timeSpent: 1.5 },
    { date: "2023-10-13", course: "Python for Data Science", timeSpent: 0.75 },
    { date: "2023-10-12", course: "Introduction to Machine Learning", timeSpent: 2.0 },
    { date: "2023-10-11", course: "Data Structures Explained", timeSpent: 1.25 },
    { date: "2023-10-10", course: "Neural Networks Fundamentals", timeSpent: 1.0 }
  ]
};
