import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteApi } from "../../api/favoriteTrack.api";
import { useEffect } from "react";
import { useFavotiteStore } from "../store/useFavorite.store";
import { toast } from "react-toastify";

export const useFavorite = () => {
  const queryClient = useQueryClient();
  const {
    setFavoriteTracks,
    toggleFavorite: toggleFavoriteInStore,
    favoriteTracks,
  } = useFavotiteStore();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: favoriteApi.getFavorites,
  });

  useEffect(() => {
    if (favorites?.tracks) {
      setFavoriteTracks(favorites?.tracks.map((track) => track.id));
    }
  }, [favorites?.tracks, setFavoriteTracks]);

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: favoriteApi.toggleFavorite,
    onMutate: async (trackId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previousFavorites = queryClient.getQueryData(["favorites"]);
      toggleFavoriteInStore(trackId);
      return { previousFavorites };
    },
    onSuccess: () => {
      toast.success("Успешно");
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: () => {
      toast.error("Произошла ошибка, попробуйте позже");
    },
  });
  const isFavorite = (trackId: number) => favoriteTracks.includes(trackId);

  return { favorites, isLoading, toggleFavorite, isFavorite };
};
