import { z } from "zod";
import { uiText } from "@/modules/data/ui-text";

export const ROLES = uiText.auth.roles;

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, uiText.auth.firstNameRequired)
    .min(2, uiText.auth.firstNameMin),
  lastName: z
    .string()
    .trim()
    .min(1, uiText.auth.lastNameRequired)
    .min(2, uiText.auth.lastNameMin),
  email: z
    .string()
    .trim()
    .min(1, uiText.auth.workEmailRequired)
    .email(uiText.auth.emailInvalid),
  password: z
    .string()
    .min(1, uiText.auth.passwordRequired)
    .min(8, uiText.auth.passwordMinRegister),
  role: z.enum(ROLES, {
    message: uiText.auth.roleRequired,
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: uiText.auth.termsRequired,
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
