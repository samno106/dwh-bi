"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CellStatus } from "./cell-status";
import { CellMis } from "./cell-mis";

export type ReportColumn = {
  id: string;
  name: string;
  status: false | true;
  mis: false | true;
  category: string;
};

export const columns: ColumnDef<ReportColumn>[] = [
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
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => <CellStatus data={row.original} />,
  },
  {
    id: "mis",
    header: "MIS",
    cell: ({ row }) => <CellMis data={row.original} />,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
