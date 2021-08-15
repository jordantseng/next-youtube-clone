import { useContext } from 'react';

import HomeIcon from '@material-ui/icons/Home';
import WhatsotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

import SidebarRow from './SidebarRow/index';

import UserContext from '../../../contexts/userContext';

import * as Styled from './styles';

const topSidebarItems = [
  { title: '首頁', href: '/', Icon: HomeIcon },
  { title: '探索', href: '/', Icon: WhatsotIcon },
  { title: '訂閱內容', href: '/', Icon: VideoLibraryIcon },
];

const bottomSidebarItems = [
  { title: '媒體庫', href: '/', Icon: SubscriptionsIcon },
  { title: '觀看紀錄', href: '/', Icon: VideoLibraryIcon },
  { title: '你的影片', href: '/', Icon: OndemandVideoIcon },
  { title: '稍後觀看', href: '/', Icon: WatchLaterIcon },
  { title: '喜歡的影片', href: '/', Icon: ThumbUpAltOutlinedIcon },
];

const Sidebar = ({ sidebarOpen }) => {
  const { user } = useContext(UserContext);

  return (
    <Styled.SidebarContainer sidebarOpen={sidebarOpen}>
      {topSidebarItems.map((item) => (
        <SidebarRow
          key={item.title}
          title={item.title}
          href={item.href}
          Icon={item.Icon}
          sidebarOpen={sidebarOpen}
        />
      ))}
      <hr />
      {user && (
        <>
          {bottomSidebarItems.map((item) => (
            <SidebarRow
              key={item.title}
              title={item.title}
              href={item.href}
              Icon={item.Icon}
              sidebarOpen={sidebarOpen}
            />
          ))}
          <hr />
        </>
      )}
    </Styled.SidebarContainer>
  );
};

export default Sidebar;
