"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ReportColumn, columns } from "./columns";
import { useReportModal } from "@/hooks/use-report-modal";
import axios from "axios";

export const ReportTamplateClient = () => {
  const reportModal = useReportModal();
  const [dataFormate, setDataFormate] = useState<ReportColumn[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await axios.get("/api/reports").then((data) => {
      const formattedReports: ReportColumn[] = data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        code: item.code,
        status: item.status,
        mis: item.mis,
        category: item.category ?? "",
      }));
      setDataFormate(formattedReports);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">Report Template</h1>

        <Button
          type="button"
          onClick={() => reportModal.onOpen()}
          className="shadow-none flex items-center cursor-pointer rounded-md py-1.5 px-3"
        >
          <Plus className="w-3 h-3 mr-1.5" />
          <span className="uppercase text-[9px]">Add New</span>
        </Button>
      </div>

      <div className="bg-white px-4 rounded-lg mt-5">
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={dataFormate} searchKey="name" />
        </div>
      </div>
    </div>
  );
};
