"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { UserColumn,columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useRoleModal } from "@/hooks/use-role-modal";
import { usePathname, useRouter } from "next/navigation";

interface UserClientProps{
    data:UserColumn[]
}
export const UserClient:React.FC<UserClientProps> = ({
    data
})=>{

    const router = useRouter();
    const pathname = usePathname();
    const roleModal = useRoleModal();


    return(
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold text-gray-700">
              User Management
            </h1>

            <Button
                type="button"
                onClick={()=>router.push(`${pathname}/new`)}
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
              {/* <DataTable columns={columns} data={data} searchKey="name"/> */}
            </div>
          </div>
        </div>
    );
}