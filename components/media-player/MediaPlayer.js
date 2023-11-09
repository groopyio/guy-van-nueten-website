import { Play, SkipNext, SkipPrev, Spotify, Youtube } from "iconoir-react";
import jsmediatags from "jsmediatags";
import { MetaContext } from "pages";
import { useContext, useState } from "react";
import styles from "./MediaPlayer.module.css";

export default function MediaPlayer() {
  const { songMeta, setSongMeta, urlMeta } = useContext(MetaContext);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const player = document.getElementById("audioplayer");
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    jsmediatags?.read(file, {
      onSuccess: (meta) => {
        const isTXXXArray = Array.isArray(meta.tags.TXXX);
        const getCustomTag = (userDescription) => {
          isTXXXArray
            ? meta.tags.TXXX?.find(
                (tag) => tag.user_description === userDescription
              )?.data
            : meta.tags.TXXX?.data.user_description === userDescription &&
              meta.tags.TXXX?.data.data;
        };
        setSongMeta({
          title: meta.tags.title,
          composer: meta.tags.TCOM?.data,
          artist: meta.tags.artist,
          album: meta.tags.album,
          publisher: meta.tags.TPUB?.data,
          year: meta.tags.year,
          contentType: getCustomTag("CONTENT_TYPE"),
          live: getCustomTag("LIVE"),
        });
        console.log(songMeta);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className={styles["mediaplayer-container"]}>
      <div className={styles["controls"]}>
        <SkipPrev />
        <Play onClick={handlePlay} />
        <SkipNext />
      </div>
      <div className={styles["metadata"]}>
        {!urlMeta && songMeta ? (
          <>
            <div className={styles["music-info"]}>
              <samp>{songMeta.title}</samp>
              <samp>{songMeta.composer}</samp>
            </div>
            <div className={styles["song-details"]}>
              <samp>{songMeta.artist}</samp>
              <samp>{songMeta.album}</samp>
              <samp>{songMeta.publisher}</samp>
              <samp>{songMeta.year}</samp>
            </div>
            <div className={styles["production-info"]}>
              <samp>{songMeta.contentType}</samp>
              <samp>{songMeta.live}</samp>
            </div>
          </>
        ) : (
          <div className={styles["url"]}>
            <samp>{urlMeta}</samp>
          </div>
        )}
      </div>
      <div className={styles["sources"]}>
        <Spotify />
        <Youtube />
      </div>
      <input type="file" accept="audio/*" onChange={handleAudioChange} />
      <audio id="audioplayer" controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio format.
      </audio>
    </div>
  );
}
