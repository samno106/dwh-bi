import { UserColumn } from "./column";

interface CellStatusProps {
  data: UserColumn;
}

export const CellStatus: React.FC<CellStatusProps> = ({ data }) => {
  return data.status === false ? (
    <span className="p-1 px-2 rounded-lg bg-blue-500 text-white">Active</span>
  ) : (
    <span className="p-1 px-2 rounded-lg bg-red-500  text-white">Deactive</span>
  );
};
