import { create } from "zustand";

interface useWidgetRoleModalStore {
  isOpen: boolean;
  widgetId: string;
  onOpen: (id: any) => void;
  onClose: () => void;
}

export const useWidgetRoleModal = create<useWidgetRoleModalStore>((set) => ({
  isOpen: false,
  widgetId: "",
  onOpen: (id: any) => set({ isOpen: true, widgetId: id }),
  onClose: () => set({ isOpen: false }),
}));
