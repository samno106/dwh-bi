import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { UserColumn, columns } from "./column";

interface UsersClientProps {
  data: UserColumn[];
}

export const UsersClient: React.FC<UsersClientProps> = ({ data }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">User Management</h1>

        <Link
          href={`/users/new`}
          shallow={true}
          replace
          className="shadow-none flex items-center cursor-pointer rounded-md py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="uppercase text-xs">Add New</span>
        </Link>
      </div>

      <div className="bg-white px-4 rounded-lg mt-5">
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={data} searchKey="full_name" />
        </div>
      </div>
    </div>
  );
};
