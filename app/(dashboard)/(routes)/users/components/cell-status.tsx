"use client";
import { Switch } from "@/components/ui/switch";
import { UserColumn } from "./column";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface CellStatusProps {
  data: UserColumn;
}

export const CellStatus: React.FC<CellStatusProps> = ({ data }) => {
  const router = useRouter();
  const [status, setStatus] = useState(data.status);
  const [loading, setLoading] = useState(false);

  const onChangeStatus = async () => {
    setStatus(!status);

    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      await axios.patch(`/api/users/status/${data.id}`, { status: !status });
      router.refresh();
      toast.success("User has been changed.", {
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
        id="status"
        checked={status}
        onCheckedChange={onChangeStatus}
        disabled={loading}
      />
      <Label
        htmlFor="status"
        className={cn(
          "px-2 rounded-full text-white text-[10px]",
          data.status === true ? "bg-blue-500" : "bg-red-500"
        )}
      >
        {data.status === true ? "Active" : "Deactived"}
      </Label>
    </div>
  );
  return data.status === true ? (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label
        htmlFor="airplane-mode"
        className="p-1 px-2 rounded-lg bg-blue-500 text-white"
      >
        Active
      </Label>
    </div>
  ) : (
    // <span className="p-1 px-2 rounded-lg bg-blue-500 text-white">Active</span>
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label
        htmlFor="airplane-mode"
        className="p-1 px-2 rounded-lg bg-red-500  text-white"
      >
        Active
      </Label>
    </div>
    // <span className="p-1 px-2 rounded-lg bg-red-500  text-white">Deactive</span>
  );
};
