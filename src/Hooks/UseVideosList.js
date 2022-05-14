import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const UseVideosList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideo() {
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(videosRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(videoQuery);
        console.log(snapshot.val);
        setLoading(false);
        if (snapshot.exists()) {
          setVideos();
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchVideo();
  }, []);
};

export default UseVideosList;
