import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNostrPublish } from "@/hooks/useNostrPublish";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useToast } from "@/hooks/useToast";

interface PostFormDialogProps {
  trigger: React.ReactNode;
  prefix: string;
  title: string;
  withDetails?: boolean;
}

export function PostFormDialog({
  trigger,
  prefix,
  title,
  withDetails,
}: PostFormDialogProps) {
  const { mutateAsync: publish } = useNostrPublish();
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState("");
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
    const text = description.trim();
    if (withDetails) {
      if (!titleInput.trim() && !text) return;
    } else {
      <DialogContent className="glass-card">
    }
    const body = withDetails
      ? `Title: ${titleInput}\nDate: ${dateInput}\nDescription: ${text}`
      : text;
    await publish({ kind: 1, content: `${prefix} ${body} #CommunityNet` });
    setTitleInput("");
    setDateInput("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {withDetails && (
          <div className="space-y-2 mb-4">
            <Input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Title"
              className=""
            />
            <Input
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              placeholder="Date"
              className=""
            />
          </div>
        )}
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={withDetails ? "Description" : "Write your note..."}
          className="mb-4"
        />
        <DialogFooter>
          <Button onClick={handlePublish}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
