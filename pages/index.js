import Canvas from "@components/canvas/Canvas";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Head from "next/head";
import { createContext, useState } from "react";
export const MetaContext = createContext(null);
export const genreContext = createContext(null);

export default function Home() {
  const [songMeta, setSongMeta] = useState(null);
  const [urlMeta, setUrlMeta] = useState(null);
  const [genre, setGenre] = useState("All");

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <genreContext.Provider
        value={{
          genre,
          setGenre,
        }}
      >
        <main>
          <Header />
        </main>
        <MetaContext.Provider
          value={{
            songMeta,
            setSongMeta,
            urlMeta,
            setUrlMeta,
          }}
        >
          <Canvas />
          <Footer />
        </MetaContext.Provider>
      </genreContext.Provider>
    </div>
  );
}
