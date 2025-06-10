import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useToast } from '@/hooks/useToast';

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
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState<Date | undefined>();
  const [description, setDescription] = useState('');

  const handlePublish = async () => {
    if (!user) {
      toast({
        title: 'Login required',
        description: 'Please log in first.',
        variant: 'destructive',
      });
      return;
    }
    const text = description.trim();
    if (withDetails) {
      if (!titleInput.trim() && !text) return;
    } else {
      if (!text) return;
    }
    const formattedDate = dateInput ? format(dateInput, 'yyyy-MM-dd') : '';
    const body = withDetails
      ? `Title: ${titleInput}\nDate: ${formattedDate}\nDescription: ${text}`
      : text;

    const category = prefix.match(/\[(.*)\]/)?.[1]?.toLowerCase();
    const tags = [['t', 'communitynet']];
    if (category) tags.push(['t', category]);

    await publish({
      kind: 1,
      content: `${prefix} ${body} #CommunityNet`,
      tags,
    });
    queryClient.invalidateQueries({ queryKey: ['communitynet-feed'] });
    setTitleInput('');
    setDateInput('');
    setDescription('');
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !dateInput && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateInput ? format(dateInput, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto" align="start">
                <Calendar
                  mode="single"
                  selected={dateInput}
                  onSelect={setDateInput}
                />
              </PopoverContent>
            </Popover>
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
