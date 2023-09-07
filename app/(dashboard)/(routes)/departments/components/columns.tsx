"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type DepartmentColumn = {
  id: string
  name: string
  short_name: string
  code: string
  status: false | true
  
}

export const columns: ColumnDef<DepartmentColumn>[] = [
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
    accessorKey: "short_name",
    header: "Short Name",
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
