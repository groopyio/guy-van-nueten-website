import { useEffect, useRef, useState } from "react";
import styles from "./SongMetaData.module.css";

export function SongMetadata({ song, url }) {
  const {
    title,
    composer,
    origin,
    project,
    year,
    artist,
    publisher,
    venue_date,
    isLive,
  } = song;

  const elements = [
    { id: "title", text: `${title} (${composer})` },
    {
      id: "artist",
      text: artist && composer !== artist ? `Performed by ${artist}` : null,
    },
    { id: "project", text: project ? `from ${origin} '${project}'` : null },
    {
      id: "live",
      text:
        isLive && venue_date ? `Live at ${venue_date}` : `${year} ${publisher}`,
    },
  ].filter((item) => item.text !== null);

  const containerRefs = useRef([]);
  const textRefs = useRef([]);
  const [overflowStates, setOverflowStates] = useState(
    elements.map(() => false)
  );

  useEffect(() => {
    const newOverflowStates = elements.map((_, index) => {
      const containerWidth = containerRefs.current[index]?.offsetWidth || 0;
      const textWidth = textRefs.current[index]?.offsetWidth || 0;
      return textWidth > containerWidth;
    });

    setOverflowStates(newOverflowStates);
  }, [title, composer, artist, project, isLive, venue_date, year, publisher]);

  return (
    <div className={styles["metadata"]}>
      <div className={styles["song-meta"]}>
        {!url && song ? (
          <div className={styles["music-info"]}>
            {elements.map((element, index) => (
              <div
                key={element.id}
                className={styles["scroll-container"]}
                ref={(el) => (containerRefs.current[index] = el)}
              >
                <samp
                  className={
                    overflowStates[index] ? styles["scrolling-text"] : ""
                  }
                  ref={(el) => (textRefs.current[index] = el)}
                >
                  {element.text}
                </samp>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles["url"]}>
            <samp>{url}</samp>
          </div>
        )}
      </div>
    </div>
  );
}
