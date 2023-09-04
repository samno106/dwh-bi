"use client";

import { Button } from "@/components/ui/button";
import { usePositionModal } from "@/hooks/use-position-modal";
import { Plus } from "lucide-react";
import React from "react";
import { PositionColumn,columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface PositionClientProps{
    data:PositionColumn[]
}
export const PositionClient:React.FC<PositionClientProps> = ({
    data
})=>{

    const positionModal = usePositionModal();


    return(
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold text-gray-700">
              Positions Management
            </h1>

            <Button
                type="button"
                onClick={()=>positionModal.onOpen()}
                className="shadow-none flex items-center cursor-pointer rounded-md py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                >
                <Plus className="w-4 h-4 mr-2"/>
                <span className="uppercase text-xs">
                    Add New
                </span>
                </Button>
           
          </div>
  
          <div className="bg-white px-4 rounded-lg mt-5">
            
            <div className="overflow-x-auto">
              <DataTable columns={columns} data={data} searchKey="name"/>
            </div>
          </div>
        </div>
    );
}