"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MetdataColumn, columns } from "./columns";
import { useMetdataModal } from "@/hooks/use-metadata-mdal";
import axios from "axios";

export const MetadataClient = () => {
  const metadataModal = useMetdataModal();

  const [formattedData, setFormattedData] = useState<MetdataColumn[]>([]);

  const getData = async () => {
    await axios.get("/api/metadatas").then((data) => {
      const formattedData: MetdataColumn[] = data.data.map((item: any) => ({
        id: item.id,
        label: item.label,
        value: item.value,
        type: item.type,
      }));
      setFormattedData(formattedData);
    });
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">Metadata</h1>

        <Button
          type="button"
          onClick={() => metadataModal.onOpen()}
          className="shadow-none flex items-center cursor-pointer rounded-md py-1.5 px-3 "
        >
          <Plus className="w-3 h-3 mr-1.5" />
          <span className="uppercase text-[9px]">Add New</span>
        </Button>
      </div>

      <div className="bg-white px-4 rounded-lg mt-5">
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={formattedData} searchKey="label" />
        </div>
      </div>
    </div>
  );
};

export default MetadataClient;
