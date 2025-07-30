import { memo, useMemo } from "react";
import { useFavorite } from "../../features/favorites/model/hooks/useFavotite";
import { PlayerCard } from "../../features/player";
import styles from "./favorite-tracks.module.scss";

export const FavoriteTracks = memo(() => {
  const { favorites } = useFavorite();

  const renderedFavoriteTracks = useMemo(
    () =>
      favorites?.tracks?.length ? (
        favorites.tracks.map((track) => (
          <PlayerCard track={track} key={track.id} />
        ))
      ) : (
        <span>Добавьте любой понравившийся вам трек</span>
      ),
    [favorites?.tracks]
  );

  return (
    <div>
      <div className={styles.title_container}>
        <h1>Треки, которые вам нравятся</h1>
      </div>
      <div className={styles.player_cards}>{renderedFavoriteTracks}</div>
    </div>
  );
});
