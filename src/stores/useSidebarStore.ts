import { create } from "zustand";

type SidebarState = {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
