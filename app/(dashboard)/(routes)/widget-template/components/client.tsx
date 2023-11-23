"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useModal } from "@/hooks/use-modal";
import { useWidgetModal } from "@/hooks/use-widget-modal";
import { metaDatas, widgets } from "@prisma/client";
import axios from "axios";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { WidgetColumn, columns } from "./columns";

export const ClientWidgetTemplate = () => {
  const useModals = useWidgetModal();
  const [data, setData] = useState<WidgetColumn[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await axios.get("/api/widgets").then((data) => {
      const formatted: WidgetColumn[] = data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        types: item.type,
        position: item.position,
      }));
      setData(formatted);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">Widget Template</h1>

        <Button
          type="button"
          onClick={() => useModals.onOpen()}
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
