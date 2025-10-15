// Multi-Language AI Chatbot Types
export interface ChatbotMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  language: string;
  context?: {
    feature_help?: string;
    compliance_query?: string;
    complaint_assistance?: boolean;
  };
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  }[];
}

export interface SupportedLanguage {
  code: string;
  name: string;
  native_name: string;
  is_rtl: boolean;
}

export interface ChatSession {
  id: string;
  user_id: string;
  language: string;
  started_at: string;
  last_activity: string;
  context: {
    current_feature?: string;
    user_type: 'consumer' | 'seller' | 'admin';
    active_complaint_id?: string;
    active_verification_id?: string;
  };
  messages: ChatbotMessage[];
}

export interface ContextualHelp {
  feature: string;
  language: string;
  quick_actions: {
    label: string;
    action: string;
    description: string;
  }[];
  common_questions: {
    question: string;
    answer: string;
  }[];
  guided_steps?: {
    step_number: number;
    title: string;
    description: string;
    action_required?: string;
  }[];
}