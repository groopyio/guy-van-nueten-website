import { Play, SkipNext, SkipPrev, Spotify, Youtube } from "iconoir-react";
import { MetaContext } from "pages";
import { useContext, useEffect } from "react";
import styles from "./MediaPlayer.module.css";

export default function MediaPlayer() {
  const { songMeta, setSongMeta, urlMeta } = useContext(MetaContext);
  useEffect(() => {
    setSongMeta({
      title: "title",
      composer: "composer",
      author: "author",
      album: "album",
      publisher: "publisher",
      year: "year",
      production: "production",
      live: "live",
    });
  }, []);

  return (
    <div className={styles["mediaplayer-container"]}>
      <div className={styles["controls"]}>
        <SkipPrev />
        <Play />
        <SkipNext />
      </div>
      <div className={styles["metadata"]}>
        {!urlMeta && songMeta ? (
          <>
            <div className={styles["music-info"]}>
              <samp>{songMeta.title}</samp>
              <samp>{songMeta.composer}</samp>
            </div>
            <div className={styles["song-details"]}>
              <samp>{songMeta.author}</samp>
              <samp>{songMeta.album}</samp>
              <samp>{songMeta.publisher}</samp>
              <samp>{songMeta.year}</samp>
            </div>
            <div className={styles["production-info"]}>
              <samp>{songMeta.production}</samp>
              <samp>{songMeta.live}</samp>
            </div>
          </>
        ) : (
          <div className={styles["url"]}>
            <samp>{urlMeta}</samp>
          </div>
        )}
      </div>
      <div className={styles["sources"]}>
        <Spotify />
        <Youtube />
      </div>
    </div>
  );
}
