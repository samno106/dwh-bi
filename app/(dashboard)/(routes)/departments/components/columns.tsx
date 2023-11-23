"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type DepartmentColumn = {
  id: string;
  name: string;
  short_name: string;
  code: string;
  status: false | true;
  type: string | null;
};

export const columns: ColumnDef<DepartmentColumn>[] = [
  {
    id: "key",
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "short_name",
    header: "Short Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) =>
      row.original.type === "HO" ? (
        <span className="py-1 px-2 rounded-md bg-blue-200 text-blue-600 text-[10px]">
          HO
        </span>
      ) : (
        <span className="py-1 px-2 rounded-md bg-green-200 text-green-600 text-[10px]">
          Branch
        </span>
      ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
