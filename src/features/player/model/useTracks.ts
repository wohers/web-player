import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTracks } from "../../../shared/api/tracks";
import { playerApi } from "../api/player.api";
import { toast } from "react-toastify";
import type { IDeleteTrackResponse } from "../api/types";

export const useTracks = () => {
  const queryClient = useQueryClient();

  const { data: tracks } = useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
    retry: false,
  });

  const { mutate: deleteTrack } = useMutation({
    mutationFn: playerApi.deleteTrack,
    onSuccess: (data: IDeleteTrackResponse) => {
      if (data.data.code === 204) {
        toast.success("Успешно");
        queryClient.invalidateQueries({
          queryKey: ["tracks"],
        });
      }
    },
    onError: () => {
      toast.error("Произошла ошибка");
    },
  });

  return { tracks, deleteTrack };
};
