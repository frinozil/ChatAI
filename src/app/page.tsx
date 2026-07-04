'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ChatInterface from '@/features/chat/components/ChatInterface';
import DocumentPanel from '@/features/documents/components/DocumentPanel';

export default function Home() {
  return (
    <MainLayout documentPanel={<DocumentPanel />}>
      <ChatInterface />
    </MainLayout>
  );
}
