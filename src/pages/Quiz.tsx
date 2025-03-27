
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const Quiz: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string>('Machine Learning');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState<number>(0);

  const topics = [
    'Machine Learning',
    'Artificial Intelligence',
    'Data Science'
  ];

  // Sample quiz questions for different topics
  const questionSets: Record<string, Question[]> = {
    'Machine Learning': [
      {
        id: 1,
        text: 'What algorithm is used for classification tasks?',
        options: ['Linear Regression', 'K-Means', 'Decision Trees', 'Principal Component Analysis'],
        correctAnswer: 2
      },
      {
        id: 2,
        text: 'What does the "learning rate" control in gradient descent?',
        options: ['The size of steps taken during optimization', 'The number of iterations', 'The initial weights', 'The accuracy of predictions'],
        correctAnswer: 0
      },
      {
        id: 3,
        text: 'Which of these is an unsupervised learning algorithm?',
        options: ['Linear Regression', 'K-Means Clustering', 'Support Vector Machines', 'Random Forests'],
        correctAnswer: 1
      },
      {
        id: 4,
        text: 'What is overfitting?',
        options: ['When model performs too well on training data but poorly on new data', 'When model is too simple to capture patterns', 'When model runs too slowly', 'When dataset is too large'],
        correctAnswer: 0
      },
      {
        id: 5,
        text: 'What technique helps reduce overfitting?',
        options: ['Increasing model complexity', 'Using all available features', 'Regularization', 'Training for more epochs'],
        correctAnswer: 2
      }
    ],
    'Artificial Intelligence': [
      {
        id: 1,
        text: 'Which AI approach attempts to mimic human reasoning?',
        options: ['Neural Networks', 'Expert Systems', 'Reinforcement Learning', 'Generative Models'],
        correctAnswer: 1
      },
      {
        id: 2,
        text: 'What does NLP stand for in AI?',
        options: ['Neural Learning Process', 'New Learning Paradigm', 'Natural Language Processing', 'Network Learning Protocol'],
        correctAnswer: 2
      },
      {
        id: 3,
        text: 'What is the Turing Test used for?',
        options: ['Testing computer performance', 'Evaluating if AI can exhibit human-like intelligence', 'Measuring algorithm efficiency', 'Testing neural network architecture'],
        correctAnswer: 1
      },
      {
        id: 4,
        text: 'Which is NOT a common type of AI?',
        options: ['Narrow AI', 'General AI', 'Predictive AI', 'Super AI'],
        correctAnswer: 2
      },
      {
        id: 5,
        text: 'What is deep learning?',
        options: ['Learning from textbooks', 'A subset of machine learning using neural networks with many layers', 'Human-like learning', 'Learning from mistakes'],
        correctAnswer: 1
      }
    ],
    'Data Science': [
      {
        id: 1,
        text: 'What step typically comes first in a data science project?',
        options: ['Model Building', 'Data Cleaning', 'Data Collection', 'Deployment'],
        correctAnswer: 2
      },
      {
        id: 2,
        text: 'Which of these is NOT a common data visualization tool?',
        options: ['Tableau', 'Power BI', 'Excel', 'Assembly'],
        correctAnswer: 3
      },
      {
        id: 3,
        text: 'What does ETL stand for?',
        options: ['Extract, Transform, Load', 'Evaluate, Test, Learn', 'Enterprise Technology Layer', 'End-to-end Testing Logic'],
        correctAnswer: 0
      },
      {
        id: 4,
        text: 'Which technique is used to identify patterns in data?',
        options: ['Data Entry', 'Data Clustering', 'Data Storage', 'Data Migration'],
        correctAnswer: 1
      },
      {
        id: 5,
        text: 'What is the purpose of feature selection in data science?',
        options: ['To make datasets larger', 'To reduce dimensionality and improve model performance', 'To increase computational complexity', 'To create more features'],
        correctAnswer: 1
      }
    ]
  };

  const generateQuiz = () => {
    setIsLoading(true);
    setQuizStarted(false);
    setQuizCompleted(false);
    setAnswers(Array(5).fill(null));
    
    // Simulate API call to generate quiz
    setTimeout(() => {
      setQuestions(questionSets[currentTopic] || []);
      setIsLoading(false);
      setQuizStarted(true);
    }, 1000);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (quizCompleted) return;
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    if (answers.some(answer => answer === null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    // Calculate score
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setQuizCompleted(true);
  };

  const getFeedbackMessage = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage >= 80) {
      return "Excellent! You have a strong understanding of this topic.";
    } else if (percentage >= 60) {
      return "Good job! You're on the right track, but there's still room for improvement.";
    } else {
      return "You're making progress! Consider reviewing the topic material again to strengthen your knowledge.";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        <div className="pt-16 md:pt-8 px-4 md:px-8 py-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Learning Quiz</h1>
          <p className="text-muted-foreground mb-8">Test your knowledge and track your progress</p>
          
          {!quizStarted && !quizCompleted && !isLoading && (
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6">Generate a Quiz</h2>
              
              <div className="mb-6">
                <p className="font-medium mb-2">Select a topic:</p>
                <div className="flex flex-wrap gap-2">
                  {topics.map(topic => (
                    <button
                      key={topic}
                      onClick={() => setCurrentTopic(topic)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        currentTopic === topic
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={generateQuiz}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Generate Quiz
              </button>
              
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quiz Information</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Each quiz contains 5 questions based on your selected topic. 
                      Answer all questions and submit to see your score and feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="bg-card rounded-xl border border-border shadow-sm p-12 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <h2 className="text-xl font-medium">Generating Your Quiz...</h2>
              <p className="text-muted-foreground mt-2">
                Creating personalized questions based on {currentTopic}
              </p>
            </div>
          )}
          
          {quizStarted && !quizCompleted && (
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">{currentTopic} Quiz</h2>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {questions.length} Questions
                </span>
              </div>
              
              <div className="space-y-8 mb-8">
                {questions.map((question, questionIndex) => (
                  <div key={question.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm">
                        {questionIndex + 1}
                      </span>
                      <h3 className="font-medium">{question.text}</h3>
                    </div>
                    
                    <div className="space-y-2 ml-10">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            answers[questionIndex] === optionIndex
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                answers[questionIndex] === optionIndex
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary'
                              }`}
                            >
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleSubmitQuiz}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Submit Quiz
              </button>
            </div>
          )}
          
          {quizCompleted && (
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  {score >= 4 ? (
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  ) : score >= 2 ? (
                    <AlertCircle className="w-12 h-12 text-amber-500" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-500" />
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-1">Your Score: {score}/{questions.length}</h2>
                <p className="text-muted-foreground">{getFeedbackMessage()}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {questions.map((question, questionIndex) => (
                  <div 
                    key={question.id} 
                    className={`border rounded-lg p-4 ${
                      answers[questionIndex] === question.correctAnswer
                        ? 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/30'
                        : 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <div className="mt-0.5">
                        {answers[questionIndex] === question.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{question.text}</h3>
                        <div className="mt-2 space-y-1 text-sm">
                          <p className="text-green-700 dark:text-green-400">
                            <span className="font-semibold">Correct answer:</span> {question.options[question.correctAnswer]}
                          </p>
                          {answers[questionIndex] !== question.correctAnswer && (
                            <p className="text-red-700 dark:text-red-400">
                              <span className="font-semibold">Your answer:</span> {question.options[answers[questionIndex] as number]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setQuizStarted(false);
                    setQuizCompleted(false);
                  }}
                  className="flex-1 px-4 py-3 border border-border rounded-lg font-medium hover:bg-secondary/50 transition-colors"
                >
                  Try Another Topic
                </button>
                <button
                  onClick={generateQuiz}
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Retry Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
