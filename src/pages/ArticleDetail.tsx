
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Bookmark, Share, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  topic: string;
  image: string;
}

// This would normally come from an API
const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Understanding Machine Learning: A Beginner's Guide',
    excerpt: 'Demystifying machine learning concepts and techniques for beginners with practical examples and implementations.',
    content: `
      # Understanding Machine Learning: A Beginner's Guide

      Machine learning has become one of the most transformative technologies of our time. It powers everything from recommendation systems on streaming platforms to voice assistants and self-driving cars. But what exactly is machine learning, and how does it work?

      ## What is Machine Learning?

      At its core, machine learning is a subset of artificial intelligence that focuses on building systems that can learn from data. Unlike traditional programming where developers write explicit instructions for every task, machine learning algorithms are designed to improve their performance through experience.

      Machine learning systems learn patterns from data without being explicitly programmed. This capability makes them incredibly valuable for solving complex problems where writing rules by hand would be impractical or impossible.

      ## Types of Machine Learning

      There are three main types of machine learning:

      ### 1. Supervised Learning

      In supervised learning, algorithms learn from labeled data. This means each example in the training dataset comes with the correct answer. The algorithm's task is to learn a mapping function that can predict the output when given new input data.

      Common supervised learning tasks include:
      
      - Classification: Predicting a category (e.g., spam detection, image recognition)
      - Regression: Predicting a continuous value (e.g., house prices, temperature forecasting)

      ### 2. Unsupervised Learning

      Unsupervised learning deals with unlabeled data. The algorithm must find patterns and relationships within the data without any guidance.

      Common unsupervised learning tasks include:
      
      - Clustering: Grouping similar data points together
      - Dimensionality reduction: Simplifying data while preserving important information
      - Anomaly detection: Identifying unusual data points

      ### 3. Reinforcement Learning

      Reinforcement learning involves an agent learning to make decisions by taking actions in an environment to maximize some notion of cumulative reward.

      Examples include game-playing AI systems and robotics applications.

      ## The Machine Learning Process

      A typical machine learning project follows these steps:

      1. **Data Collection**: Gathering relevant data for your problem.
      2. **Data Preparation**: Cleaning, preprocessing, and transforming raw data.
      3. **Feature Engineering**: Selecting and creating the most informative features.
      4. **Model Selection**: Choosing the appropriate algorithm for your problem.
      5. **Training**: Teaching the model using your training data.
      6. **Evaluation**: Assessing model performance on unseen data.
      7. **Deployment**: Integrating the model into a production system.

      ## Common Machine Learning Algorithms

      Several algorithms form the foundation of machine learning:

      - **Linear Regression**: For predicting continuous values
      - **Logistic Regression**: For binary classification problems
      - **Decision Trees**: Tree-like models for classification and regression
      - **Random Forest**: Ensemble of decision trees
      - **Support Vector Machines**: Powerful classifiers with a mathematical foundation
      - **k-Nearest Neighbors**: Classification based on similarity
      - **Neural Networks**: Deep learning models inspired by the human brain

      ## Challenges in Machine Learning

      Despite its power, machine learning faces several challenges:

      - **Data Quality**: Models are only as good as the data they learn from
      - **Overfitting**: Models that perform well on training data but poorly on new data
      - **Interpretability**: Complex models like neural networks can be "black boxes"
      - **Ethical Concerns**: Issues like bias, privacy, and fairness

      ## Getting Started with Machine Learning

      If you're interested in diving into machine learning, consider these steps:

      1. Learn the fundamentals of programming in Python
      2. Study statistics and probability
      3. Master libraries like scikit-learn, TensorFlow, or PyTorch
      4. Start with simple projects and datasets
      5. Join machine learning communities and competitions

      Machine learning continues to evolve rapidly, with new techniques and applications emerging constantly. By understanding the basics outlined here, you've taken the first step in an exciting journey into one of technology's most dynamic fields.
    `,
    author: 'Dr. Emily Chen',
    publishedAt: '2023-05-15',
    readTime: '8 min',
    topic: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: '2',
    title: 'The Future of Data Science: Trends to Watch',
    excerpt: 'Exploring emerging trends in data science that are shaping the future of the field and creating new opportunities.',
    content: `
      # The Future of Data Science: Trends to Watch

      Data science continues to evolve at a rapid pace, transforming industries and creating new possibilities. As organizations increasingly rely on data-driven decision making, understanding the emerging trends in this field becomes crucial for professionals and businesses alike.

      ## The Evolution of Data Science

      Data science has come a long way from its early days of basic statistical analysis. Today, it encompasses a broad range of disciplines including statistics, computer science, domain expertise, and increasingly, specialized AI techniques. This evolution has been driven by the exponential growth in data generation, computational power, and algorithmic innovations.

      ## Key Trends Shaping the Future

      ### 1. AutoML (Automated Machine Learning)

      AutoML is democratizing data science by automating the process of applying machine learning to real-world problems. These tools handle everything from feature engineering to model selection and hyperparameter tuning, making machine learning accessible to non-specialists.

      As AutoML platforms mature, we can expect:
      - More sophisticated model architectures being automatically discovered
      - Domain-specific AutoML solutions for healthcare, finance, etc.
      - Integration with existing business intelligence tools

      ### 2. Edge AI and Federated Learning

      The need to process data locally on devices rather than in centralized data centers is driving the development of Edge AI. This approach:
      - Reduces latency for time-sensitive applications
      - Enhances privacy by keeping data on local devices
      - Decreases bandwidth requirements and cloud computing costs

      Federated learning, a technique that trains algorithms across multiple decentralized devices without exchanging data, is becoming increasingly important for privacy-preserving AI development.

      ### 3. Explainable AI (XAI)

      As AI systems make more critical decisions, the "black box" nature of complex models becomes problematic. Explainable AI focuses on creating models whose decisions can be understood and interpreted by humans. This is particularly important in regulated industries like healthcare and finance.

      XAI techniques are advancing to provide:
      - Visual explanations of model decisions
      - Natural language explanations of AI reasoning
      - Tools to identify and mitigate bias in models

      ### 4. Synthetic Data Generation

      Data privacy regulations and the difficulty of obtaining labeled data are driving interest in synthetic data generation. Using techniques like generative adversarial networks (GANs), organizations can create artificial datasets that:
      - Maintain the statistical properties of real data
      - Don't contain personally identifiable information
      - Can be generated in quantities impossible to collect naturally

      ### 5. MLOps (Machine Learning Operations)

      As machine learning becomes mission-critical for businesses, MLOps practices are evolving to manage the full lifecycle of ML systems:
      - Version control for data, code, and models
      - Automated testing and deployment pipelines
      - Model monitoring and maintenance in production
      - Governance frameworks for responsible AI deployment

      ### 6. Graph Neural Networks and Relational Learning

      Traditional machine learning excels at tabular, image, or sequential data, but many real-world problems involve complex relationships between entities. Graph neural networks are emerging as powerful tools for:
      - Social network analysis
      - Drug discovery
      - Fraud detection
      - Recommendation systems

      ### 7. Multi-modal Learning

      The ability to learn from different types of data simultaneously (text, images, audio, etc.) is advancing rapidly. Multi-modal models can:
      - Generate images from text descriptions
      - Create text from images
      - Understand video content holistically
      - Find connections between different data types

      ## Implications for Data Scientists

      These trends have significant implications for data science professionals:

      1. **Broader skill requirements**: Beyond statistics and programming, skills in areas like MLOps, ethics, and domain expertise are becoming essential.
      
      2. **Increased specialization**: As the field expands, specializing in areas like NLP, computer vision, or reinforcement learning may become necessary.
      
      3. **Focus shift from model building to problem-solving**: With AutoML handling routine tasks, the value of data scientists will increasingly lie in problem formulation and business integration.
      
      4. **Ethical considerations**: Understanding bias, fairness, and privacy will be as important as technical skills.

      ## Challenges on the Horizon

      Despite the exciting developments, several challenges remain:

      - **Data quality issues**: As data volumes grow, ensuring quality becomes more difficult.
      - **Talent shortage**: Demand for skilled professionals continues to outpace supply.
      - **Integration with legacy systems**: Many organizations struggle to integrate modern data science tools with existing infrastructure.
      - **Regulatory compliance**: Navigating the evolving landscape of data privacy regulations globally.

      ## Preparing for the Future

      Organizations and professionals can prepare for these trends by:

      1. Investing in cloud infrastructure and data platforms that support modern data science workflows
      2. Developing clear ethical guidelines for AI development and deployment
      3. Creating cross-functional teams that combine technical expertise with domain knowledge
      4. Implementing continuous learning programs to keep skills current

      The future of data science promises both exciting possibilities and complex challenges. By staying aware of emerging trends and developing the right capabilities, organizations and professionals can harness the full potential of data science to drive innovation and create value.
    `,
    author: 'Michael Roberts',
    publishedAt: '2023-06-22',
    readTime: '10 min',
    topic: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: '3',
    title: 'Deep Learning: From Theory to Practice',
    excerpt: 'A comprehensive look at deep learning applications and how to implement them effectively in real-world scenarios.',
    content: `
      # Deep Learning: From Theory to Practice

      Deep learning has revolutionized artificial intelligence, enabling remarkable advances in computer vision, natural language processing, and many other domains. This article bridges the gap between theoretical understanding and practical implementation of deep learning systems.

      ## Understanding Deep Learning Fundamentals

      At its core, deep learning is a subset of machine learning that uses neural networks with multiple layers (hence "deep") to progressively extract higher-level features from raw input. For example, in image recognition, lower layers might identify edges, while higher layers recognize more complex patterns like faces or objects.

      ### The Building Blocks: Neural Networks

      Neural networks consist of:

      - **Neurons**: Computational units that apply an activation function to weighted inputs
      - **Layers**: Collections of neurons (input, hidden, and output layers)
      - **Weights and biases**: Parameters adjusted during training
      - **Activation functions**: Non-linear functions that introduce complexity (ReLU, sigmoid, tanh)
      - **Loss functions**: Measures of prediction error used to guide training

      ### Key Deep Learning Architectures

      Several neural network architectures have proven particularly effective:

      1. **Convolutional Neural Networks (CNNs)**: Specialized for processing grid-like data such as images.
      
      2. **Recurrent Neural Networks (RNNs)**: Designed for sequential data with memory capabilities.
      
      3. **Long Short-Term Memory (LSTM)**: A type of RNN that solves the vanishing gradient problem.
      
      4. **Transformers**: Attention-based models that have revolutionized NLP and are expanding to other domains.
      
      5. **Generative Adversarial Networks (GANs)**: Two networks competing to generate realistic data.

      ## Moving from Theory to Practice

      Translating theoretical understanding into working implementations requires several considerations:

      ### 1. Problem Formulation

      Before writing any code, clearly define:
      - The exact problem you're solving
      - Available data sources
      - Performance metrics
      - Deployment constraints

      ### 2. Data Preparation

      Successful deep learning depends heavily on data quality:
      - **Collection**: Gathering diverse, representative data
      - **Cleaning**: Handling missing values, outliers, and errors
      - **Preprocessing**: Normalization, augmentation, tokenization
      - **Splitting**: Creating training, validation, and test sets

      ### 3. Model Selection and Design

      Choose appropriate architectures based on:
      - Data type (images, text, time series, etc.)
      - Available computational resources
      - Performance requirements
      - Interpretability needs

      ### 4. Training Process

      Effective training requires:
      - **Hyperparameter tuning**: Learning rate, batch size, network depth
      - **Regularization techniques**: Dropout, batch normalization, weight decay
      - **Training monitoring**: Learning curves, validation metrics
      - **Hardware acceleration**: GPUs, TPUs, distributed training

      ### 5. Evaluation and Iteration

      Thoroughly evaluate models using:
      - Multiple metrics relevant to your domain
      - Error analysis to understand failure modes
      - Comparison against baselines and state-of-the-art
      - Ablation studies to understand component contributions

      ### 6. Deployment Considerations

      Production deployment introduces new challenges:
      - **Model optimization**: Quantization, pruning, distillation
      - **Serving infrastructure**: APIs, batch processing, streaming
      - **Monitoring**: Drift detection, performance tracking
      - **Update strategy**: How to retrain and deploy new versions

      ## Practical Implementation Guide

      Let's explore how to implement a deep learning solution for image classification using PyTorch:

      ### Setting Up the Environment

      ```python
      # Install necessary packages
      # pip install torch torchvision matplotlib numpy

      import torch
      import torch.nn as nn
      import torch.optim as optim
      import torchvision
      import torchvision.transforms as transforms
      import matplotlib.pyplot as plt
      import numpy as np
      ```

      ### Data Preparation

      ```python
      # Define transformations
      transform = transforms.Compose([
          transforms.Resize((224, 224)),
          transforms.ToTensor(),
          transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
      ])

      # Load dataset
      trainset = torchvision.datasets.CIFAR10(root='./data', train=True,
                                             download=True, transform=transform)
      trainloader = torch.utils.data.DataLoader(trainset, batch_size=32,
                                               shuffle=True, num_workers=2)

      testset = torchvision.datasets.CIFAR10(root='./data', train=False,
                                            download=True, transform=transform)
      testloader = torch.utils.data.DataLoader(testset, batch_size=32,
                                              shuffle=False, num_workers=2)
      ```

      ### Model Architecture

      ```python
      # Define CNN model
      class SimpleCNN(nn.Module):
          def __init__(self):
              super(SimpleCNN, self).__init__()
              self.conv1 = nn.Conv2d(3, 16, 3, padding=1)
              self.conv2 = nn.Conv2d(16, 32, 3, padding=1)
              self.conv3 = nn.Conv2d(32, 64, 3, padding=1)
              self.pool = nn.MaxPool2d(2, 2)
              self.fc1 = nn.Linear(64 * 28 * 28, 512)
              self.fc2 = nn.Linear(512, 10)
              self.dropout = nn.Dropout(0.25)
              self.relu = nn.ReLU()

          def forward(self, x):
              x = self.pool(self.relu(self.conv1(x)))
              x = self.pool(self.relu(self.conv2(x)))
              x = self.pool(self.relu(self.conv3(x)))
              x = x.view(-1, 64 * 28 * 28)
              x = self.dropout(self.relu(self.fc1(x)))
              x = self.fc2(x)
              return x

      # Initialize model
      model = SimpleCNN()
      device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
      model.to(device)
      ```

      ### Training Loop

      ```python
      # Define loss function and optimizer
      criterion = nn.CrossEntropyLoss()
      optimizer = optim.Adam(model.parameters(), lr=0.001)

      # Training function
      def train_model(model, criterion, optimizer, num_epochs=10):
          train_losses = []
          val_losses = []
          
          for epoch in range(num_epochs):
              # Training phase
              model.train()
              running_loss = 0.0
              for i, data in enumerate(trainloader, 0):
                  inputs, labels = data[0].to(device), data[1].to(device)
                  
                  optimizer.zero_grad()
                  outputs = model(inputs)
                  loss = criterion(outputs, labels)
                  loss.backward()
                  optimizer.step()
                  
                  running_loss += loss.item()
              
              epoch_train_loss = running_loss / len(trainloader)
              train_losses.append(epoch_train_loss)
              
              # Validation phase
              model.eval()
              val_loss = 0.0
              with torch.no_grad():
                  for data in testloader:
                      inputs, labels = data[0].to(device), data[1].to(device)
                      outputs = model(inputs)
                      loss = criterion(outputs, labels)
                      val_loss += loss.item()
              
              epoch_val_loss = val_loss / len(testloader)
              val_losses.append(epoch_val_loss)
              
              print(f'Epoch {epoch+1}/{num_epochs}, Train Loss: {epoch_train_loss:.4f}, Val Loss: {epoch_val_loss:.4f}')
          
          return train_losses, val_losses

      # Train the model
      train_losses, val_losses = train_model(model, criterion, optimizer, num_epochs=10)
      ```

      ### Evaluation

      ```python
      # Evaluate model accuracy
      correct = 0
      total = 0
      model.eval()
      with torch.no_grad():
          for data in testloader:
              images, labels = data[0].to(device), data[1].to(device)
              outputs = model(images)
              _, predicted = torch.max(outputs.data, 1)
              total += labels.size(0)
              correct += (predicted == labels).sum().item()

      print(f'Accuracy on test images: {100 * correct / total:.2f}%')
      ```

      ### Visualization

      ```python
      # Visualize training progress
      plt.figure(figsize=(10, 5))
      plt.plot(train_losses, label='Training Loss')
      plt.plot(val_losses, label='Validation Loss')
      plt.xlabel('Epochs')
      plt.ylabel('Loss')
      plt.legend()
      plt.title('Training and Validation Loss')
      plt.show()
      ```

      ### Deployment Preparation

      ```python
      # Save the model
      torch.save(model.state_dict(), 'cifar_model.pth')

      # Function to load and use the model
      def load_model():
          model = SimpleCNN()
          model.load_state_dict(torch.load('cifar_model.pth'))
          model.eval()
          return model

      # Example inference function
      def predict(model, image_path):
          transform = transforms.Compose([
              transforms.Resize((224, 224)),
              transforms.ToTensor(),
              transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
          ])
          
          image = Image.open(image_path)
          image = transform(image).unsqueeze(0)
          
          with torch.no_grad():
              outputs = model(image)
              _, predicted = torch.max(outputs, 1)
              
          return predicted.item()
      ```

      ## Common Challenges and Solutions

      ### Challenge 1: Overfitting

      **Solutions:**
      - More training data or data augmentation
      - Regularization techniques (dropout, L1/L2)
      - Early stopping based on validation performance
      - Simpler model architecture

      ### Challenge 2: Vanishing/Exploding Gradients

      **Solutions:**
      - Batch normalization
      - Residual connections (skip connections)
      - Appropriate weight initialization
      - Gradient clipping

      ### Challenge 3: Hardware Limitations

      **Solutions:**
      - Mixed precision training
      - Model quantization
      - Knowledge distillation to smaller models
      - Efficient architectures (MobileNet, EfficientNet)

      ### Challenge 4: Production Integration

      **Solutions:**
      - ONNX format for framework interoperability
      - TorchServe or TensorFlow Serving
      - Model versioning and A/B testing
      - Model monitoring for drift

      ## Conclusion

      The journey from deep learning theory to practice involves multiple stages, each with its own challenges and best practices. By following a structured approach to problem definition, data preparation, model development, and deployment, you can successfully apply deep learning to solve real-world problems.

      As the field continues to advance, staying up-to-date with the latest research and tools while maintaining a solid understanding of fundamentals will be key to success in deep learning applications.
    `,
    author: 'Dr. James Wilson',
    publishedAt: '2023-07-05',
    readTime: '15 min',
    topic: 'Deep Learning',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80'
  }
];

