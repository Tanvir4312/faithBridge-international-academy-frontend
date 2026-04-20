"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Info, Clock } from "lucide-react";
import { format } from "date-fns";

interface NoticeDetailModalProps {
  notice: any | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NoticeDetailModal = ({ notice, isOpen, onOpenChange }: NoticeDetailModalProps) => {
  if (!notice) return null;

  const formattedDate = notice.createdAt
    ? (() => {
      const d = new Date(notice.createdAt);
      return isNaN(d.getTime()) ? "Date not available" : format(d, "PPP");
    })()
    : "Date not available";

  const formattedDetailedDate = notice.createdAt
    ? (() => {
      const d = new Date(notice.createdAt);
      return isNaN(d.getTime()) ? "a while ago" : format(d, "iiii 'at' p");
    })()
    : "a while ago";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] border-t-4 border-t-primary max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/5 text-primary">
              {notice.type}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold leading-tight">{notice.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed information about the notice titled "{notice.title}" of type {notice.type}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/50 p-4 rounded-xl border-l-4 border-primary italic text-foreground leading-relaxed whitespace-pre-wrap">
            {notice.details}
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
            <Info className="h-4 w-4" />
            <span>This notice was issued on {formattedDetailedDate}.</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeDetailModal;
