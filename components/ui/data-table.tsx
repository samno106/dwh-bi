"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  searchKey:string,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel:getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      
        columnFilters,
      },
  });

 

  return (
    <div>
        <div className="flex py-5">
        <div className="border-2 rounded-md px-2 relative mr-8">
        <label className="text-[10px] font-medium absolute -top-3 bg-white p-1 px-2 uppercase">
            Show
        </label>
        <select
            className="text-[11px] px-3 bg-transparent pl-2 focus:outline-none mt-3"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
        >
            {[10, 20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                {pageSize}
                </option>
            ))}
        </select>
        </div>   
        <div className="border-2 rounded-md px-2 relative w-auto">
            <label className="text-[10px] font-medium absolute -top-3 bg-white p-1 px-2 uppercase">
                Search
            </label>
            <input
                type="text"
                placeholder=""
                className="text-[11px] p-0 mt-2 mb-0  bg-transparent focus:outline-none h-7"
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
            />
           </div>
        </div>
      
    <div className="">
      <Table>
        <TableHeader className="text-[10px] font-bold uppercase text-gray-500 bg-gray-50 border-b-none rounded">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="py-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-[11px] font-medium text-gray-600">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
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
    </div>
  )
}
