import { useMemo } from "react";
import { useSendNutzap, useUserWallet } from "../../../hooks/useCashu";
import type { NostrEvent } from "@nostrify/nostrify";
import { Button } from "@/components/ui/button";

interface PetCardProps {
  event: NostrEvent;
}

export function PetCard({ event }: PetCardProps) {
  const { data: wallet } = useUserWallet();
  const sendNutzap = useSendNutzap();

  const { name, image, description } = useMemo(() => {
    const content = event.content.replace(/#NeoPets/g, "").trim();
    let name = "Unnamed Pet";
    let image = "";
    const lines: string[] = [];
    for (const line of content.split(/\n+/)) {
      if (line.startsWith("Name:")) {
        name = line.slice(5).trim();
      } else if (line.startsWith("Image:")) {
        image = line.slice(6).trim();
      } else if (line.startsWith("Description:")) {
        lines.push(line.slice(12).trim());
      } else {
        lines.push(line);
      }
    }
    return { name, image, description: lines.join("\n").trim() };
  }, [event]);

  const handleZap = async () => {
    const token = wallet?.tokens?.[0];
    if (!token) return alert("No tokens available.");
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-2">
      {image && (
        <img src={image} alt={name} className="rounded-md mx-auto h-40 object-contain" />
      )}
      <div className="font-bold text-lg">{name}</div>
      {description && <p className="text-sm whitespace-pre-wrap">{description}</p>}
      <div className="text-right">
        <Button size="sm" onClick={handleZap}>Zap</Button>
      </div>
    </div>
  );
}

export default PetCard;
