import Contact from "@components/mailing-options/Contact";
import MediaPlayer from "@components/media-player/MediaPlayer";
import Socials from "@components/socials/Socials";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["contact-icons"]}>
        <Socials />
        <Contact />
      </div>
      <MediaPlayer />
    </footer>
  );
}
