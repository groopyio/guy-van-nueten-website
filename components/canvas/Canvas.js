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
        <>
          <img
            className={styles["album-cover"]}
            src={`${albumCover}.webp`}
            alt="album cover"
          />
          <img
            className={styles["background-image"]}
            src="Blank-LP-Cover.webp"
            alt="Blank LP Cover"
          />
        </>
      )}
    </>
  );
}
