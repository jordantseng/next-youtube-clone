import HomeIcon from "@material-ui/icons/Home";
import WhatsotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import SidebarRow from "./SidebarRow/index";

import * as Styled from "./styles";

const topSidebarItems = [
  { title: "首頁", Icon: HomeIcon },
  { title: "探索", Icon: WhatsotIcon },
  { title: "訂閱內容", Icon: VideoLibraryIcon },
];

const bottomSidebarItems = [
  { title: "媒體庫", Icon: SubscriptionsIcon },
  { title: "觀看紀錄", Icon: VideoLibraryIcon },
  { title: "你的影片", Icon: OndemandVideoIcon },
  { title: "稍後觀看", Icon: WatchLaterIcon },
  { title: "喜歡的影片", Icon: ThumbUpAltOutlinedIcon },
];

const Sidebar = ({ sidebarOpen }) => {
  return (
    <Styled.Sidebar sidebarOpen={sidebarOpen}>
      {topSidebarItems.map((item) => (
        <SidebarRow
          key={item.title}
          title={item.title}
          Icon={item.Icon}
          sidebarOpen={sidebarOpen}
        />
      ))}
      <hr />
      {bottomSidebarItems.map((item) => (
        <SidebarRow
          key={item.title}
          title={item.title}
          Icon={item.Icon}
          sidebarOpen={sidebarOpen}
        />
      ))}
      <hr />
    </Styled.Sidebar>
  );
};

export default Sidebar;
