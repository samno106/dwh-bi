"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type MetdataColumn = {
  id: string;
  type: string;
  label: string;
  value: string;
};

export const columns: ColumnDef<MetdataColumn>[] = [
  {
    id: "key",
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
