"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type UserColumn = {
  id: string
  full_name: string
  staff_id: string
  username: string
  department: string
  position: string
  role: string
  status: false | true
  
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
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{ row.original.status === false?<span className="p-1 px-2 rounded bg-blue-500">Active</span>:<span className="p-1 px-2 rounded bg-blue-500">Active</span>}
  },
  {
    id:"action",
    header: "Action",
    cell:({row})=><CellAction data={row.original}/>
  }
]
