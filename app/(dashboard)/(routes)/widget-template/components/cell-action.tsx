"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Search, Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UpdateReportModal } from "@/components/modals/reports/update-report-modal";
import { WidgetColumn } from "./columns";
import Link from "next/link";
import { UpdateWidgetModal } from "@/components/modals/widgets/update-widget-modal";

interface CellActionProps {
  data: WidgetColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/widgets/${data.id}`);
      router.refresh();
      toast.success("Widget deleted.");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpenDelete(false);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onComfirm={onDelete}
        loading={loading}
      />
      <UpdateWidgetModal isOpen={open} onClose={onClose} data={data} />
      <div className="flex">
        {/* <Link
          href={`/reports/${data.id}`}
          target="_blank"
          className="flex justify-center items-center text-gray-600 w-7 h-7 shadow-none rounded-md bg-gray-200 hover:bg-gray-300 hover:text-yellow-500 mr-3"
        >
          <Search className="w-4 h-4" />
        </Link> */}
        <Button
          size="icon"
          onClick={() => router.push(`/widget-template/${data.id}`)}
          className="text-gray-600 w-7 h-7 shadow-none rounded-md bg-gray-200 hover:bg-gray-300 hover:text-green-500 mr-3"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          onClick={() => setOpen(true)}
          className="text-gray-600 w-7 h-7 shadow-none rounded-md bg-gray-200 hover:bg-gray-300 hover:text-blue-600"
        >
          <Pencil className="w-4 h-4" />
        </Button>

        <Button
          size="icon"
          onClick={() => setOpenDelete(true)}
          className="ml-3 text-gray-600 w-7 h-7 shadow-none rounded-md bg-gray-200 hover:bg-gray-300 hover:text-red-600"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
