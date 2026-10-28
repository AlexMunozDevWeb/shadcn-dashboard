import { z } from "zod";

export const ROLES = ["Developer", "Designer", "Manager"] as const;

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .min(2, "First name must have at least 2 characters."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .min(2, "Last name must have at least 2 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Work email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must have at least 8 characters."),
  role: z.enum(ROLES, {
    message: "Please select your primary role.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service and privacy policy.",
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
