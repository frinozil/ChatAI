'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DocumentService } from '@/services/document.service';
import { useAppState } from '@/context/AppContext';
import { Document } from '@/types/document';

export function useDocs() {
  const queryClient = useQueryClient();
  const { showNotification } = useAppState();

  // Query documents with conditional polling based on if any are "Processing"
  const {
    data: documentsData,
    isLoading: isDocsLoading,
    error: docsError,
  } = useQuery({
    queryKey: ['documents'],
    queryFn: () => DocumentService.getDocuments(),
    select: (res) => res.data,
    refetchInterval: (query) => {
      const docs = query.state.data?.data as Document[] | undefined;
      const hasProcessing = docs?.some((d) => d.status === 'Processing');
      return hasProcessing ? 800 : false; // Poll every 800ms while processing, else disable polling
    },
  });

  const documents = documentsData || [];

  // Upload document mutation
  const uploadDocMutation = useMutation({
    mutationFn: ({ name, size }: { name: string; size: number }) =>
      DocumentService.uploadDocument(name, size),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      showNotification('Document upload started', 'success');
    },
    onError: () => {
      showNotification('Failed to upload document', 'error');
    },
  });

  // Delete document mutation
  const deleteDocMutation = useMutation({
    mutationFn: (id: string) => DocumentService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      showNotification('Document deleted successfully', 'success');
    },
    onError: () => {
      showNotification('Failed to delete document', 'error');
    },
  });

  const handleUpload = (file: File) => {
    // Validate file extensions: PDF, DOCX, TXT
    const allowedExtensions = ['pdf', 'docx', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      showNotification('Unsupported file type. Only PDF, DOCX, and TXT are allowed.', 'error');
      return;
    }

    // Size limit: 10MB
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      showNotification('File size exceeds the 10MB limit.', 'error');
      return;
    }

    uploadDocMutation.mutate({ name: file.name, size: file.size });
  };

  return {
    documents,
    isDocsLoading,
    docsError,
    handleUpload,
    deleteDocument: (id: string) => deleteDocMutation.mutate(id),
    isUploading: uploadDocMutation.isPending,
  };
}
