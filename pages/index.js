import Canvas from "@components/canvas/Canvas";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Head from "next/head";
import { createContext, useState } from "react";
export const AudioMetaContext = createContext(null);
export const GenreContext = createContext(null);

export default function Home() {
  const [song, setSong] = useState(null);
  const [url, setUrl] = useState(null);
  const [albumCover, setAlbumCover] = useState(null);
  const [genre, setGenre] = useState("All");

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GenreContext.Provider
        value={{
          genre,
          setGenre,
        }}
      >
        <main>
          <Header />
        </main>
        <AudioMetaContext.Provider
          value={{
            song,
            setSong,
            url,
            setUrl,
            albumCover,
            setAlbumCover,
          }}
        >
          <Canvas />
          <Footer />
        </AudioMetaContext.Provider>
      </GenreContext.Provider>
    </div>
  );
}
