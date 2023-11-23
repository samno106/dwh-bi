import { WidgetColumn } from "./columns";

interface CellPositionProps {
  data: WidgetColumn;
}

export const CellPosition: React.FC<CellPositionProps> = ({ data }) => {
  return data.position === "1" ? (
    <span className="p-1 px-2 rounded-lg bg-green-500 text-white">TOP</span>
  ) : (
    <span className="p-1 px-2 rounded-lg bg-blue-500  text-white">BOTTOM</span>
  );
};
