'use client';

import { useQuery } from '@tanstack/react-query';
import { SearchService } from '@/services/search.service';
import { useState, useEffect } from 'react';

export function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data, isLoading } = useQuery({
    queryKey: ['globalSearch', debouncedQuery],
    queryFn: () => SearchService.globalSearch(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    select: (res) => res.data,
  });

  return {
    results: data || { documents: [], conversations: [] },
    isLoading: isLoading && debouncedQuery.trim().length > 0,
  };
}
