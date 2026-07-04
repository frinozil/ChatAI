export type DocumentStatus = 'Ready' | 'Processing' | 'Failed';

export interface Document {
  id: string;
  name: string;
  size: number; // in bytes
  uploadDate: string; // ISO date string
  status: DocumentStatus;
  progress?: number; // 0 to 100
  errorMessage?: string;
}
