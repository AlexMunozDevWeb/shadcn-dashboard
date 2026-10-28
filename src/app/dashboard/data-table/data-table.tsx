"use client";
import { useState } from "react";

import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type ColumnFiltersState,
  type ColumnVisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/components//ui/table";

import { Button } from "@/modules/components//ui/button";
import { Input } from "@/modules/components//ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/modules/components//ui/select";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/modules/components//ui/dropdown-menu";

import { features, type DataTableFeatures } from "./data-table-features";

import { Payment } from "@/modules/data/payment";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
}

const items = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Success", value: "success" },
  { label: "Failed", value: "failed" },
];

export default function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const isDeleteActive = Object.keys(rowSelection).length > 0;

  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({});

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex justify-between py-4 mx-4 gap-4">
        <div className="flex gap-4 w-3xl">
          <Input
            placeholder="Filter anything..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              setCurrentStatus("all");
              table.getColumn("status")?.setFilterValue(undefined);
              table.getColumn("email")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
          <Select
            items={items}
            value={currentStatus}
            onValueChange={(value) => {
              setCurrentStatus(value);
              table
                .getColumn("status")
                ?.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 flex self-end">
          {isDeleteActive && (
            <Button
              variant="destructive"
              onClick={() => {
                const ids = table.getSelectedRowModel().rows.map((row) => {
                  return (row.original as Payment).clientName;
                });
                console.log(ids);
              }}
            >
              Delete
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" className="ml-auto" />}
            >
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4 mx-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <Select
        onValueChange={(value) => {
          if (value) {
            table.setPageSize(Number(value));
          }
        }}
      >
        <SelectTrigger className="w-[180px] p-5 ml-2 mb-2">
          <SelectValue placeholder="10 Rows"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Row per page</SelectLabel>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
