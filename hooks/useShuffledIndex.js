import { useEffect, useState } from "react";

export function useShuffledIndex(length) {
  const [shuffledIndexValues, setShuffledIndexValues] = useState([]);

  useEffect(() => {
    const shuffleIndices = () => {
      return Array.from({ length }, (_, i) => i).sort(
        () => Math.random() - 0.5
      );
    };

    setShuffledIndexValues(shuffleIndices());
  }, [length]);

  return shuffledIndexValues;
}
