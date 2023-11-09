import { Play, SkipNext, SkipPrev, Spotify, Youtube } from "iconoir-react";
import jsmediatags from "jsmediatags";
import { MetaContext } from "pages";
import { useContext, useEffect, useState } from "react";
import styles from "./MediaPlayer.module.css";

export default function MediaPlayer() {
  const { songMeta, setSongMeta, urlMeta } = useContext(MetaContext);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const SCOPE = "https://www.googleapis.com/auth/drive.readonly";
    const DISCOVERY_DOC =
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
    let tokenClient;
    const authClient =
      "908602024669-vlfrc7vbqvtkc4mu0t9dc8kms13r102d.apps.googleusercontent.com";

    const initGapi = () => {
      gapi.load("client", initializeGapiClient);
    };

    async function initializeGapiClient() {
      await gapi.client.init({
        apiKey: "",
        discoveryDocs: [DISCOVERY_DOC],
      });
    }

    const initClient = () => {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: authClient,
        scope: SCOPE,
        prompt: "",
        callback: async (response) => {
          if (response.error !== undefined) {
            throw response;
          }
          await listAudioFiles();
        },
      });
      tokenClient.requestAccessToken();
    };

    async function listAudioFiles() {
      let response;
      try {
        response = await gapi.client.drive.files.list({
          pageSize: 100,
          fields: "files(id, name)",
        });
      } catch (err) {
        return;
      }
      const files = response.result.files;
    }

    const apiScript = document.createElement("script");
    const clientScript = document.createElement("script");

    apiScript.src = "https://apis.google.com/js/api.js";
    apiScript.async = true;
    apiScript.defer = true;
    apiScript.onload = initGapi;

    clientScript.src = "https://accounts.google.com/gsi/client";
    clientScript.async = true;
    clientScript.defer = true;
    clientScript.onload = initClient;

    document.body.appendChild(apiScript);
    document.body.appendChild(clientScript);
    return () => {
      document.body.removeChild(apiScript);
      document.body.appendChild(clientScript);
    };
  }, []);

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
      },
      onError: (error) => {
        console.error(error);
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
      <input
        id="audioinput"
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
      />
      <audio id="audioplayer" controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio format.
      </audio>
    </div>
  );
}
