import styles from "./SongMetaData.module.css";
export function SongMetadata({ song, url }) {
  return (
    <div className={styles["metadata"]}>
      <div className={styles["song-meta"]}>
        {!url && song ? (
          <>
            <div className={styles["music-info"]}>
              {song.title && <samp>{song.title}</samp>}
              {song.composer && <samp>{`| ${song.composer}`}</samp>}
            </div>
            <div className={styles["song-details"]}>
              {song.artist && <samp>{song.artist}</samp>}
              {song.album && (
                <samp>{song.artist ? `| ${song.album}` : song.album}</samp>
              )}
              {song.publisher && (
                <samp>
                  {song.artist || song.album
                    ? `| ${song.publisher}`
                    : song.publisher}
                </samp>
              )}
              {song.year && (
                <samp>
                  {song.artist || song.album || song.publisher
                    ? `| ${song.year}`
                    : song.year}
                </samp>
              )}
            </div>
            {(song.contentType || song.live) && (
              <div className={styles["production-info"]}>
                {song.contentType && <samp>{song.contentType}</samp>}
                {song.live && (
                  <samp>{song.contentType ? `| ${song.live}` : song.live}</samp>
                )}
              </div>
            )}
          </>
        ) : (
          <div className={styles["url"]}>
            <samp>{url}</samp>
          </div>
        )}
      </div>
    </div>
  );
}
