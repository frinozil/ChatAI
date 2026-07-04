import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import QueryProvider from '@/context/QueryProvider';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { AppContextProvider } from '@/context/AppContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import NotificationListener from '@/components/common/NotificationListener';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'chatAI - Premium Document Chat Workspace',
  description:
    'A minimalist, premium retrieval-augmented generation search & chat interface. Upload documents to your Knowledge Base and query them with AI.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>
        <ErrorBoundary>
          <QueryProvider>
            <AppContextProvider>
              <ThemeContextProvider>
                {children}
                {/* Global Notification system listener */}
                <NotificationListener />
              </ThemeContextProvider>
            </AppContextProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
