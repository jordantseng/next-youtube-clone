import VideoCards from "../components/home-page/VideoCards";

import useFetchVideos from "../hooks/useFetchVideos";

const Home = () => {
  const { loading, videos, error } = useFetchVideos();

  if (loading) {
    return "loading...";
  }

  return (
    <>
      <VideoCards videos={videos} />
    </>
  );
};

export default Home;
