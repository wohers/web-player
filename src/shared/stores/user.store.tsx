import { create } from "zustand";

interface IUser {
  id: number | null;
  email: string | null;
  first_name: string | null;
  second_name: string | null;
  is_staff: boolean | null;
}

interface IUserStore {
    user: IUser,
    setUser: (user: IUser) => void
    clearUser: () => void
}

export const userStore = create<IUserStore>((set) => ({
  user: {
    id: null,
    email: null,
    first_name: null,
    second_name: null,
    is_staff: null,
  },
  setUser: (userData: IUser) => {
    set({ user: userData });
  },

  clearUser: () => {
    set({
      user: {
        id: null,
        email: null,
        first_name: null,
        second_name: null,
        is_staff: null,
      },
    });
  },
}));


