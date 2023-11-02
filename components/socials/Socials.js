import { Facebook, Instagram } from "iconoir-react";
import styles from "./Socials.module.css";

export default function Socials() {
  return (
    <div className={styles["icon-container"]}>
      <Facebook />
      <img src="/discogs.svg" alt="discogs-logo" />
      <Instagram />
    </div>
  );
}
