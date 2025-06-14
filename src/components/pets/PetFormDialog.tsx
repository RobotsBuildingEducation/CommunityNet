import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNostrPublish } from "@/hooks/useNostrPublish";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useToast } from "@/hooks/useToast";

interface PetFormDialogProps {
  trigger: React.ReactNode;
}

export function PetFormDialog({ trigger }: PetFormDialogProps) {
  const { mutateAsync: publish } = useNostrPublish();
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handlePublish = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in first.",
        variant: "destructive",
      });
      return;
    }
    if (!name.trim()) return;
    const body = `Name: ${name}\nImage: ${image}\nDescription: ${description}`;
    await publish({ kind: 1, content: `${body} #NeoPets` });
    setName("");
    setImage("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mint New Pet</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pet name"
          className="mb-2"
        />
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="mb-2"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="mb-4"
        />
        <DialogFooter>
          <Button onClick={handlePublish}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PetFormDialog;
