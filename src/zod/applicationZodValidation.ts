import { z } from "zod";
import { Gender } from "@/types/Dashboard/shared_Enums/enums";

export const createStudentApplicationSchema = z.object({
  nameBn: z
    .string({ required_error: "বাংলায় নাম অবশ্যই দিতে হবে" })
    .min(3, "বাংলায় নাম অন্তত ৩ অক্ষরের হতে হবে"),

  nameEn: z
    .string({ required_error: "Name in English is required" })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  fatherName: z
    .string({ required_error: "Father's name is required" })
    .min(3, "Father's name must be at least 3 characters"),

  motherName: z
    .string({ required_error: "Mother's name is required" })
    .min(3, "Mother's name must be at least 3 characters"),

  guardianMobile: z
    .string({ required_error: "Guardian's mobile number is required" })
    .min(11, "Mobile number must be 11 digits")
    .max(14, "Invalid mobile number"),

  studentMobile: z
    .string().optional()
    .refine((val) => !val || val?.length >= 11, "Mobile number must be 11 digits"),

  dob: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      return isNaN(date.getTime()) ? undefined : date;
    }
  }, z.date({ required_error: "Date of birth is required" })),

  gender: z.nativeEnum(Gender, { required_error: "Gender is required" }),

  religion: z
    .string({ required_error: "Religion is required" })
    .min(3, "Please enter a valid religion"),

  bloodGroup: z.string().optional(),

  birthCertificateNo: z
    .string({ required_error: "Birth certificate number is required" })
    .min(10, "Birth certificate number is too short")
    .max(20, "Birth certificate number is too long"),

  presentAddress: z
    .string({ required_error: "Present address is required" })
    .min(10, "Present address must be at least 10 characters"),

  permanentAddress: z
    .string({ required_error: "Permanent address is required" })
    .min(10, "Permanent address must be at least 10 characters"),

  previousSchool: z.string().optional(),

  desiredClass: z.string({ required_error: "Desired class is required" }),

  admissionYear: z.string({ required_error: "Admission year is required" }),

  profileImage: z
    .any()
    .refine((file) => file instanceof File, "Profile image is required"),

  signatureImage: z.string().optional(),
});

export type ICreateApplicationPayload = z.infer<typeof createStudentApplicationSchema>;
