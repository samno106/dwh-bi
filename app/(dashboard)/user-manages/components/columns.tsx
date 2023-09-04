"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type UserColumn = {
  id: string
  full_name: string
  staff_id: string
  status: "false" | "true"
  
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    id:"key",
    header:"#",
    cell:({row})=><span>{row.index+1}</span>
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "staff_id",
    header: "Staff Id",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id:"action",
    header: "Action",
    cell:({row})=><CellAction data={row.original}/>
  }
]
