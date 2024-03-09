import { useEffect, useState } from "react";
import { client } from "../tina/__generated__/client";

export function useFetchTinaCollectionData(collection) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      const methodName = `${collection}Connection`;
      try {
        if (client.queries[methodName]) {
          const result = await client.queries[methodName]({
            first: 1000,
          });
          setData(result.data[methodName].edges.map((post) => post.node));
        } else {
          console.error("Error: Method does not exist:", methodName);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCollectionData();
  }, [collection]);

  return data;
}
