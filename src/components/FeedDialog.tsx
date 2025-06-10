import { useState } from 'react';
import type { NostrEvent } from '@nostrify/nostrify';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NoteContent } from '@/components/NoteContent';

interface FeedDialogProps {
  trigger: React.ReactNode;
  events: NostrEvent[];
  title: string;
  onZap?: (ev: NostrEvent) => void;
}

export function FeedDialog({ trigger, events, title, onZap }: FeedDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="glass-card max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {events.map((ev) => (
            <Card key={ev.id}>
              <CardContent>
                <NoteContent event={ev} />
              </CardContent>
              {onZap && (
                <CardFooter className="justify-end">
                  <Button size="sm" onClick={() => onZap(ev)}>
                    Zap
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
