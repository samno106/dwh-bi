import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const TopCard = ({ title, icon, color, reportDate, data }: any) => {
  return (
    <>
      <div className={`p-4 rounded-lg bg-white border shadow`}>
        <div className="flex items-center justify-between">
          <h4 className="text-[12px] text-gray-700 font-medium">{title}</h4>
          <div className={cn("w-5 h-5", color)}>{icon}</div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-semibold">{data}</h3>
          <span className="text-[11px] text-gray-400">
            {reportDate ? format(reportDate, "dd MMM, yyyy") : ""}
          </span>
        </div>
      </div>
    </>
  );
};

export default TopCard;
