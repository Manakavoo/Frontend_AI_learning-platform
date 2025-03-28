
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
      const response = await api.post('/tutor', request);

      if (!response.data) {
        throw new Error('Failed to get response from tutor API');
      }

      return response.data;
    } catch (error) {
      console.error('Tutor API error:', error);
      
      // Fallback response
      const timestampPrefix = request.timestamp ? `[At ${request.timestamp}] ` : '';
      const contextPrefix = request.videoContext ? `About "${request.videoContext.title}": ` : '';
      
      return {
        response: `${timestampPrefix}${contextPrefix}This is a simulated response to: "${request.message}". The tutor API is currently unavailable.`,
        conversationId: 'dummy-conversation-id'
      };
    }
  },
  
  async getConversations(): Promise<Conversation[]> {
    try {
      const response = await api.get('/tutor/conversations');

      if (!response.data) {
        throw new Error('Failed to get conversations from API');
      }

      return response.data.conversations || [];
    } catch (error) {
      console.error('Conversations API error:', error);
      
      // Mock conversations as fallback
      return [
        {
          id: '1',
          title: 'Sample Conversation 1',
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Sample Conversation 2',
          updatedAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
        }
      ];
    }
  }
};

export type { Message, VideoContext, ChatRequest, ChatResponse, Conversation };
