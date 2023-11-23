"use client";
import { Switch } from "@/components/ui/switch";
import { ReportColumn } from "./columns";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface CellMisProps {
  data: ReportColumn;
}

export const CellMis: React.FC<CellMisProps> = ({ data }) => {
  const router = useRouter();
  const [allow, setAllow] = useState(data.mis);
  const [loading, setLoading] = useState(false);

  const onChangeStatus = async () => {
    setAllow(!allow);
    const toastId = toast.loading("Loading...");

    try {
      setLoading(true);
      await axios.patch(`/api/reports/mis/${data.id}`, { mis: !allow });
      router.refresh();
      toast.success("Report has been changed.", {
        id: toastId,
      });
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="mis"
        checked={allow}
        onCheckedChange={onChangeStatus}
        disabled={loading}
      />
      <Label
        htmlFor="mis"
        className={cn(
          "px-2 rounded-full text-white text-[10px]",
          allow === true ? "bg-blue-500" : "bg-red-500"
        )}
      >
        {allow === true ? "Allowed" : "Not Allow"}
      </Label>
    </div>
  );
};
