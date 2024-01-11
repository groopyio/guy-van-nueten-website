import { Eye, EyeClosed } from "iconoir-react";
import { ConcertContext } from "pages";
import { useContext } from "react";
import styles from "./SongKickToggle.module.css";

export default function SongKickToggle() {
  const { concertsIsToggled, setConcertsIsToggled } =
    useContext(ConcertContext);
  return (
    <div
      className={styles["toggle-container"]}
      onClick={() => setConcertsIsToggled(!concertsIsToggled)}
    >
      {concertsIsToggled ? (
        <Eye className={styles["icon"]} />
      ) : (
        <EyeClosed className={styles["icon"]} />
      )}
      <p className={styles["label"]}>Concerts</p>
    </div>
  );
}
