
import api from './api';

interface Message {
  role: string;
  content: string;
}

interface VideoContext {
  id: string;
  title: string;
  description: string;
}

interface ChatRequest {
  message: string;
  history?: Message[];
  videoContext?: VideoContext;
  timestamp?: string;
}

interface ChatResponse {
  response: string;
  conversationId: string;
}

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

interface ConversationsResponse {
  conversations: Conversation[];
}

export const tutorService = {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      console.log("Sending request to tutorService:", request);
      const response = await api.post('/tutor', request);
      console.log("Response from tutorService:", response.data);

      if (!response.data) {
        throw new Error('Failed to get response from tutor API');
      }

      return response.data;
    } catch (error) {
      console.error('Tutor API error:', error);
      
      // More descriptive error message
      throw new Error('Failed to connect to the tutor service. Please check your network connection and try again.');
    }
  },
  
  async getConversations(): Promise<Conversation[]> {
    try {
      console.log("Fetching conversations from tutorService");
      const response = await api.get('/tutor/conversations');
      console.log("Conversations response:", response.data);

      if (!response.data) {
        throw new Error('Failed to get conversations from API');
      }

      return response.data.conversations || [];
    } catch (error) {
      console.error('Conversations API error:', error);
      
      // More descriptive error message
      throw new Error('Failed to fetch conversations. Please check your network connection and try again.');
    }
  }
};

export type { Message, VideoContext, ChatRequest, ChatResponse, Conversation };
