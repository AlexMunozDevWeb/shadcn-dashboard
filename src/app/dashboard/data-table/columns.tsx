"use client";

import {
  createColumnHelper,
  type FilterFn,
  type Row,
} from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";

import { Badge } from "@/modules/components//ui/badge";
import { Button } from "@/modules/components//ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/components//ui/dropdown-menu";

import { Checkbox } from "@/modules/components//ui/checkbox";

import { toast } from "sonner";

import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Payment } from "@/modules/data/payment";
import {
  type BadgeVariant,
  type PaymentStatus,
  statusVariants,
} from "@/modules/types";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

const myCustomFilterFn: FilterFn<DataTableFeatures, Payment> = (
  row: Row<DataTableFeatures, Payment>,
  columnId: string,
  filterValue: string,
) => {
  filterValue = filterValue.toLowerCase();
  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.clientName} ${row.original.clientName} ${row.original.status}`.toLowerCase();
  console.log(rowValues);

  return filterParts.every((part) => rowValues.includes(part));
};

const SortIcon = ({
  column,
}: {
  column: { getIsSorted: () => "asc" | "desc" | false };
}) => {
  const sorted = column.getIsSorted();

  if (sorted === "asc") return <ArrowUp className="ml-2 h-4 w-4" />;
  if (sorted === "desc") return <ArrowDown className="ml-2 h-4 w-4" />;

  return <ArrowUpDown className="ml-2 h-4 w-4" />;
};

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("clientName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Name
          <SortIcon column={column} />
        </Button>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <SortIcon column={column} />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <SortIcon column={column} />
        </Button>
      );
    },
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
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <SortIcon column={column} />
        </Button>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(payment.id);
                  toast("Payment ID copied to clipboard", {
                    position: "top-right",
                  });
                }}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
