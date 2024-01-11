import { Eye, EyeClosed } from "iconoir-react";
import { useState } from "react";
import styles from "./SongKickToggle.module.css";

export default function SongKickToggle() {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <div
      className={styles["toggle-container"]}
      onClick={() => setIsToggled(!isToggled)}
    >
      {isToggled ? (
        <Eye className={styles["icon"]} />
      ) : (
        <EyeClosed className={styles["icon"]} />
      )}
      <p className={styles["label"]}>Concerts</p>
    </div>
  );
}
