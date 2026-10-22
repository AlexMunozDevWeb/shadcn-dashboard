"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./data-table-features";
import { Payment } from "@/data/payment";
import { Badge } from "@/components/ui/badge";
import { type BadgeVariant, type PaymentStatus, statusVariants } from "@/types";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

export const columns = columnHelper.columns([
  columnHelper.accessor("clientName", {
    header: "Client Name",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<PaymentStatus>("status");
      const variant: BadgeVariant = statusVariants[status] ?? "default";
      return (
        <Badge variant={variant} capitalize>
          {status}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
]);
