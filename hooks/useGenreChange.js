import { useEffect } from "react";

export function useGenreChange(
  genre,
  audioFiles,
  shuffledIndices,
  setCurrentIndex
) {
  useEffect(() => {
    if (genre !== "All") {
      const newIndex = shuffledIndices.findIndex((index) =>
        audioFiles[index]?.genres.includes(genre)
      );

      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
      } else {
        setCurrentIndex(0);
      }
    }
  }, [genre, audioFiles, shuffledIndices, setCurrentIndex]);
}
