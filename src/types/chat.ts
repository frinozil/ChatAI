export interface Source {
  documentId: string;
  filename: string;
  page?: string | number;
  confidence: number; // e.g. 0.96 for 96%
}

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string; // ISO date string
  sources?: Source[];
}

export interface Conversation {
  id: string;
  title: string;
  lastUpdated: string; // ISO date string or human-readable format
  active?: boolean;
  messages: Message[];
}
