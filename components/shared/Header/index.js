import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Image from "next/image";

import Searchbox from "../Searchbox";

import * as Styled from "./styles";

const Header = ({ onSearchClick, setSidebarOpen, searchInputRef }) => {
  return (
    <Styled.Header>
      <Styled.LeftHeader>
        <MenuIcon
          onClick={() => setSidebarOpen((sidebarOpen) => !sidebarOpen)}
        />
        <Styled.LogoLink href="/">
          <Image
            src="/images/1024px-YouTube_Logo_2017.png"
            alt="youtubeLogo"
            layout="fixed"
            width="90"
            height="20"
          />
        </Styled.LogoLink>
      </Styled.LeftHeader>
      <Searchbox
        searchInputRef={searchInputRef}
        onSearchClick={onSearchClick}
      />
      <Styled.RightHeader>
        <Styled.IconLink href="/">
          <VideoCallIcon />
        </Styled.IconLink>
        <Styled.IconLink href="/">
          <AppsIcon />
        </Styled.IconLink>
        <Styled.IconLink href="/">
          <NotificationsIcon />
        </Styled.IconLink>
        <Styled.IconLink href="/">
          <Avatar />
        </Styled.IconLink>
      </Styled.RightHeader>
    </Styled.Header>
  );
};

export default Header;
