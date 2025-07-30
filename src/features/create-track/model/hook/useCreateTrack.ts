import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrackApi } from "../../api/createTracks.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreateTrack = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addTrack, isPending } = useMutation({
    mutationFn: createTrackApi.create,
    onSuccess: () => {
      toast.success("Вы успешно доавбили новый трек");
      navigate("/home");
      queryClient.invalidateQueries({
        queryKey: ["tracks"],
      });
    },
    onError: () => {
      toast.error("Ошибка при создании, попробуйте позже");
    },
  });

  return { addTrack, isPending };
};
