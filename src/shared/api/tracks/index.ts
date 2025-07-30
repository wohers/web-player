import { baseFetch } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type { ITracksResponse } from "./types";

export const getTracks = async (): Promise<ITracksResponse> => {
  const response = await baseFetch<ITracksResponse>(
    API_ENDPOINTS.TRACKS.TRACKS,
    "GET"
  );
  return response;
};
