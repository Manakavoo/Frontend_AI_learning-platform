
import api from './api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface VideoContext {
  id: string;
  title: string;
  description: string;
}

interface ChatRequest {
  message: string;
  history: Message[];
  videoContext?: VideoContext;
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
    const response = await api.post<ChatResponse>('/api/tutor/chat', request);
    return response.data;
  },
  
  async getConversations(): Promise<Conversation[]> {
    const response = await api.get<ConversationsResponse>('/api/tutor/conversations');
    return response.data.conversations;
  }
};

export type { Message, VideoContext, ChatRequest, ChatResponse, Conversation };
