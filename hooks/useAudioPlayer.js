import { useEffect, useRef, useState } from "react";

export function useAudioPlayer(audioList, shuffledIndices, genre) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOnFirstIndex, setIsOnFirstIndex] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioList.length > 0 && shuffledIndices && shuffledIndices.length > 0) {
      setAudioUrl(`${audioList[shuffledIndices[currentIndex]]?.filename}`);
    }
  }, [currentIndex, audioList, shuffledIndices]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [audioUrl, isPlaying]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    let newIndex = currentIndex;
    do {
      newIndex = (newIndex + 1) % audioList.length;
    } while (
      genre !== "All" &&
      !audioList[shuffledIndices[newIndex]]?.genres.includes(genre) &&
      newIndex !== currentIndex
    );

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setIsOnFirstIndex(false);
    }
  };

  const handlePrevious = () => {
    let newIndex = currentIndex;
    do {
      newIndex = newIndex - 1 < 0 ? audioList.length - 1 : newIndex - 1;
    } while (
      genre !== "All" &&
      !audioList[shuffledIndices[newIndex]]?.genres.includes(genre) &&
      newIndex !== currentIndex
    );

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setIsOnFirstIndex(newIndex === 0);
    }
  };

  return {
    currentIndex,
    audioUrl,
    isPlaying,
    isOnFirstIndex,
    audioRef,
    handlePlayPause,
    handleNext,
    handlePrevious,
    setCurrentIndex,
    setIsPlaying,
    setIsOnFirstIndex,
  };
}
