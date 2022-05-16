import { useState } from "react";
import { Link } from "react-router-dom";
import UseVideosList from "../Hooks/UseVideosList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";

const Videos = () => {
  const { loading, error, videos, hasMore } = UseVideosList(0);
  const [page, setPage] = useState(1);

  return (
    <div className={classes.videos}>
      {videos.length > 0 &&
        videos.map((video) => (
          <Link to="/quiz" key={video.youtubeId}>
            <Video title={video.title} id={video.youtubeID} noq={video.noq} />
          </Link>
        ))}

      {!loading && videos.length === 0 && <div>No Data Found!</div>}
      {error && <div>Something went wrong!</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Videos;
