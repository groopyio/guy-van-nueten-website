import MailReferences from "@components/mailing-options/MailReferences";
import MediaPlayer from "@components/media-player/MediaPlayer";
import Socials from "@components/socials/Socials";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <Socials />
      <MailReferences />
      <MediaPlayer />
    </footer>
  );
}
