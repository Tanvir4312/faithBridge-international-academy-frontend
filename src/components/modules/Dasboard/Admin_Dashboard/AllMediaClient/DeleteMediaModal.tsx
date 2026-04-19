"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  FileText,
  Hash,
  Layers,
  Loader2,
  Trash2,
} from "lucide-react";
import { AllMediaResponse } from "@/types/Dashboard/admin-dashboard-types/all-media.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMedia } from "@/services/admin-srever-action/all-media.service";
import { toast } from "sonner";

interface DeleteMediaModalProps {
  media: AllMediaResponse | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-muted rounded-lg shrink-0">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-sm font-medium truncate">{value}</p>
    </div>
  </div>
);

const DeleteMediaModal = ({ media, isOpen, onOpenChange }: DeleteMediaModalProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteMedia(media?.id as string),
    onSuccess: () => {
      toast.success("Media deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-media"] });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete media");
    },
  });

  const handleClose = () => {
    onOpenChange(false);
    // Use timeout to reset confirmation state after the modal closing animation
    setTimeout(() => setShowConfirm(false), 300);
  };

  if (!media) return null;

  return (
    <>
      <Dialog open={isOpen && !showConfirm} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto border-t-4 border-t-destructive p-0 gap-0">
          <div className="p-6 space-y-6">
            <DialogHeader className="space-y-3">
              <div className="p-3 bg-destructive/10 w-fit rounded-xl">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
              <DialogTitle className="text-2xl font-bold">Review Media Deletion</DialogTitle>
              <DialogDescription>
                You are about to delete this item. Please review the details below.
              </DialogDescription>
            </DialogHeader>

            <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted group">
              <img
                src={media.url}
                alt={media.description}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-black/40 text-white backdrop-blur-md border-0">
                  {media.sectionName}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem icon={Hash} label="Media ID" value={media.id} />
              <InfoItem icon={FileText} label="File Key" value={media.key} />
              <div className="col-span-1 sm:col-span-2">
                <InfoItem icon={Layers} label="Description" value={media.description || "No description provided"} />
              </div>
            </div>
          </div>

          <Separator />

          <DialogFooter className="p-6 bg-muted/30 gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="font-bold flex items-center gap-2"
              onClick={() => setShowConfirm(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Media
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stage 2: Confirmation Modal */}
      <Dialog open={isOpen && showConfirm} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[400px] w-[90vw] border-t-4 border-t-rose-600 p-6 flex flex-col items-center text-center">
          <div className="p-4 bg-rose-100 rounded-full mb-4 animate-bounce">
            <AlertTriangle className="h-10 w-10 text-rose-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-rose-600">Final Confirmation</DialogTitle>
            <DialogDescription className="text-foreground font-medium pt-2">
              Are you absolutely sure you want to delete this media? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
            <Button
              variant="outline"
              className="flex-1"
              disabled={isPending}
              onClick={handleClose}
            >
              No, Keep It
            </Button>
            <Button
              variant="destructive"
              className="flex-1 font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20"
              disabled={isPending}
              onClick={() => mutate()}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteMediaModal;
