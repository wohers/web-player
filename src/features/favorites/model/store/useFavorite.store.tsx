import { create } from "zustand";

interface IFavoriteStore {
  favoriteTracks: number[];
  setFavoriteTracks: (ids: number[]) => void;
  toggleFavorite: (id: number) => void;
}

export const useFavotiteStore = create<IFavoriteStore>((set) => ({
  favoriteTracks: [],
  setFavoriteTracks: (ids) => set({ favoriteTracks: ids }),
  toggleFavorite: (id) =>
    set((state) => ({
      favoriteTracks: state.favoriteTracks.includes(id)
        ? state.favoriteTracks.filter((trackId) => trackId !== id)
        : [...state.favoriteTracks, id],
    })),
}));
