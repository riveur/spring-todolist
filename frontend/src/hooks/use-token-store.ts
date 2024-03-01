import { LoginResponse } from "@/lib/validation";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = LoginResponse | null;

type Actions = {
  reset: () => void;
  getToken(): string | null;
  init(state: NonNullable<State>): void;
}

const storageKey = 'auth';
const initialState: State = {
  token: '',
};

const useTokenStore = create(persist<State & Actions>(
  (set, get) => ({
    ...initialState,
    reset: () => set(initialState),
    getToken: () => get().token.length > 0 ? get().token : null,
    init: (state) => set(() => ({ ...state })),
  }),
  {
    name: storageKey,
    storage: createJSONStorage(() => localStorage)
  },
));

export default useTokenStore;
