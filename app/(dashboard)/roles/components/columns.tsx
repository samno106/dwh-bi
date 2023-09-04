"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type RoleColumn = {
  id: string
  name: string
  code: string
  status: "false" | "true"
  
}

export const columns: ColumnDef<RoleColumn>[] = [
  {
    id:"key",
    header:"#",
    cell:({row})=><span>{row.index+1}</span>
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
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
