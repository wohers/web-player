import { memo, useCallback, useMemo } from "react";
import { useFavorite } from "../../model/hooks/useFavotite";
import styles from "./favorite-button.module.scss";
import cn from "classnames";

export const FavoriteButton = memo(({ trackId }: { trackId: number }) => {
  const { isFavorite, toggleFavorite } = useFavorite();
  const favoriteStatuts = useMemo(
    () => isFavorite(trackId),
    [isFavorite, trackId]
  );

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(trackId);
  }, [toggleFavorite, trackId]);

  const buttonText = useMemo(
    () => (favoriteStatuts ? "Удалить из избранного" : "Добавить в избранное"),
    [favoriteStatuts]
  );

  const buttonClasses = useMemo(
    () =>
      cn(styles.favorite_button, {
        [styles.favorite_button_active]: favoriteStatuts,
        [styles.favorite_button_disabled]: !favoriteStatuts,
      }),
    [favoriteStatuts]
  );

  return (
    <button onClick={handleToggleFavorite} className={buttonClasses}>
      {buttonText}
    </button>
  );
});
