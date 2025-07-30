import { baseFetch } from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import type { IDeleteTrackResponse } from "./types";

export const playerApi = {
  deleteTrack: (id: number): Promise<IDeleteTrackResponse> => {
    return baseFetch(
      `${API_ENDPOINTS.TRACKS.TRACKS}/${id}`,
      "DELETE",
      null,
      true
    );
  },
};
