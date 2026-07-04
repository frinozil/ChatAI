
import { simulateAxiosResponse } from './api';
import { AxiosResponse } from 'axios';
import { DocumentService } from './document.service';
import { ChatService } from './chat.service';

export interface SearchResult {
  documents: Array<{ id: string; name: string }>;
  conversations: Array<{ id: string; title: string }>;
}

export const SearchService = {
  async globalSearch(query: string): Promise<AxiosResponse<SearchResult>> {
    if (!query.trim()) {
      return simulateAxiosResponse({ documents: [], conversations: [] }, 100);
    }

    // Resolve current in-memory lists (simulated API fetch)
    const docsResponse = await DocumentService.getDocuments();
    const convsResponse = await ChatService.getConversations();

    const lowerQuery = query.toLowerCase();

    const matchedDocs = docsResponse.data
      .filter((doc) => doc.name.toLowerCase().includes(lowerQuery))
      .map((doc) => ({ id: doc.id, name: doc.name }));

    const matchedConvs = convsResponse.data
      .filter((conv) => conv.title.toLowerCase().includes(lowerQuery))
      .map((conv) => ({ id: conv.id, title: conv.title }));

    return simulateAxiosResponse({
      documents: matchedDocs,
      conversations: matchedConvs,
    }, 200); // Fast autocomplete response
  },
};
