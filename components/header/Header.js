import { GenreContext } from "pages";
import React, { useContext } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const { genre, setGenre } = useContext(GenreContext);

  const genres = [
    "Piano",
    "Electronic",
    "Orchestral",
    "Song",
    "Contemporary",
    "Old Styles",
    "Pop",
    "Live",
    "Stage",
    "Film",
    "Minimal",
    "All",
  ];
  return (
    <div className={styles["category-selection-list"]}>
      {genres.map((genreItem, index) => (
        <React.Fragment key={genreItem}>
          <button
            className={`${styles["category-button"]} ${
              genreItem === genre ? styles["active"] : ""
            }`}
            onClick={() => setGenre(genreItem)}
            key={genreItem}
          >
            {genreItem}
          </button>
          {index !== genres.length - 1 && <span>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
