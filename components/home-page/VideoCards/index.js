import * as Styled from "./styles";

import VideoCard from "../VideoCard";

const VideoCards = ({ title, videos }) => {
  return (
    <Styled.VideosCardContainer>
      <h2>{title}</h2>
      <Styled.VideoCards>
        {videos.map((video) => {
          return (
            <VideoCard
              key={video.id}
              isLive={video.snippet.liveBroadcastContent === "live"}
              title={video.snippet.title}
              views={video.statistics.viewCount}
              timestamp={video.snippet.publishedAt}
              duration={video.contentDetails.duration}
              thumbnail={video.snippet.thumbnails.medium}
              channel={video.channelDetails.snippet.title}
              channelThumbnail={video.channelDetails.snippet.thumbnails.default}
            />
          );
        })}
      </Styled.VideoCards>
      );
    </Styled.VideosCardContainer>
  );
};

export default VideoCards;
