import { create } from "zustand";

interface useReportRoleModalStore {
  isOpen: boolean;
  reportId: string;
  onOpen: (id: any) => void;
  onClose: () => void;
}

export const useReportRoleModal = create<useReportRoleModalStore>((set) => ({
  isOpen: false,
  reportId: "",
  onOpen: (id: any) => set({ isOpen: true, reportId: id }),
  onClose: () => set({ isOpen: false }),
}));
