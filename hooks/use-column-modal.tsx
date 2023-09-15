import { create } from "zustand";

interface useColumnModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useColumnModal = create<useColumnModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