// Simple Markdown rendering (very basic)
const renderMarkdown = (content: string) => {
  let html = content;
  
  // Headers
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>');
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Lists
  html = html.replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>');
  
  // Paragraphs
  html = html.replace(/^(?!<[hl])([^\n]+)$/gm, '<p class="mb-4">$1</p>');
  
  // Code blocks
  html = html.replace(/```([^`]+)```/g, '<pre class="bg-secondary p-4 rounded-lg mb-4 overflow-x-auto text-sm"><code>$1</code></pre>');
  
  return html;
};

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundArticle = ARTICLES.find(article => article.id === id);
      setArticle(foundArticle || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="md:ml-64 min-h-screen flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="md:ml-64 min-h-screen pt-16 md:pt-8 px-4 md:px-8 py-6">
          <div className="max-w-3xl mx-auto text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/articles')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        <div className="pt-16 md:pt-8 px-4 md:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <button 
              onClick={() => navigate('/articles')}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </button>
            
            {/* Article header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {article.topic}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span>{article.author}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
            
            {/* Featured image */}
            <div className="mb-8">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto rounded-xl object-cover max-h-[500px]"
              />
            </div>
            
            {/* Article content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
            />
            
            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-border">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{article.author}</div>
                    <div className="text-sm text-muted-foreground">Author</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
