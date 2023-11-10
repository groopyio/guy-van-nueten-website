import { songIndexContext } from "pages";
import { useContext, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [activeGenre, setActiveGenre] = useState("all");
  const { currentIndex, setCurrentIndex, shuffledIndexes, setShuffledIndexes } =
    useContext(songIndexContext);

  const genres = [
    "piano",
    "electronic",
    "orchestral",
    "song",
    "contemporary",
    "old styles",
    "pop",
    "live",
    "stage",
    "film",
    "minimal",
    "all",
  ];
  return (
    <div className={styles["category-selection-list"]}>
      {genres.map((genre) => (
        <button
          className={`${styles["category-button"]} ${
            genre === activeGenre ? styles["active"] : ""
          }`}
          key={genre}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
