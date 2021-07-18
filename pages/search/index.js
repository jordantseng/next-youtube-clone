import VideoCard from "../../components/search-page/VideoCard";

import * as Styled from "./styles";

const SearchPage = ({ searchedVideos }) => {
  console.log("searchedVideos", searchedVideos);
  return (
    <Styled.SearchPageContainer>
      {searchedVideos.map((video) => {
        return (
          <VideoCard
            key={video.id.videoId}
            isLive={video.snippet.liveBroadcastContent === "live"}
            title={video.snippet.title}
            views={video.statistics.viewCount}
            timestamp={video.snippet.publishedAt}
            duration={video.contentDetails.duration}
            thumbnail={video.snippet.thumbnails.medium.url}
            channel={video.channelDetails.title}
            channelThumbnail={video.channelDetails.thumbnails.default.url}
            description={video.snippet.description}
          />
        );
      })}
    </Styled.SearchPageContainer>
  );
};

export default SearchPage;
