import Canvas from "@components/canvas/Canvas";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
      </main>
      <Canvas />

      <Footer />
    </div>
  );
}
