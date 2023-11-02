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
    <div className="genres">
      {genres.map((genre) => (
        <p key={genre}>{genre}</p>
      ))}
    </div>
  );
}
