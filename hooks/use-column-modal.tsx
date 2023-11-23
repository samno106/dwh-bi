import { create } from "zustand";

interface useColumnModalStore {
  isOpen: boolean;
  reportRoleId: string;
  onOpen: (id: any) => void;
  onClose: () => void;
}

export const useColumnModal = create<useColumnModalStore>((set) => ({
  isOpen: false,
  reportRoleId: "",
  onOpen: (id: any) => set({ isOpen: true, reportRoleId: id }),
  onClose: () => set({ isOpen: false }),
}));
