"use client";

import React, { useState } from "react";
import { MetdataColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UpdateMetadataModal } from "@/components/modals/metadata/update-metadata-modal";

interface CellActionProps {
  data: MetdataColumn;
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
      await axios.delete(`/api/metadatas/${data.id}`);
      router.refresh();
      toast.success("Metadata deleted.");
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
      <UpdateMetadataModal isOpen={open} onClose={onClose} data={data} />
      <div className="flex">
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
