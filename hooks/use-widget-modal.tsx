import { create } from "zustand";

interface useWidgetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useWidgetModal = create<useWidgetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
