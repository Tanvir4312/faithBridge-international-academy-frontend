import { z } from "zod";
import { Gender } from "@/types/Dashboard/shared_Enums/enums";

export const createTeacherValidationSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  teacher: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Please enter a valid email address"),
    contactNumber: z
      .string({ required_error: "Contact number is required" })
      .regex(
        /^(?:\+8801|8801|01)[3-9]\d{8}$/,
        "Enter a valid Bangladeshi phone number"
      ),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .optional(),
    qualification: z
      .string({ required_error: "Qualification is required" })
      .min(2, "Qualification details are required"),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
      required_error: "Gender must be either MALE, FEMALE, or OTHER",
      invalid_type_error: "Gender must be either MALE, FEMALE, or OTHER",
    }),
    profilePhoto: z
      .string()
      .url("Please provide a valid image URL")
      .optional(),
    isDeleted: z.boolean({ required_error: "isDeleted must be a boolean value" }).default(false),
    designation: z
      .string({ required_error: "Designation is required" })
      .min(2, "Designation must be at least 2 characters"),
  }),
});

export type ICreateTeacherPayload = z.infer<typeof createTeacherValidationSchema>



export const updateTeacherSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters").max(30).optional().or(z.literal('')),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  contactNumber: z.string().min(11, "Contact number must be at least 11 characters").max(15, "Contact number cannot exceed 15 characters").optional().or(z.literal('')),
  address: z.string().min(10, "Address must be at least 10 characters").max(100).optional().or(z.literal('')),
  qualification: z.string().min(2, "Qualification must be at least 2 characters").max(50).optional().or(z.literal('')),
  designation: z.string().min(2, "Designation must be at least 2 characters").max(50).optional().or(z.literal('')),
})

export type IUpdateTeacherFormValues = z.infer<typeof updateTeacherSchema>
