
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { questionnaire } from '../data/sampleData';

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  
  const currentQuestion = questionnaire[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questionnaire.length) * 100;
  
  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      // In a real app, we would process the responses here
      console.log('Questionnaire completed with responses:', selectedOptions);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const isCurrentQuestionAnswered = !!selectedOptions[currentQuestion?.id];
  
  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
        <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 border border-border animate-scale-in text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-8">
            Your preferences have been saved. We're preparing a personalized learning experience for you.
          </p>
          <div className="animate-pulse mb-6">
            <div className="h-2 w-full bg-secondary rounded-full"></div>
          </div>
          <p className="text-sm text-muted-foreground">
            Redirecting you to the home page...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="max-w-xl w-full bg-card rounded-2xl shadow-lg p-8 border border-border animate-fade-in">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questionnaire.length}</h2>
            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">{currentQuestion.text}</h1>
        
        <div className="space-y-3 mb-10">
          {currentQuestion.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
              className={`w-full px-4 py-3 rounded-lg border text-left transition-all ${
                selectedOptions[currentQuestion.id] === option.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 hover:bg-secondary'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentQuestionIndex === 0
                ? 'text-muted-foreground cursor-not-allowed'
                : 'text-primary hover:bg-secondary'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered}
            className={`flex items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
              isCurrentQuestionAnswered
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex < questionnaire.length - 1 ? 'Next' : 'Complete'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
