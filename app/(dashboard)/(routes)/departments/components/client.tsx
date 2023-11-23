"use client";

import { useDepartmentModal } from "@/hooks/use-department-modal";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, Plus } from "lucide-react";
import Link from "next/link";
import { DepartmentColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import axios from "axios";

export const DepartmentClient = () => {
  const departmentModal = useDepartmentModal();

  const [dataFormat, setDataFormat] = useState<DepartmentColumn[]>([]);

  const getData = async () => {
    await axios.get("/api/departments").then((data) => {
      const formattedDepartments: DepartmentColumn[] = data.data.map(
        (item: any) => ({
          id: item.id,
          name: item.name,
          short_name: item.short_name,
          code: item.code,
          status: item.status,
          type: item.type,
        })
      );
      setDataFormat(formattedDepartments);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">
          Department / Branch Management
        </h1>

        <Button
          type="button"
          onClick={() => departmentModal.onOpen()}
          className="shadow-none flex items-center cursor-pointer rounded-md py-1.5 px-3 "
        >
          <Plus className="w-3 h-3 mr-1.5" />
          <span className="uppercase text-[9px]">Add New</span>
        </Button>
      </div>

      <div className="bg-white px-4 rounded-lg mt-5">
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={dataFormat} searchKey="name" />
        </div>
      </div>
    </div>
  );
};
