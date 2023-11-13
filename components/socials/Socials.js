import DiscogsIcon from "@components/icons/DiscogsIcon";
import { FacebookTag, Instagram } from "iconoir-react";
import Link from "next/link";
import styles from "./Socials.module.css";

export default function Socials() {
  return (
    <nav className={styles["icon-container"]}>
      <Link href="https://www.facebook.com/guyvannueten/">
        <FacebookTag className={styles["icon"]} />
      </Link>
      <Link href="https://www.discogs.com/artist/385715-Guy-Van-Nueten?filter_anv=0&type=Credits">
        <DiscogsIcon className={styles["icon"]} />
      </Link>
      <Link href="https://www.instagram.com/guy.van.nueten/">
        <Instagram className={styles["icon"]} />
      </Link>
    </nav>
  );
}
