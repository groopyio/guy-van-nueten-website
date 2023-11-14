import jsmediatags from "jsmediatags";
import { useEffect } from "react";

export function useLoadID3Tags(audioUrl, setSong) {
  useEffect(() => {
    const loadId3Tags = async () => {
      if (!audioUrl) return;

      try {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const file = new File([blob], audioUrl, { type: "audio/*" });
        jsmediatags.read(file, {
          onSuccess: (tag) => {
            const { title, artist, album, year, TCOM, TPUB, TOPE, TCOP, TXXX } =
              tag.tags;

            setSong({
              title,
              artist,
              album,
              year,
              composer: TCOM?.data,
              publisher: TPUB?.data,
              spotify: TOPE?.data, // Assuming TOPE is used for Spotify URL
              youtube: TCOP?.data, // Assuming TCOP is used for YouTube URL
              contentType:
                TXXX?.data?.user_description === "CONTENT_TYPE"
                  ? TXXX.data.data
                  : null,
              live:
                TXXX?.data?.user_description === "LIVE" ? TXXX.data.data : null,
            });
          },
          onError: (error) => {
            console.error("Error reading ID3 tags:", error);
          },
        });
      } catch (error) {
        console.error("Error fetching audio file:", error);
      }
    };

    loadId3Tags();
  }, [audioUrl, setSong]);
}
