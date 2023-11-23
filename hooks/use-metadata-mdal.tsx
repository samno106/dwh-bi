import { create } from "zustand";

interface useMetadataModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMetdataModal = create<useMetadataModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
