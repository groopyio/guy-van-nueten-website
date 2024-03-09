import { useEffect, useState } from "react";
import { client } from "../tina/__generated__/client";

export function useFetchSamplesData() {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const fetchSamplesData = async () => {
      try {
        const result = await client.queries.samplesConnection({
          first: 1000,
        });
        setAudioFiles(
          result.data.samplesConnection.edges.map((post) => post.node)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSamplesData();
  }, []);

  return audioFiles;
}
