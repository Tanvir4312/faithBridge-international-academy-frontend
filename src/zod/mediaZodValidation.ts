import { z } from "zod";

export const createMediaValidationSchema = z.object({
  sectionName: z
    .string({ required_error: "Section name is required" })
    .min(2, "Section name must be at least 2 characters")
    .max(100, "Section name must be at most 100 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  media: z
    .array(z.instanceof(File))
    .min(1, "At least one image must be selected")
    .max(20, "You can upload at most 20 images at once"),
});

export type ICreateMediaFormValues = z.infer<typeof createMediaValidationSchema>;
