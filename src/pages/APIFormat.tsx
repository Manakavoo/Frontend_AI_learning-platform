
import React from 'react';
import Navigation from '../components/Navigation';
import { Copy, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const APIFormat: React.FC = () => {
  const { toast } = useToast();
  const [copiedVideo, setCopiedVideo] = React.useState(false);
  const [copiedTutor, setCopiedTutor] = React.useState(false);

  const copyToClipboard = (text: string, type: 'video' | 'tutor') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'video') {
        setCopiedVideo(true);
        setTimeout(() => setCopiedVideo(false), 2000);
      } else {
        setCopiedTutor(true);
        setTimeout(() => setCopiedTutor(false), 2000);
      }
      
      toast({
        title: "Copied to clipboard",
        description: "API format has been copied to your clipboard.",
      });
    });
  };

  const videoChatRequest = `{
  "message": "What is this video explaining about neural networks?",
  "history": [
    {
      "role": "user",
      "content": "Can you explain the parts of a neuron?"
    },
    {
      "role": "assistant",
      "content": "A neuron in artificial neural networks consists of inputs, weights, a bias, a summation function, and an activation function..."
    }
  ],
  "videoContext": {
    "id": "dZh_ps8Icm4",
    "title": "Neural Networks Explained",
    "description": "A detailed look at how neural networks function"
  },
  "timestamp": "10:45"
}`;

  const videoChatResponse = `{
  "response": "At 10:45 in the video on Neural Networks Explained, the presenter is discussing the backpropagation algorithm which is essential for training neural networks. This is the process by which the network adjusts its weights based on the error in predictions...",
  "conversationId": "conv_12345"
}`;

  const tutorChatRequest = `{
  "message": "Can you create a roadmap for learning data science?",
  "history": [
    {
      "role": "user",
      "content": "What skills do I need for data science?"
    },
    {
      "role": "assistant",
      "content": "Data science requires skills in programming (Python/R), statistics, machine learning, data visualization, and domain knowledge..."
    }
  ]
}`;

  const tutorChatResponse = `{
  "response": "Here's a comprehensive roadmap for learning data science:\\n\\n1. **Fundamentals (2-3 months)**\\n   - Learn Python basics\\n   - Statistics fundamentals\\n   - Mathematics (linear algebra, calculus)\\n   - SQL basics\\n\\n2. **Data Analysis (2 months)**\\n   - Pandas, NumPy\\n   - Data cleaning techniques\\n   - Exploratory data analysis\\n   - Data visualization (Matplotlib, Seaborn)\\n\\n3. **Machine Learning (3-4 months)**\\n   - Supervised learning algorithms\\n   - Unsupervised learning\\n   - Model evaluation\\n   - Feature engineering\\n\\n4. **Specialized Topics (2-3 months)**\\n   - Deep learning fundamentals\\n   - Natural language processing\\n   - Big data tools\\n   - Cloud platforms\\n\\n5. **Projects & Portfolio (Ongoing)**\\n   - Start with guided projects\\n   - Progress to independent projects\\n   - Build a GitHub portfolio\\n\\nWould you like me to elaborate on any specific part of this roadmap?",
  "conversationId": "conv_67890"
}`;

  const getConversationsResponse = `{
  "conversations": [
    {
      "id": "conv_12345",
      "title": "Neural Networks Discussion",
      "updatedAt": "2023-07-15T14:23:10Z"
    },
    {
      "id": "conv_67890",
      "title": "Data Science Roadmap",
      "updatedAt": "2023-07-12T09:45:22Z"
    }
  ]
}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        <div className="pt-16 md:pt-8 px-4 md:px-8 py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">API Format Documentation</h1>
          <p className="text-muted-foreground mb-6">Reference for implementing backend API endpoints</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Video Chat API */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-secondary/50 border-b border-border">
                <h2 className="text-xl font-bold">Video Chat API</h2>
                <p className="text-sm text-muted-foreground">Endpoint: /openai</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Request Format</h3>
                    <button 
                      onClick={() => copyToClipboard(videoChatRequest, 'video')}
                      className="text-primary hover:text-primary/80 p-1"
                    >
                      {copiedVideo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {videoChatRequest}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Response Format</h3>
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {videoChatResponse}
                  </pre>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-2">Field Descriptions</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>message</strong>: The user's input text</li>
                    <li><strong>history</strong>: Array of previous messages in the conversation</li>
                    <li><strong>videoContext</strong>: Information about the video being discussed</li>
                    <li><strong>timestamp</strong>: Current time position in the video</li>
                    <li><strong>response</strong>: AI-generated response to the user's query</li>
                    <li><strong>conversationId</strong>: Unique identifier for the conversation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* AI Tutor API */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-secondary/50 border-b border-border">
                <h2 className="text-xl font-bold">AI Tutor API</h2>
                <p className="text-sm text-muted-foreground">Endpoint: /tutor</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Request Format</h3>
                    <button 
                      onClick={() => copyToClipboard(tutorChatRequest, 'tutor')}
                      className="text-primary hover:text-primary/80 p-1"
                    >
                      {copiedTutor ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {tutorChatRequest}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Response Format</h3>
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {tutorChatResponse}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">List Conversations Endpoint</h3>
                  <p className="text-sm text-muted-foreground mb-2">GET /tutor/conversations</p>
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {getConversationsResponse}
                  </pre>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-2">Field Descriptions</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>message</strong>: The user's input text</li>
                    <li><strong>history</strong>: Array of previous messages in the conversation</li>
                    <li><strong>response</strong>: AI-generated response to the user's query</li>
                    <li><strong>conversationId</strong>: Unique identifier for the conversation</li>
                    <li><strong>conversations</strong>: Array of conversation objects in the list response</li>
                    <li><strong>title</strong>: Title of the conversation</li>
                    <li><strong>updatedAt</strong>: ISO 8601 timestamp of last update</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIFormat;
