import Contact from "@components/mailing-options/Contact";
import MediaPlayer from "@components/media-player/MediaPlayer";
import Socials from "@components/socials/Socials";
import SongkickToggle from "@components/songkick/toggle/SongkickToggle";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-icons"]}>
        <Socials />
        <SongkickToggle />
        <Contact />
      </div>
      <MediaPlayer />
    </footer>
  );
}
