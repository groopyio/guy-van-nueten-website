import { useEffect } from "react";

export function useSongData(audioFiles, audioUrl, setSong) {
  useEffect(() => {
    const loadSongData = () => {
      if (!audioUrl) return;
      const filename = audioUrl.split("/").pop();
      const songData = audioFiles.find((obj) => obj.filename === filename);

      if (songData) {
        setSong({
          album: songData.album.replace(/\.[^/.]+$/, ""),
          artist: songData.artist,
          composer: songData.composer,
          content_type: songData.content_type,
          project: songData.project,
          publisher: songData.publisher,
          spotify: songData.spotify,
          title: songData.title,
          year: songData.year,
          youtube: songData.youtube,
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
