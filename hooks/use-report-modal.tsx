import { create } from "zustand";

interface useReportModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useReportModal = create<useReportModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
