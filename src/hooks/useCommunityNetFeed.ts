import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

export function useCommunityNetFeed() {
  const { nostr } = useNostr();

  return useQuery<NostrEvent[]>({
    queryKey: ['communitynet-feed'],
    queryFn: async ({ signal }) => {
      const events = await nostr.query(
        [{ kinds: [1], limit: 100 }],
        { signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]) },
      );
      return events
        .filter((e) => e.content.includes('#CommunityNet'))
        .sort((a, b) => b.created_at - a.created_at);
    },
    refetchInterval: 30000,
  });
}
