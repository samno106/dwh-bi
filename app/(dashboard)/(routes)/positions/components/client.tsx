"use client";

import { Button } from "@/components/ui/button";
import { usePositionModal } from "@/hooks/use-position-modal";
import { Plus } from "lucide-react";
import React from "react";
import { PositionColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface PositionClientProps {
  data: PositionColumn[];
}
export const PositionClient: React.FC<PositionClientProps> = ({ data }) => {
  const positionModal = usePositionModal();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">
          Positions Management
        </h1>

        <Button
          type="button"
          onClick={() => positionModal.onOpen()}
          className="shadow-none flex items-center cursor-pointer rounded-md py-1.5 px-3 "
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
