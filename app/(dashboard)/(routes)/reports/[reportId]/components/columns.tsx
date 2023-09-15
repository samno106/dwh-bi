"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ColumnReport = {
  CUSTOMERID: string;
};

export const columns: ColumnDef<ColumnReport>[] = [
  {
    id: "key",
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "CUSTOMERID",
    header: "CUSTOMERID",
  },
];
