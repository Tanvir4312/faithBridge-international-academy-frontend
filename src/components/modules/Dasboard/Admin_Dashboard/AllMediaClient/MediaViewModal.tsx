"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AllMediaResponse } from "@/types/Dashboard/admin-dashboard-types/all-media.types";
import { format } from "date-fns";
import {
  Calendar,
  FileImage,
  Hash,
  Image as ImageIcon,
  Info,
  Layers,
  Tag,
} from "lucide-react";

interface MediaViewModalProps {
  media: AllMediaResponse | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="size-4" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 break-all text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  </div>
);

const MediaViewModal = ({ media, isOpen, onOpenChange }: MediaViewModalProps) => {
  if (!media) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border/50 p-0 shadow-2xl">
        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Image preview */}
          <div className="relative h-56 w-full overflow-hidden bg-muted sm:h-64">
            <img
              src={media.url}
              alt={media.description}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4">
              <Badge
                variant="secondary"
                className="border-0 bg-black/40 text-white backdrop-blur-sm"
              >
                {media.sectionName}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 px-6 py-6">
            <DialogHeader className="p-0">
              <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                <ImageIcon className="size-5 text-primary" />
                Media Details
              </DialogTitle>
            </DialogHeader>

            <Separator />

            <div className="space-y-4">
              <InfoRow
                icon={Hash}
                label="ID"
                value={
                  <span className="font-mono text-xs text-muted-foreground">
                    {media.id}
                  </span>
                }
              />

              <InfoRow
                icon={FileImage}
                label="File Name"
                value={media.key}
              />

              <InfoRow
                icon={Info}
                label="Description"
                value={media.description || "—"}
              />

              <InfoRow
                icon={Layers}
                label="Section"
                value={
                  <Badge variant="outline" className="text-xs">
                    {media.sectionName}
                  </Badge>
                }
              />

              <InfoRow
                icon={Tag}
                label="Status"
                value={
                  media.isDeleted ? (
                    <Badge variant="destructive" className="text-xs">
                      Deleted
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 text-xs border-green-200">
                      Active
                    </Badge>
                  )
                }
              />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <InfoRow
                icon={Calendar}
                label="Created At"
                value={format(new Date(media.createdAt), "MMM d, yyyy h:mm a")}
              />

            </div>

            {/* Full URL */}
            <div className="rounded-xl border border-border/50 bg-muted/40 p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Image URL
              </p>
              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-xs text-primary underline-offset-4 hover:underline"
              >
                {media.url}
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewModal;
