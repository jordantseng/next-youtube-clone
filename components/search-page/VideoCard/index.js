import Image from "next/image";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import Avatar from "@material-ui/core/Avatar";

import * as Styled from "./styles";

const VideoCard = ({
  isLive,
  title,
  views,
  timestamp,
  duration,
  thumbnail,
  channel,
  channelThumbnail,
  description,
}) => {
  const transformedViews =
    +views >= 10000 ? `${Math.trunc(+views / 10000)}萬次` : `${+views}次`;

  const transformedTimeStamp = () => {
    const start = dayjs(timestamp);
    const now = dayjs(new Date());
    const hourDiff = now.diff(start, "hour");

    if (hourDiff > 24) {
      return `${now.diff(start, "day")}天前`;
    }

    if (hourDiff > 24 * 30) {
      return `${now.diff(start, "month")}月前`;
    }

    if (hourDiff > 24 * 30 * 12) {
      return `${now.diff(start, "year")}年前`;
    }

    return `${hourDiff}小時前`;
  };

  const transformedDuration = () => {
    if (isLive) {
      return "直播中";
    }

    const totalSeconds = dayjs.duration(duration).asSeconds();
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = Math.trunc(totalSeconds % 60);

    return `${hours === 0 ? "" : hours + ":"}${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Styled.VideoCard href="/">
      <Styled.VideoThumbnail>
        <Image
          src={thumbnail}
          alt=""
          layout="responsive"
          width="320"
          height="180"
        />
        <Styled.VideoTimeStamp isLive={isLive}>
          {transformedDuration()}
        </Styled.VideoTimeStamp>
      </Styled.VideoThumbnail>
      <Styled.VideoInfo>
        <h4>{title}</h4>
        <p>
          觀看次數：{transformedViews} ・ {transformedTimeStamp()}
        </p>
        <Styled.VideoChannel>
          <Avatar style={{ width: "30px", height: "30px" }}>
            <Image
              src={channelThumbnail}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </Avatar>
          <p>{channel}</p>
        </Styled.VideoChannel>
        <Styled.VideoDescription>{description}</Styled.VideoDescription>
      </Styled.VideoInfo>
    </Styled.VideoCard>
  );
};

export default VideoCard;
