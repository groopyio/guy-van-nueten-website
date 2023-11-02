import MailingOptions from "@components/mailing-options/MailingOptions";
import MediaPlayer from "@components/media-player/MediaPlayer";
import Socials from "@components/socials/Socials";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <Socials />
      <MailingOptions />
      <MediaPlayer />
    </footer>
  );
}
