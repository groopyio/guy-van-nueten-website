import { useEffect } from "react";

export function useSongData(audioFiles, audioUrl, setSong) {
  useEffect(() => {
    const loadSongData = () => {
      if (!audioUrl) return;
      const songData = audioFiles.find((obj) => obj.filename === audioUrl);
      const {
        title,
        composer,
        origin,
        project,
        year,
        artist,
        publisher,
        venue_date,
        spotify,
        youtube,
        genres,
        isLive,
      } = songData;

      if (songData) {
        setSong({
          title,
          composer,
          origin,
          project,
          year,
          artist,
          publisher,
          venue_date,
          spotify,
          youtube,
          genres,
          isLive,
        });
      } else {
        setSong({
          title: filename,
        });
      }
    };

    loadSongData();
  }, [audioUrl, audioFiles]);
}
