import Canvas from "@components/canvas/Canvas";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Head from "next/head";
import { createContext, useState } from "react";
export const MetaContext = createContext(null);
export const songIndexContext = createContext(null);

export default function Home() {
  const [songMeta, setSongMeta] = useState(null);
  const [urlMeta, setUrlMeta] = useState(null);
  const [shuffledIndexes, setShuffledIndexes] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <songIndexContext.Provider
        value={{
          shuffledIndexes,
          setShuffledIndexes,
          currentIndex,
          setCurrentIndex,
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
      </songIndexContext.Provider>
    </div>
  );
}
