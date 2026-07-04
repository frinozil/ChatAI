# chatAI

A premium, minimalist AI-powered RAG (Retrieval-Augmented Generation) Document Search & Chat Interface built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Material UI (MUI v6)**.

---

## 🌐 Live Demo

👉 https://chat-9ef6x9ora-frinozilxavier-3693s-projects.vercel.app/

## Description

**chatAI** is a state-of-the-art document chat interface that enables users to upload knowledge bases (PDFs, DOCX, TXTs) and perform conversational questions and answers with a retrieval-augmented generation engine. The design prioritizes visual excellence, featuring clean typography, spacious layouts, soft hover effects, and strict responsiveness across desktop, tablet, and mobile devices.

---

## Features

- **Knowledge Base Upload**: Drag-and-drop file upload zone supporting PDF, DOCX, and TXT files.
- **Mock Document Indexing**: Interactive, real-time ingestion status indicators (Processing, Ready, Failed) with progress loaders.
- **Conversational Chat Thread**: Responsive messaging viewport styled with speech bubbles matching modern chat apps like Claude and ChatGPT.
- **Starter Prompts**: Curated, clickable prompt suggestions for testing documents instantly.
- **Source Citation Cards**: Dynamic match-percentage grid cards referencing relevant sections of source files.
- **Unified Collapsible Layouts**: Both left sidebar (conversations list) and right pane (Knowledge Base list) start collapsed on initial load, maximizing reading real estate.
- **Header Side Toggles**: Always-visible control actions in the top app bar for sliding panels out when needed on both mobile drawers and desktop grids.
- **Aesthetic Light & Dark Modes**: Hand-crafted, premium color palettes designed to minimize eye strain and enhance readability.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Typing**: TypeScript
- **UI Framework**: Material UI (MUI v6)
- **Styling**: Vanilla CSS (Global Reset + Layout Helpers) & Emotion Theme Overrides
- **State Management**: React Query (TanStack Query) & Context API
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios

---

## Folder Structure

```text
src/
├── app/                  # Next.js pages and routing definitions
├── components/           # Reusable layout and custom UI component wrappers
│   ├── layout/           # Global panels (Header, Sidebar, MainLayout)
│   └── ui/               # Core design tokens (AppCard, SectionCard, SearchInput, etc.)
├── context/              # AppState, Theme, and global context providers
├── features/             # Feature-based codebase modularization
│   ├── chat/             # Chat bubbles, input box, and source citation cards
│   ├── documents/        # Knowledge base side-panel and upload zones
│   └── search/           # Autocomplete document filtering components
├── hooks/                # Custom React queries (useChat, useDocs, etc.)
├── services/             # Axios API client clients
├── styles/               # Centralized layout.css and globals.css utilities
├── theme/                # Custom overrides for palettes, typography, and MUI defaults
├── types/                # Types and entity schemas (chat, documents)
└── utils/                # Date formatting and units conversion helpers
```

## Future Improvements

- **Vector Database Integration**: Connection with Pinecone, pgvector, or Qdrant for real-time document embeddings.
- **Production API Client**: Replacement of mock hooks with real streaming LLM endpoints.
- **Multimodal Uploads**: Support for parsing images, charts, and structured spreadsheet formats.
- **User Authentication**: Secure workspace session sync with Auth0 or NextAuth.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
