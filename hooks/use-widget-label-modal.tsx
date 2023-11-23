import { create } from "zustand";

interface useWidgetLabelModalStore {
  isOpen: boolean;
  id: "";
  onOpen: () => void;
  onClose: () => void;
}

export const useWidgetLabelModal = create<useWidgetLabelModalStore>((set) => ({
  isOpen: false,
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
