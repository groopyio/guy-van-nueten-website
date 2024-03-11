import { useEffect, useMemo, useState } from "react";

export function useShuffledIndices(audioFiles, startSample) {
  const [shuffledIndices, setShuffledIndices] = useState([]);

  useEffect(() => {
    if (!audioFiles.length) return;

    const shuffleIndices = () => {
      return Array.from({ length: audioFiles.length }, (_, i) => i).sort(
        () => Math.random() - 0.5
      );
    };

    setShuffledIndices(shuffleIndices());
  }, [audioFiles]);

  const rearrangedShuffledIndices = useMemo(() => {
    if (!startSample || shuffledIndices.length === 0) {
      return shuffledIndices;
    }

    const startSampleIndex = audioFiles.findIndex(
      (song) => song.filename === startSample.filename
    );

    const startSampleShuffledIndex = shuffledIndices.findIndex(
      (index) => index === startSampleIndex
    );

    if (startSampleShuffledIndex < 0) {
      return shuffledIndices;
    }

    return [
      shuffledIndices[startSampleShuffledIndex],
      ...shuffledIndices.slice(0, startSampleShuffledIndex),
      ...shuffledIndices.slice(startSampleShuffledIndex + 1),
    ];
  }, [audioFiles, shuffledIndices, startSample]);

  return rearrangedShuffledIndices;
}
