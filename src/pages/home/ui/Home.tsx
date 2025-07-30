import { useNavigate } from "react-router-dom";
import { PlayerCard } from "../../../features/player";
import { useTracks } from "../../../features/player/model/useTracks";
import styles from "./home.styles.module.scss";
import { memo, useCallback, useMemo } from "react";

export const Home = memo(() => {
  const { tracks } = useTracks();
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/create-track");
  }, [navigate]);

  const renderedTracks = useMemo(
    () =>
      tracks?.data.map((track) => <PlayerCard track={track} key={track.id} />),
    [tracks?.data]
  );

  return (
    <div>
      <div className={styles.title_container}>
        <h1>Здесь находиться список всех загруженных треков на сайте</h1>
      </div>
      <details className={styles.details}>
        <summary className={styles.details__title}>Не нашли песню?</summary>
        <div className={styles.details__content}>
          <p>Добавьте её сами!</p>
          <button className={styles.details__button} onClick={handleNavigate}>
            Добавить
          </button>
        </div>
      </details>
      <div className={styles.player_cards}>{renderedTracks}</div>
    </div>
  );
});
