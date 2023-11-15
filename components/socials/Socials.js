import DiscogsIcon from "@components/icons/DiscogsIcon";
import { FacebookTag, Instagram } from "iconoir-react";
import styles from "./Socials.module.css";

export default function Socials() {
  return (
    <nav className={styles["icon-container"]}>
      <a href="https://www.facebook.com/guyvannueten/" target="_blank">
        <FacebookTag className={styles["icon"]} />
      </a>

      <a
        className={styles["icon"]}
        href="https://www.discogs.com/artist/385715-Guy-Van-Nueten?filter_anv=0&type=Credits"
        target="_blank"
      >
        <DiscogsIcon className={styles["icon"]} />
      </a>

      <a href="https://www.instagram.com/guy.van.nueten/" target="_blank">
        <Instagram className={styles["icon"]} />
      </a>
    </nav>
  );
}
