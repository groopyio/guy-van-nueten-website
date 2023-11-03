import { Play, SkipNext, SkipPrev, Spotify, Youtube } from "iconoir-react";
import styles from "./MediaPlayer.module.css";

export default function MediaPlayer() {
  const metadata = {
    title: "title",
    composer: "composer",
    author: "author",
    album: "album",
    publisher: "publisher",
    year: "year",
    production: "production",
    live: "live",
  };
  return (
    <div className={styles["mediaplayer-container"]}>
      <div className={styles["controls"]}>
        <SkipPrev />
        <Play />
        <SkipNext />
      </div>
      <div className={styles["metadata"]}>
        <div className={styles["music-info"]}>
          <samp>{metadata.title}</samp>
          <samp>{metadata.composer}</samp>
        </div>
        <div className={styles["song-details"]}>
          <samp>{metadata.author}</samp>
          <samp>{metadata.album}</samp>
          <samp>{metadata.publisher}</samp>
          <samp>{metadata.year}</samp>
        </div>
        <div className={styles["production-info"]}>
          <samp>{metadata.production}</samp>
          <samp>{metadata.live}</samp>
        </div>
      </div>
      <div className={styles["sources"]}>
        <Spotify />
        <Youtube />
      </div>
    </div>
  );
}
