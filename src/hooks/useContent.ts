import { useQuery } from "@tanstack/react-query";

import { fetchCollection, fetchProfile, type CollectionName } from "@/lib/content";

export function useProfile() {
  return useQuery({ queryKey: ["profile"], queryFn: fetchProfile, staleTime: 60_000 });
}

export function useCollectionData<T extends { id: string; order?: number }>(name: CollectionName) {
  return useQuery({
    queryKey: [name],
    queryFn: () => fetchCollection<T>(name),
    staleTime: 60_000,
  });
}
