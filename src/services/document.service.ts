import { Document } from '@/types/document';
import { simulateAxiosResponse } from './api';
import { AxiosResponse } from 'axios';

// Initial Mock Documents
let mockDocuments: Document[] = [
  {
    id: 'doc_1',
    name: 'Employee Handbook.pdf',
    size: 2450000, // 2.45 MB
    uploadDate: '2026-06-15T08:30:00Z',
    status: 'Ready',
  },
  {
    id: 'doc_2',
    name: 'Engineering Guidelines.pdf',
    size: 1820000, // 1.82 MB
    uploadDate: '2026-06-20T14:15:00Z',
    status: 'Ready',
  },
  {
    id: 'doc_3',
    name: 'HR Policy.pdf',
    size: 1120000, // 1.12 MB
    uploadDate: '2026-06-25T11:00:00Z',
    status: 'Ready',
  },
  {
    id: 'doc_4',
    name: 'Security Compliance.pdf',
    size: 3410000, // 3.41 MB
    uploadDate: '2026-07-01T09:45:00Z',
    status: 'Ready',
  },
];

export const DocumentService = {
  // Fetch all documents
  getDocuments(): Promise<AxiosResponse<Document[]>> {
    return simulateAxiosResponse(mockDocuments);
  },

  // Upload a document
  uploadDocument(
    name: string,
    size: number,
    onProgressUpdate?: (progress: number) => void
  ): Promise<AxiosResponse<Document>> {
    const newDocId = `doc_${Date.now()}`;
    const newDoc: Document = {
      id: newDocId,
      name,
      size,
      uploadDate: new Date().toISOString(),
      status: 'Processing',
      progress: 0,
    };

    // Add to list
    mockDocuments = [newDoc, ...mockDocuments];

    // Simulate progress updates
    const intervalTime = 400; // ms
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += 20;
      
      // Update internal state
      const docIndex = mockDocuments.findIndex((d) => d.id === newDocId);
      if (docIndex !== -1) {
        mockDocuments[docIndex].progress = currentProgress;
        if (onProgressUpdate) {
          onProgressUpdate(currentProgress);
        }

        if (currentProgress >= 100) {
          mockDocuments[docIndex].status = 'Ready';
          mockDocuments[docIndex].progress = undefined;
          clearInterval(timer);
        }
      } else {
        clearInterval(timer);
      }
    }, intervalTime);

    return simulateAxiosResponse(newDoc, 200);
  },

  // Delete a document
  deleteDocument(id: string): Promise<AxiosResponse<{ success: boolean }>> {
    mockDocuments = mockDocuments.filter((d) => d.id !== id);
    return simulateAxiosResponse({ success: true }, 400);
  },
};
