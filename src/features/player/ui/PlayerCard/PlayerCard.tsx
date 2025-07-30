import type { ITrack } from "../../../../entities/track/types";
import "react-h5-audio-player/lib/styles.css";

import styles from "./player-card.module.scss";
import AudioPlayer from "react-h5-audio-player";
import { FavoriteButton } from "../../../favorites/ui";
import { userStore } from "../../../../shared/stores/user.store";
import { useTracks } from "../../model/useTracks";
import { useLocation } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";

interface IPlayerCardProps {
  track: ITrack;
}

export const PlayerCard = memo(({ track }: IPlayerCardProps) => {
  const { user } = userStore();
  const { deleteTrack } = useTracks();
  const { pathname } = useLocation();

  const handleDeleteTrack = useCallback(() => {
    deleteTrack(track.id);
  }, [deleteTrack, track.id]);

  const audioPlayerConfig = useMemo(
    () => ({
      src: `${import.meta.env.VITE_URL}${track.audio_file}`,
      showSkipControls: false,
      showJumpControls: false,
    }),
    [track.audio_file]
  );

  const showDeleteButton = useMemo(
    () => user?.is_staff && pathname === "/web-player",
    [user, pathname]
  );

  const showFavoriteButton = useMemo(() => user?.id !== null, [user?.id]);

  return (
    <div className={styles.player_card}>
      <img
        src={`${import.meta.env.VITE_URL}/${track.cover_image}`}
        alt={track.title}
        className={styles.player_card__img}
      />
      <div className={styles.player_card__info}>
        <span className={styles.player_card__info_title}>{track.title}</span>
        <p className={styles.player_card__info_artist}>{track.artist}</p>
      </div>
      <AudioPlayer {...audioPlayerConfig} />
      {showFavoriteButton && <FavoriteButton trackId={track.id} />}
      {showDeleteButton && (
        <button
          className={styles.player_card__delete_btn}
          onClick={handleDeleteTrack}
        >
          Удалить
        </button>
      )}
    </div>
  );
});
