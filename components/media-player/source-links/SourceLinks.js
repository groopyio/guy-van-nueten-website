import { Spotify, Youtube } from "iconoir-react";
import styles from "./SourceLinks.module.css";

export function SourceLinks({ song, setIsPlaying }) {
  return (
    <div className={styles["sources"]}>
      {song?.spotify ? (
        <a
          href={song.spotify}
          target="_blank"
          aria-label={`Listen to ${song.title} on Spotify`}
          onClick={() => setIsPlaying(false)}
        >
          <Spotify className={styles["enabled"]} color="#1db954" />
        </a>
      ) : (
        <Spotify className={styles["disabled"]} />
      )}

      {song?.youtube ? (
        <a
          href={song.youtube}
          target="_blank"
          aria-label={`Watch ${song.title} on YouTube`}
          onClick={() => setIsPlaying(false)}
        >
          <Youtube className={styles["enabled"]} color="#ff0000" />
        </a>
      ) : (
        <Youtube className={styles["disabled"]} />
      )}
    </div>
  );
}
