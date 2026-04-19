"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import AppField from "@/components/shared/AppField";
import { createMediaValidationSchema } from "@/zod/mediaZodValidation";
import { cn } from "@/lib/utils";

interface CreateMediaModalProps {
  onSuccess?: () => void;
}

interface FilePreview {
  file: File;
  objectUrl: string;
}

const CreateMediaModal = ({ onSuccess }: CreateMediaModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      sectionName: "",
      description: "",
      media: [] as File[],
    },
    onSubmit: async ({ value }) => {
      // Validate
      const parsed = createMediaValidationSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Validation error");
        return;
      }

      try {
        const fd = new FormData();
        fd.append("sectionName", value.sectionName);
        if (value.description) fd.append("description", value.description);
        value.media.forEach((file) => fd.append("media", file));

        const res = await fetch("/api/media/upload", {
          method: "POST",
          body: fd,
        });

        const result = await res.json();

        if (!res.ok || result.success === false) {
          throw new Error(result.message || "Failed to upload media");
        }

        toast.success("Media uploaded successfully!");
        queryClient.invalidateQueries({ queryKey: ["all-media"] });
        onSuccess?.();
        handleClose();
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  const handleClose = useCallback(() => {
    filePreviews.forEach((fp) => URL.revokeObjectURL(fp.objectUrl));
    setFilePreviews([]);
    setIsDragOver(false);
    form.reset();
    setIsOpen(false);
  }, [filePreviews, form]);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const newFiles = Array.from(incoming).filter((f) =>
        f.type.startsWith("image/")
      );

      if (!newFiles.length) {
        toast.error("Please select valid image files.");
        return;
      }

      form.setFieldValue("media", (prev: File[]) => {
        const combined = [...prev, ...newFiles].slice(0, 20);
        return combined;
      });

      setFilePreviews((prev) => {
        const next = [
          ...prev,
          ...newFiles.map((file) => ({
            file,
            objectUrl: URL.createObjectURL(file),
          })),
        ].slice(0, 20);
        return next;
      });
    },
    [form]
  );

  const removeFile = useCallback(
    (index: number) => {
      URL.revokeObjectURL(filePreviews[index].objectUrl);
      setFilePreviews((prev) => prev.filter((_, i) => i !== index));
      form.setFieldValue("media", (prev: File[]) =>
        prev.filter((_, i) => i !== index)
      );
    },
    [filePreviews, form]
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogTrigger asChild>
        <Button className="font-bold flex items-center gap-2" onClick={() => setIsOpen(true)}>
          <Plus className="h-5 w-5" />
          Upload Media
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] w-[95vw] max-h-[90vh] overflow-y-auto border-t-4 border-t-primary p-4 md:p-6 custom-scrollbar">
        <DialogHeader>
          <div className="p-3 bg-primary/10 w-fit rounded-xl mb-2">
            <ImagePlus className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">Upload Media</DialogTitle>
          <DialogDescription>
            Organize your media by sections. You can upload up to 20 images.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col space-y-6 mt-4"
        >
          {/* Section Name */}
          <form.Field
            name="sectionName"
            validators={{
              onChange: createMediaValidationSchema.shape.sectionName,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Section Name *"
                placeholder="e.g. Campus, Gallery, Events"
              />
            )}
          </form.Field>

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) => {
                const res = createMediaValidationSchema.shape.description.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Description
                </Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tell us more about these photos..."
                  className="resize-none"
                  rows={3}
                />
              </div>
            )}
          </form.Field>

          {/* Media / Previews */}
          <form.Field name="media">
            {(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <div className="space-y-3">
                  <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex justify-between">
                    Images * <span>{filePreviews.length}/20</span>
                  </Label>

                  {/* Previews Grid - Above Input as requested */}
                  {filePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in zoom-in duration-300">
                      {filePreviews.map((fp, idx) => (
                        <div key={fp.objectUrl} className="group relative aspect-square rounded-lg overflow-hidden border">
                          <img src={fp.objectUrl} alt="preview" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragOver(false); addFiles(e.dataTransfer.files); }}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer",
                      isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted",
                      hasError && "border-destructive bg-destructive/5"
                    )}
                  >
                    <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click or drag images here</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 20 files</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && addFiles(e.target.files)}
                    />
                  </div>

                  {hasError && (
                    <p className="text-sm text-destructive font-medium">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!canSubmit || isSubmitting} className="min-w-[120px]">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Media"
                  )}
                </Button>
              </DialogFooter>
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMediaModal;
