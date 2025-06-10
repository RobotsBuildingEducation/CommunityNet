import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

/**
 * Fetch community notes from Nostr and keep them refreshed.
 *
 * Events are identified if the content contains #CommunityNet or any of the
 * category labels like [knowledge], [help], [resource], or [action].
 */
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
        .filter((e) => {
          const c = e.content.toLowerCase();
          return (
            c.includes('#communitynet') ||
            /\[(knowledge|help|resource|action)\]/i.test(c)
          );
        })
        .sort((a, b) => b.created_at - a.created_at);
    },
    refetchInterval: 30000,
  });
}
