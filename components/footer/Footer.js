import Contact from "@components/mailing-options/Contact";
import MediaPlayer from "@components/media-player/MediaPlayer";
import { SourceLinks } from "@components/media-player/source-links/SourceLinks";
import Socials from "@components/socials/Socials";
import SongkickToggle from "@components/songkick/toggle/SongkickToggle";
import { useDeviceQuery } from "@hooks/useDeviceQuery";
import { AudioMetaContext } from "pages";
import { useContext } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const { song } = useContext(AudioMetaContext);
  const { isMobile } = useDeviceQuery();
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-icons"]}>
        <Socials />
        {isMobile && <SourceLinks song={song} />}
        <SongkickToggle />
        <Contact />
      </div>
      <MediaPlayer />
    </footer>
  );
}
