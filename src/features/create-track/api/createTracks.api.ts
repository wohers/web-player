import { baseFetch } from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import type { ICreateTrackRequest, ICreateTrackResponse } from "./types";

export const createTrackApi = {
  create: (data: ICreateTrackRequest | FormData): Promise<ICreateTrackResponse> => {
    const response = baseFetch<ICreateTrackResponse>(
      API_ENDPOINTS.TRACKS.TRACKS,
      "POST",
      data,
      false,
      true
    );
    return response;
  },
};
