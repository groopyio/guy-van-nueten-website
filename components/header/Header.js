import styles from "./Header.module.css";

export default function Header() {
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
        <button className={styles["category-button"]} key={genre}>
          {genre}
        </button>
      ))}
    </div>
  );
}
