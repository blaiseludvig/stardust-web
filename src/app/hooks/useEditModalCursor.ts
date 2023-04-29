import { create } from 'zustand';

type fieldType = 'title' | 'content';

type State = {
  cursorIndex: number | null;
  field: fieldType | null;
};

type Actions = {
  cursorIsUnset: () => boolean;
  setCursor: (field: State['field'], index: State['cursorIndex']) => void;
  resetAfterSuccess: () => void;
};

export const useEditModalCursor = create<State & Actions>()((set, get) => ({
  cursorIndex: null,
  field: null,
  cursorIsUnset: () => get().cursorIndex === null && get().field === null,
  setCursor: (field, index) =>
    set(() => ({ cursorIndex: index, field: field })),
  resetAfterSuccess: () => get().setCursor(null, null),
}));
