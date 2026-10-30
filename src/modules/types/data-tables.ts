import type { VariantProps } from "class-variance-authority";

import type { badgeVariants } from "@/modules/components//ui/badge";
import type { Payment } from "@/modules/dashboard/data/payment";

export type PaymentStatus = Payment["status"];
export type BadgeVariant = NonNullable<
  VariantProps<typeof badgeVariants>["variant"]
>;
export type PaymentStatusVariants = Record<PaymentStatus, BadgeVariant>;

export const statusVariants: PaymentStatusVariants = {
  pending: "secondary",
  processing: "info",
  success: "success",
  failed: "destructive",
};
