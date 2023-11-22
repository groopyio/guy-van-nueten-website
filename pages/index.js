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
        <title>
          Guy van Nueten – Belgian Composer & Pianist | Official Music Site
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Explore the sonic world of Guy van Nueten, a renowned Belgian composer and pianist. Dive into his genre-defying music, from Belpop classics like April and June to contemporary classical masterpieces. Discover his latest albums and compositions on the official site."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Guy van Nueten – Belgian Composer & Pianist | Official Music Site"
        />
        <meta
          property="og:description"
          content="Belgian musician Guy van Nueten's official website features a unique interactive music player, genre selection, and exclusive content on his celebrated compositions and recordings."
        />
        <meta
          property="og:image"
          content="https://www.guyvannueten.com/guyvannueten.webp"
        />
        <meta property="og:url" content="https://www.guyvannueten.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Guy van Nueten – Belgian Composer & Pianist | Official Music Site"
        />
        <meta
          name="twitter:description"
          content="Belgian musician Guy van Nueten's official website features a unique interactive music player, genre selection, and exclusive content on his celebrated compositions and recordings."
        />
        <meta
          name="twitter:image"
          content="https://www.guyvannueten.com/guyvannueten.webp"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "MusicGroup",
            name: "Guy van Nueten",
            url: "https://www.guyvannueten.com",
            image: "https://www.guyvannueten.com/guyvannueten.webp",
            description:
              "Belgian composer and pianist known for his genre-defying music and collaborations across Europe.",
            album: ["Merg", "Pacman", "Contact"],
            member: [
              {
                "@type": "Person",
                name: "Guy van Nueten",
                sameAs: "http://www.wikipedia.org/Guy_van_Nueten",
              },
            ],
          })}
        </script>
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
