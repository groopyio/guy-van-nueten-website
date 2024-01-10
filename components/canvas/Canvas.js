import { useCanvasImages } from "@hooks/useCanvasImages";
import { AudioMetaContext } from "pages";
import { useContext, useRef } from "react";
import styles from "./Canvas.module.css";

export default function Canvas() {
  const canvasRef = useRef(null);
  const { albumCover } = useContext(AudioMetaContext);
  useCanvasImages(canvasRef);

  return (
    <>
      <canvas className={styles["bouncing-images"]} ref={canvasRef} />
      {albumCover && (
        <div className={styles["album-cover-container"]}>
          <img
            className={styles["album-cover"]}
            src={`${albumCover}.webp`}
            alt="album cover"
          />
        </div>
      )}
    </>
  );
}
