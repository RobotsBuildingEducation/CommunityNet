import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useToast } from '@/hooks/useToast';

interface PostFormDialogProps {
  trigger: React.ReactNode;
  prefix: string;
  title: string;
}

export function PostFormDialog({ trigger, prefix, title }: PostFormDialogProps) {
  const { mutateAsync: publish } = useNostrPublish();
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const handlePublish = async () => {
    if (!user) {
      toast({
        title: 'Login required',
        description: 'Please log in first.',
        variant: 'destructive',
      });
      return;
    }
    const text = content.trim();
    if (!text) return;
    await publish({ kind: 1, content: `${prefix} ${text} #CommunityNet` });
    setContent('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          className="mb-4"
        />
        <DialogFooter>
          <Button onClick={handlePublish}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
