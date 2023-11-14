import { useAlbumCoverAndFirstIndex } from "@hooks/useAlbumCoverAndFirstIndex";
import { useAudioPlayer } from "@hooks/useAudioPlayer";
import { useGenreChange } from "@hooks/useGenreChange";
import { useLoadID3Tags } from "@hooks/useLoadID3Tags";
import { useShuffledIndex } from "@hooks/useShuffledIndex";
import { AudioMetaContext, GenreContext } from "pages";
import { useContext } from "react";
import styles from "./MediaPlayer.module.css";
import { MediaControls } from "./media-controls/MediaControls";
import { SongMetadata } from "./song-meta-data/SongMetaData";
import { SourceLinks } from "./source-links/SourceLinks";
import audioList from "/public/audio_list.json";

export default function MediaPlayer() {
  const { song, setSong, url, setAlbumCover } = useContext(AudioMetaContext);
  const { genre } = useContext(GenreContext);
  const audioFiles = audioList["files"];
  const shuffledIndices = useShuffledIndex(audioFiles.length);

  const {
    currentIndex,
    audioUrl,
    isPlaying,
    isOnFirstIndex,
    audioRef,
    handlePlayPause,
    handleNext,
    handlePrevious,
    setCurrentIndex,
    setIsOnFirstIndex,
  } = useAudioPlayer(audioFiles, shuffledIndices, genre);

  useLoadID3Tags(audioUrl, setSong);
  useAlbumCoverAndFirstIndex(
    currentIndex,
    audioFiles,
    shuffledIndices,
    setAlbumCover,
    setIsOnFirstIndex
  );
  useGenreChange(genre, audioFiles, shuffledIndices, setCurrentIndex);

  return (
    <div className={styles["mediaplayer-container"]}>
      <MediaControls
        isPlaying={isPlaying}
        isOnFirstIndex={isOnFirstIndex}
        handlePlay={handlePlayPause}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />

      <SongMetadata song={song} url={url} />

      <SourceLinks song={song} genre={genre} />

      <audio
        ref={audioRef}
        id="audioplayer"
        className={styles["audioplayer"]}
        onEnded={handleNext}
        controls
      >
        {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
        Your browser does not support the audio format.
      </audio>
    </div>
  );
}
