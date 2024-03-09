import { useEffect, useState } from "react";
import { client } from "../tina/__generated__/client";

export function useFetchSamplesData() {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const fetchSamplesData = async () => {
      try {
        const result = await client.queries.samples({
          relativePath: "audio_list.json",
        });
        setAudioFiles(result.data.samples.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSamplesData();
  }, []);

  return audioFiles;
}
