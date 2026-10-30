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

import { Payment } from "@/modules/dashboard/data/payment";
import { uiText } from "@/modules/data/ui-text";
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
    `${row.original.clientName} ${row.original.email} ${row.original.status}`.toLowerCase();

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
        aria-label={uiText.accessibility.selectAll}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={uiText.accessibility.selectRow}
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
          {uiText.demo.dataTable.clientName}
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
          {uiText.demo.dataTable.status}
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
          {uiText.demo.dataTable.amount}
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
          {uiText.demo.dataTable.email}
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
            <span className="sr-only">{uiText.demo.dataTable.openMenu}</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                {uiText.demo.dataTable.actions}
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(payment.id);
                  toast(uiText.demo.dataTable.copied, {
                    position: "top-right",
                  });
                }}
              >
                {uiText.demo.dataTable.copyPaymentId}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {uiText.demo.dataTable.viewCustomer}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {uiText.demo.dataTable.viewDetails}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
