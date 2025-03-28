
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

      // Check if response exists and has the expected structure
      if (!response.data) {
        throw new Error('Empty response from tutor API');
      }

      // Return the data as is without additional validation
      // This will work even if the response format is slightly different
      return response.data;
    } catch (error) {
      console.error('Tutor API error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        // If server returned an error message, use it
        if (error.response.data && error.response.data.detail) {
          throw new Error(`Server error: ${error.response.data.detail}`);
        }
      }
      
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
        throw new Error('Empty response from API');
      }

      // Handle different response formats
      if (Array.isArray(response.data)) {
        // If the API returns an array directly
        return response.data;
      } else if (response.data.conversations) {
        // If the API returns an object with a conversations property
        return response.data.conversations;
      } else {
        // If the API returns an object that needs to be transformed
        // This is a fallback case
        console.warn('Unexpected response format:', response.data);
        return Object.values(response.data).filter(item => 
          typeof item === 'object' && item !== null
        );
      }
    } catch (error) {
      console.error('Conversations API error:', error);
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        if (error.response.data && error.response.data.detail) {
          throw new Error(`Server error: ${error.response.data.detail}`);
        }
      }
      
      // More descriptive error message
      throw new Error('Failed to fetch conversations. Please check your network connection and try again.');
    }
  }
};

export type { Message, VideoContext, ChatRequest, ChatResponse, Conversation };
