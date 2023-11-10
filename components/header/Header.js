import { genreContext } from "pages";
import { useContext } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const { genre, setGenre } = useContext(genreContext);

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
      {genres.map((genreItem) => (
        <button
          className={`${styles["category-button"]} ${
            genreItem === genre ? styles["active"] : ""
          }`}
          onClick={() => setGenre(genreItem)}
          key={genreItem}
        >
          {genreItem}
        </button>
      ))}
    </div>
  );
}
