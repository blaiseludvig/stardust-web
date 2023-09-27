import { create } from 'zustand';

type State = {
  isSidebarPinned: boolean;
};

type Actions = {
  toggleSidebarPinned: (nextState?: boolean) => void;
};

export const useSidebarToggle = create<State & Actions>()((set, get) => ({
  isSidebarPinned: false,
  toggleSidebarPinned: (nextState?: boolean) => {
    if (nextState === undefined) {
      set({ isSidebarPinned: !get().isSidebarPinned });
    } else {
      set({ isSidebarPinned: nextState });
    }
  },
}));
