import DiscogsIcon from "@components/icons/DiscogsIcon";
import {
  FacebookTag,
  Instagram,
  MusicDoubleNote,
  Shop,
  Tiktok,
} from "iconoir-react";
import styles from "./Socials.module.css";

export default function Socials() {
  return (
    <nav className={styles["icon-container"]}>
      <a
        href="https://guyvannueten.myshopify.com/"
        aria-label="Shop Guy van Nueten's latest merchandise"
      >
        <Shop className={styles["icon"]} />
      </a>

      <a
        href="https://www.facebook.com/guyvannueten/"
        target="_blank"
        aria-label="Guy van Nueten on Facebook"
      >
        <FacebookTag className={styles["icon"]} />
      </a>

      <a
        className={styles["icon-container"]}
        href="https://www.discogs.com/sell/list?artist_id=385715&ev=ab&page=2"
        target="_blank"
        aria-label="Guy van Nueten on Discogs"
      >
        <DiscogsIcon className={styles["icon"]} />
      </a>

      <a
        href="https://www.instagram.com/guy.van.nueten?utm_source=qr&igsh=OXp6bXUzaXUya3Q="
        target="_blank"
        aria-label="Guy van Nueten on Instagram"
      >
        <Instagram className={styles["icon"]} />
      </a>
      <a
        href="https://www.tiktok.com/@guy.van.nueten?_t=8nZuzHK6IZl&_r=1"
        target="_blank"
        aria-label="Guy van Nueten on TikTok"
      >
        <Tiktok className={styles["icon"]} />
      </a>
      <a
        href="https://music.apple.com/be/artist/guy-van-nueten/5298371"
        target="_blank"
        aria-label="Guy van Nueten on Apple Music"
      >
        <MusicDoubleNote className={styles["icon"]} />
      </a>
    </nav>
  );
}
