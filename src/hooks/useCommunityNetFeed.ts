import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

/**
 * Fetch community notes from Nostr and keep them refreshed.
 *
 * Events are tagged with `t` tags so we can query by category at the relay
 * level. We include tags for `communitynet` and the category label such as
 * `help`, `resource`, `action`, or `knowledge`.
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
            '#t': ['communitynet', 'help', 'resource', 'action', 'knowledge'],
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
