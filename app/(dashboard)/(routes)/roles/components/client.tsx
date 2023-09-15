"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { RoleColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useRoleModal } from "@/hooks/use-role-modal";

interface RoleClientProps {
  data: RoleColumn[];
}
export const RoleClient: React.FC<RoleClientProps> = ({ data }) => {
  const roleModal = useRoleModal();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">Role Management</h1>

        <Button
          type="button"
          onClick={() => roleModal.onOpen()}
          className="shadow-none flex items-center cursor-pointer rounded-md py-1.5 px-3"
        >
          <Plus className="w-3 h-3 mr-1.5" />
          <span className="uppercase text-[9px]">Add New</span>
        </Button>
      </div>

      <div className="bg-white px-4 rounded-lg mt-5">
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={data} searchKey="name" />
        </div>
      </div>
    </div>
  );
};
