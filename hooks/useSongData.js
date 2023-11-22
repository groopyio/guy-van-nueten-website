import { useEffect } from "react";

export function useSongData(audioFiles, audioUrl, setSong) {
  useEffect(() => {
    const loadSongData = () => {
      if (!audioUrl) return;
      const filename = audioUrl.split("/").pop();
      const songData = audioFiles.find((obj) => obj.filename === filename);
      const {
        album,
        artist,
        composer,
        content_type,
        project,
        publisher,
        spotify,
        title,
        year,
        youtube,
      } = songData;

      if (songData) {
        setSong({
          album: album.replace(/\.[^/.]+$/, ""),
          artist,
          composer,
          content_type,
          project,
          publisher,
          spotify,
          title,
          year,
          youtube,
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
