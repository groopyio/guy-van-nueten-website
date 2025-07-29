import BandsintownEvents from "@components/bandsintown/BandsintownEvents";
import BandsintownIcon from "@components/icons/BandsintownIcon";
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
          className={`${styles["bandsintown-events"]} ${
            concertsIsToggled ? styles["enabled"] : styles["disabled"]
          }`}
        >
          <div className={styles.header}>
            <span>
              Get updates on <br />
              Guy's new shows & music
            </span>
            <a
              href="https://www.bandsintown.com/a/370923?follow=true"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.followButton}
            >
              <BandsintownIcon />
              FOLLOW
            </a>
          </div>
          <BandsintownEvents />
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
