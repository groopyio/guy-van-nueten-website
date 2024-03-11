import { useEffect } from "react";

export function useAlbumCoverAndFirstIndex(
  currentIndex,
  audioFiles,
  shuffledIndices,
  setAlbumCover,
  setIsOnFirstIndex,
  isPlaying,
  promotionalAlbumCover
) {
  useEffect(() => {
    if (audioFiles.length > 0 && shuffledIndices.length > 0) {
      if (!isPlaying) {
        setAlbumCover(promotionalAlbumCover);
      } else {
        setAlbumCover(audioFiles[shuffledIndices[currentIndex]].albumcover);
        setIsOnFirstIndex(currentIndex === 0);
      }
    }
  }, [
    currentIndex,
    audioFiles,
    shuffledIndices,
    setAlbumCover,
    setIsOnFirstIndex,
    isPlaying,
    promotionalAlbumCover,
  ]);
}
