
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
    // Mock response without API call
    return {
      response: `This is a simulated response to: "${request.message}". API calls have been removed as requested.`,
      conversationId: 'dummy-conversation-id'
    };
  },
  
  async getConversations(): Promise<Conversation[]> {
    // Mock conversations without API call
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
};

export type { Message, VideoContext, ChatRequest, ChatResponse, Conversation };
