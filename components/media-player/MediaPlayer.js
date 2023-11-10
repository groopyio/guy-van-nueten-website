import {
  Pause,
  Play,
  SkipNext,
  SkipPrev,
  Spotify,
  Youtube,
} from "iconoir-react";
import jsmediatags from "jsmediatags";
import { MetaContext } from "pages";
import { useContext, useEffect, useState } from "react";
import styles from "./MediaPlayer.module.css";
import audioList from "./audio_list.json";

export default function MediaPlayer() {
  const { songMeta, setSongMeta, urlMeta } = useContext(MetaContext);
  const [audioUrl, setAudioUrl] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffledIndexes, setShuffledIndexes] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioFiles = audioList["files"];
  const audioListLength = audioFiles.length;

  useEffect(() => {
    const randomiseIndexOrder = (index) => {
      if (Number.isInteger(index) && index >= 0) {
        const indexList = Array.from({ length: index + 1 }, (_, i) => i);
        for (let i = indexList.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexList[i], indexList[j]] = [indexList[j], indexList[i]];
        }
        return indexList;
      } else {
        console.error(
          "Invalid input. Please provide a non-negative integer as the index."
        );
        return null;
      }
    };
    setShuffledIndexes(randomiseIndexOrder(audioListLength));
  }, []);

  useEffect(() => {
    shuffledIndexes &&
      setAudioUrl(
        `audio/${audioFiles[shuffledIndexes[currentIndex]].filename}`
      );
  }, [shuffledIndexes]);

  useEffect(() => {
    const loadId3Tags = async () => {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const file = new File([blob], audioUrl, { type: "audio/*" });
      jsmediatags?.read(file, {
        onSuccess: (meta) => {
          const isTXXXArray = Array.isArray(meta.tags.TXXX);
          const getCustomTag = (userDescription) => {
            isTXXXArray
              ? meta.tags.TXXX?.find(
                  (tag) => tag.user_description === userDescription
                )?.data
              : meta.tags.TXXX?.data.user_description === userDescription &&
                meta.tags.TXXX?.data.data;
          };
          setSongMeta({
            title: meta.tags.title,
            composer: meta.tags.TCOM?.data,
            artist: meta.tags.artist,
            album: meta.tags.album,
            publisher: meta.tags.TPUB?.data,
            year: meta.tags.year,
            contentType: getCustomTag("CONTENT_TYPE"),
            live: getCustomTag("LIVE"),
          });
        },
        onError: (error) => {
          console.error(error);
        },
      });
    };

    audioUrl && loadId3Tags();
  }, [audioUrl]);

  const handlePlay = () => {
    const player = document.getElementById("audioplayer");
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const player = document.getElementById("audioplayer");
    setCurrentIndex((currentIndex += 1));
    player.pause();
    setAudioUrl(`audio/${audioFiles[shuffledIndexes[currentIndex]].filename}`);
    player.load();
    if (isPlaying) {
      player.play();
    }
  };

  const handlePrevious = () => {
    const player = document.getElementById("audioplayer");
    setCurrentIndex((currentIndex -= 1));
    player.pause();
    setAudioUrl(`audio/${audioFiles[shuffledIndexes[currentIndex]].filename}`);
    player.load();
    if (isPlaying) {
      player.play();
    }
  };

  return (
    <div className={styles["mediaplayer-container"]}>
      <div className={styles["controls"]}>
        <SkipPrev onClick={handlePrevious} />
        {isPlaying ? (
          <Pause onClick={handlePlay} />
        ) : (
          <Play onClick={handlePlay} />
        )}
        <SkipNext onClick={handleNext} />
      </div>
      <div className={styles["metadata"]}>
        {!urlMeta && songMeta ? (
          <>
            <div className={styles["music-info"]}>
              <samp>{songMeta.title}</samp>
              <samp>{songMeta.composer}</samp>
            </div>
            <div className={styles["song-details"]}>
              <samp>{songMeta.artist}</samp>
              <samp>{songMeta.album}</samp>
              <samp>{songMeta.publisher}</samp>
              <samp>{songMeta.year}</samp>
            </div>
            <div className={styles["production-info"]}>
              <samp>{songMeta.contentType}</samp>
              <samp>{songMeta.live}</samp>
            </div>
          </>
        ) : (
          <div className={styles["url"]}>
            <samp>{urlMeta}</samp>
          </div>
        )}
      </div>
      <div className={styles["sources"]}>
        <Spotify />
        <Youtube />
      </div>
      <audio id="audioplayer" controls>
        {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
        Your browser does not support the audio format.
      </audio>
    </div>
  );
}
