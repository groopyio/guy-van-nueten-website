import SongkickWidget from "@components/songkick/widget/SongkickWidget";
import { useCanvasImages } from "@hooks/useCanvasImages";
import { useFetchTinaCollectionData } from "@hooks/useFetchTinaCollectionData";
import { AudioMetaContext, ConcertContext } from "pages";
import { useContext, useRef } from "react";
import styles from "./Canvas.module.css";

export default function Canvas() {
  const canvasRef = useRef(null);
  const { albumCover } = useContext(AudioMetaContext);
  const { concertsIsToggled } = useContext(ConcertContext);
  const imageRefs = useFetchTinaCollectionData("flying_object");
  useCanvasImages(canvasRef, imageRefs);

  return (
    <>
      <canvas className={styles["bouncing-images"]} ref={canvasRef} />
      <div className={styles["album-cover-container"]}>
        <div
          className={`${styles["songkick-widget"]} ${
            concertsIsToggled ? styles["enabled"] : styles["disabled"]
          }`}
        >
          <SongkickWidget />
        </div>
        {albumCover && !concertsIsToggled && (
          <img
            className={styles["album-cover"]}
            src={albumCover}
            alt="album cover"
          />
        )}
      </div>
    </>
  );
}
