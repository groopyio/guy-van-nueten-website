import { Pause, Play, SkipNext, SkipPrev } from "iconoir-react";
import styles from "./MediaControls.module.css";
export function MediaControls({
  isPlaying,
  isOnFirstIndex,
  handlePlay,
  handleNext,
  handlePrevious,
}) {
  return (
    <div className={styles["controls"]}>
      <SkipPrev
        className={`${styles["control"]} ${
          isOnFirstIndex ? styles["disabled"] : ""
        }`}
        onClick={!isOnFirstIndex ? handlePrevious : () => {}}
      />
      {isPlaying ? (
        <Pause className={styles["control"]} onClick={handlePlay} />
      ) : (
        <Play className={styles["control"]} onClick={handlePlay} />
      )}
      <SkipNext className={styles["control"]} onClick={handleNext} />
    </div>
  );
}
