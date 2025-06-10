import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

/**
 * Fetch community notes from Nostr and keep them refreshed.
 *
 * Events are tagged with `t` tags. We fetch notes that include the
 * `communitynet` tag and then filter them by category tags such as `help`,
 * `resource`, `action`, or `knowledge` on the client.
*/
export function useCommunityNetFeed() {
  const { nostr } = useNostr();

  return useQuery<NostrEvent[]>({
    queryKey: ['communitynet-feed'],
    queryFn: async ({ signal }) => {
      const events = await nostr.query(
        [
          {
            kinds: [1],
            '#t': ['communitynet'],
            limit: 100,
          },
        ],
        { signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]) },
      );

      return events.sort((a, b) => b.created_at - a.created_at);
    },
    refetchInterval: 30000,
  });
}
