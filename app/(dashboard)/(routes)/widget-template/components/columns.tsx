"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CellPosition } from "./cell-position";

export type WidgetColumn = {
  id: string;
  name: string;
  types: string;
  position: string;
};

export const columns: ColumnDef<WidgetColumn>[] = [
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
    accessorKey: "types",
    header: "Type",
  },

  {
    id: "position",
    header: "Position",
    cell: ({ row }) => <CellPosition data={row.original} />,
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
