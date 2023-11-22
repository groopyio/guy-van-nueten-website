import styles from "./SongMetaData.module.css";

export function SongMetadata({ song, url }) {
  const {
    title,
    composer,
    origin,
    project,
    year,
    artist,
    publisher,
    venue_date,
    isLive,
  } = song;
  return (
    <div className={styles["metadata"]}>
      <div className={styles["song-meta"]}>
        {!url && song ? (
          <div className={styles["music-info"]}>
            <samp>
              {title} ({composer})
            </samp>
            {isLive ? (
              <>
                <samp>Live at {venue_date}</samp>
              </>
            ) : (
              <div className={styles["music-info"]}>
                {artist && composer !== artist && (
                  <samp>Performed by {artist}</samp>
                )}
                {project && (
                  <samp>
                    from {origin} '{project}'
                  </samp>
                )}
                <samp>
                  {year} {publisher}
                </samp>
              </div>
            )}
          </div>
        ) : (
          <div className={styles["url"]}>
            <samp>{url}</samp>
          </div>
        )}
      </div>
    </div>
  );
}
