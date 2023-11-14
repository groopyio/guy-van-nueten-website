import { Spotify, Youtube } from "iconoir-react";
import Link from "next/link";
import styles from "./SourceLinks.module.css";

export function SourceLinks({ song }) {
  return (
    <div className={styles["sources"]}>
      {song?.spotify ? (
        <Link href={song.spotify}>
          <Spotify className={styles["enabled"]} />
        </Link>
      ) : (
        <Spotify className={styles["disabled"]} />
      )}

      {song?.youtube ? (
        <Link href={song.youtube}>
          <Youtube className={styles["enabled"]} />
        </Link>
      ) : (
        <Youtube className={styles["disabled"]} />
      )}
    </div>
  );
}
