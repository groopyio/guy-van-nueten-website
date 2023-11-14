import jsmediatags from "jsmediatags";
import { AudioMetaContext, GenreContext } from "pages";
import { useContext, useEffect, useState } from "react";
import { MediaControls } from "./MediaControls";
import styles from "./MediaPlayer.module.css";
import { SongMetadata } from "./SongMetaData";
import { SourceLinks } from "./SourceLinks";
import audioList from "/public/audio_list.json";

export default function MediaPlayer() {
  const { song, setSong, url, setAlbumCover } = useContext(AudioMetaContext);
  const { genre } = useContext(GenreContext);
  const [shuffledIndexValues, setShuffledIndexValues] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioUrl, setAudioUrl] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatLoop, setRepeatLoop] = useState(false);
  const [isOnFirstIndex, setIsOnFirstIndex] = useState(true);
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
    setShuffledIndexValues(randomiseIndexOrder(audioListLength - 1));
  }, []);

  useEffect(() => {
    shuffledIndexValues &&
      setAudioUrl(
        `audio/${audioFiles[shuffledIndexValues[currentIndex]].filename}`
      );
  }, [shuffledIndexValues]);

  useEffect(() => {
    const loadId3Tags = async () => {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const file = new File([blob], audioUrl, { type: "audio/*" });
      jsmediatags?.read(file, {
        onSuccess: (meta) => {
          const userDescription = meta.tags.TXXX?.data?.user_description;
          const data = meta.tags.TXXX?.data?.data;
          setSong({
            title: meta.tags.title,
            composer: meta.tags.TCOM?.data,
            artist: meta.tags.artist,
            album: meta.tags.album,
            publisher: meta.tags.TPUB?.data,
            year: meta.tags.year,
            contentType: userDescription === "CONTENT_TYPE" && data,
            live: userDescription === "LIVE" && data,
            spotify: meta.tags.TOPE?.data,
            youtube: meta.tags.TCOP?.data,
          });
        },
        onError: (error) => {
          console.error(error);
        },
      });
    };

    audioUrl && loadId3Tags();
  }, [audioUrl]);

  useEffect(() => {
    if (shuffledIndexValues) {
      setAlbumCover(audioFiles[shuffledIndexValues[currentIndex]].album);
      !currentIndex && setIsOnFirstIndex(true);
      const player = document.getElementById("audioplayer");
      player.pause();
      setAudioUrl(
        `audio/${audioFiles[shuffledIndexValues[currentIndex]].filename}`
      );
      player.load();
      if (isPlaying) {
        player.play();
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    if (genre !== "All") {
      const shuffledIndexValuesIndex = shuffledIndexValues.findIndex(
        (indexValue, i) =>
          audioFiles[shuffledIndexValues[i]]?.genres.includes(genre)
      );
      setCurrentIndex(shuffledIndexValuesIndex);
    } else {
      setCurrentIndex(0);
    }
    setRepeatLoop(false);
  }, [repeatLoop]);

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
    setIsOnFirstIndex(false);
    if (genre !== "All") {
      const remainingIndexValues = shuffledIndexValues.slice(currentIndex + 1);
      const remainingIndexValuesIndex = remainingIndexValues.findIndex(
        (indexValue, i) =>
          audioFiles[remainingIndexValues[i]]?.genres.includes(genre)
      );
      const newIndex = currentIndex + remainingIndexValuesIndex;

      remainingIndexValuesIndex === -1
        ? setRepeatLoop(true)
        : setCurrentIndex(newIndex + 1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (genre !== "All") {
      const previousIndexValues = shuffledIndexValues.slice(0, currentIndex);
      const previousIndex = previousIndexValues
        .reverse()
        .findIndex((indexValue, i) =>
          audioFiles[previousIndexValues[i]]?.genres.includes(genre)
        );
      const newIndex = currentIndex - previousIndex;
      previousIndex === -1
        ? setIsOnFirstIndex(true)
        : setCurrentIndex(newIndex - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles["mediaplayer-container"]}>
      <MediaControls
        isPlaying={isPlaying}
        isOnFirstIndex={isOnFirstIndex}
        handlePlay={handlePlay}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <SongMetadata song={song} url={url} />
      <SourceLinks song={song} />
      <audio
        id="audioplayer"
        className={styles["audioplayer"]}
        onEnded={handleNext}
        controls
      >
        {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
        Your browser does not support the audio format.
      </audio>
    </div>
  );
}
