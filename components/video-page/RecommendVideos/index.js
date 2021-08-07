import VideoCard from './VideoCard';

const RecommendVideos = ({ videos, setLastRecommendVideo }) => {
  return (
    <>
      {videos.map((video, index) => {
        const lastVideo = videos.length === index + 1;
        if (lastVideo) {
          return (
            <VideoCard
              key={video.id.videoId}
              videoId={video.id.videoId}
              videoThumbnail={video.snippet.thumbnails.medium}
              videoDuration={video.contentDetails.duration}
              videoTitle={video.snippet.title}
              channelTitle={video.snippet.channelTitle}
              viewCount={video.statistics.viewCount}
              publishedAt={video.snippet.publishedAt}
              setLastRecommendVideo={setLastRecommendVideo}
            />
          );
        }

        return (
          <VideoCard
            key={video.id.videoId}
            videoId={video.id.videoId}
            videoThumbnail={video.snippet.thumbnails.medium}
            videoDuration={video.contentDetails.duration}
            videoTitle={video.snippet.title}
            channelTitle={video.snippet.channelTitle}
            viewCount={video.statistics.viewCount}
            publishedAt={video.snippet.publishedAt}
          />
        );
      })}
    </>
  );
};

export default RecommendVideos;
