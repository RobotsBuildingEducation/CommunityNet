import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNostr } from "@nostrify/react";
import { useNostrPublish } from "@/hooks/useNostrPublish";
import { useSendNutzap, useUserWallet } from "../../hooks/useCashu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NoteContent } from "@/components/NoteContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { NostrEvent } from "@nostrify/nostrify";

export function MainFeed() {
  const { nostr } = useNostr();
  const { mutateAsync: publish } = useNostrPublish();
  const { user } = useCurrentUser();
  const { data: wallet } = useUserWallet();
  const sendNutzap = useSendNutzap();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["main-feed"],
    queryFn: async ({ signal }) => {
      const res = await nostr.query([{ kinds: [1], limit: 40 }], {
        signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
      });
      return res
        .filter((e) => e.content.includes("#CommunityNet"))
        .sort((a, b) => b.created_at - a.created_at);
    },
    refetchInterval: 2000,
  });

  const handlePublish = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }
    const text = content.trim();
    if (!text) return;
    const finalContent = text.endsWith("#CommunityNet")
      ? text
      : `${text} #CommunityNet`;
    await publish({ kind: 1, content: finalContent });
    setContent("");
    queryClient.invalidateQueries({ queryKey: ["main-feed"] });
  };

  const handleZap = async (event: NostrEvent) => {
    const token = wallet?.tokens?.[0];
    if (!token) {
      alert("No tokens available.");
      return;
    }
    const mintUrl = token.tags.find(([t]) => t === "u")?.[1] ?? "";
    const proofTag = token.tags.find(([t]) => t === "proof")?.[1];
    const proof = proofTag ? JSON.parse(proofTag) : {};
    try {
      await sendNutzap(event.pubkey, mintUrl, proof, event.id);
      alert("Zap sent!");
    } catch {
      alert("Failed to zap.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something..."
          className="mb-2"
        />
        <Button onClick={handlePublish}>Publish</Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        events.map((ev) => (
          <Card key={ev.id}>
            <CardContent>
              <NoteContent event={ev} />
            </CardContent>
            <CardFooter className="justify-end">
              <Button size="sm" onClick={() => handleZap(ev)}>
                Zap
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

export default MainFeed;
