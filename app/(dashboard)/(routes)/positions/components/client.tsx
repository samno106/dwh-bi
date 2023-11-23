"use client";

import { Button } from "@/components/ui/button";
import { usePositionModal } from "@/hooks/use-position-modal";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PositionColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";

export const PositionClient = () => {
  const positionModal = usePositionModal();

  const [dataFormat, setDataFormat] = useState<PositionColumn[]>([]);

  const getData = async () => {
    await axios.get("/api/positions").then((data) => {
      const formattedPositions: PositionColumn[] = data.data.map(
        (item: any) => ({
          id: item.id,
          name: item.name,
          code: item.code,
          status: item.status,
        })
      );
      setDataFormat(formattedPositions);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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
          <DataTable columns={columns} data={dataFormat} searchKey="name" />
        </div>
      </div>
    </div>
  );
};
