import DiscogsIcon from "@components/icons/DiscogsIcon";
import { FacebookTag, Instagram } from "iconoir-react";
import styles from "./Socials.module.css";

export default function Socials() {
  return (
    <nav className={styles["icon-container"]}>
      <a
        href="https://www.facebook.com/guyvannueten/"
        target="_blank"
        aria-label="Visit Guy van Nueten's Facebook page"
      >
        <FacebookTag className={styles["icon"]} />
      </a>

      <a
        className={styles["icon"]}
        href="https://www.discogs.com/sell/list?artist_id=385715&ev=ab&page=2"
        target="_blank"
        aria-label="View Guy van Nueten's credits on Discogs"
      >
        <DiscogsIcon className={styles["icon"]} />
      </a>

      <a
        href="https://www.instagram.com/guy.van.nueten?utm_source=qr&igsh=OXp6bXUzaXUya3Q="
        target="_blank"
        aria-label="Follow Guy van Nueten on Instagram"
      >
        <Instagram className={styles["icon"]} />
      </a>
    </nav>
  );
}
