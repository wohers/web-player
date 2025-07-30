import { baseFetch } from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import type { IFavoriteResponse } from "./types";

export const favoriteApi = {
  getFavorites: async (): Promise<IFavoriteResponse> => {
    const response = await baseFetch<IFavoriteResponse>(
      API_ENDPOINTS.TRACKS.FAVORITES,
      "GET",
      null,
      true
    );
    return response;
  },
  toggleFavorite: async (trackId: number) => {
    const response = await baseFetch(
      `${API_ENDPOINTS.TRACKS.FAVORITES}/${trackId}`,
      "POST",
      null,
      true
    );
    return response;
  },
};
