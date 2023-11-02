import { Facebook, Instagram } from "iconoir-react";
import Link from "next/link";
import styles from "./Socials.module.css";

export default function Socials() {
  return (
    <div className={styles["icon-container"]}>
      <Link href="https://www.facebook.com/guyvannueten/">
        <Facebook />
      </Link>
      <Link href="https://www.discogs.com/artist/385715-Guy-Van-Nueten?filter_anv=0&type=Credits">
        <img src="/discogs.svg" alt="discogs-logo" />
      </Link>
      <Link href="https://www.instagram.com/guy.van.nueten/">
        <Instagram />
      </Link>
    </div>
  );
}
