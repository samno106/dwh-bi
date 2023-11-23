import { create } from "zustand";

interface useWidgetParamModalStore {
  isOpen: boolean;
  id: "";
  onOpen: () => void;
  onClose: () => void;
}

export const useWidgetParamModal = create<useWidgetParamModalStore>((set) => ({
  isOpen: false,
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
