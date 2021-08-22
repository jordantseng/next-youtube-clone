import { useState, useContext } from 'react';
import Image from 'next/image';

import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Menu from '../Menu';
import Searchbox from '../Searchbox';
import Login from '../../ui/Login';
import SkeletonsElement from '../../ui/Skeletons/SkeletonsElement';

import UserContext from '../../../contexts/userContext';

import * as Styled from './styles';

const Header = ({ loadingPopularVideos, setSidebarOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(UserContext);

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
      <Styled.SearchboxContainer>
        <Searchbox />
      </Styled.SearchboxContainer>
      <Styled.RightHeader>
        {loadingPopularVideos ? (
          Array(4)
            .fill(null)
            .map((_, index) => (
              <div style={{ marginRight: index !== 3 && 8 }} key={index}>
                <SkeletonsElement type="avatar" width="30px" height="30px" />
              </div>
            ))
        ) : (
          <>
            {user && (
              <>
                <Styled.IconLink href="/">
                  <VideoCallIcon />
                </Styled.IconLink>
                <Styled.IconLink href="/">
                  <AppsIcon />
                </Styled.IconLink>
                <Styled.IconLink href="/">
                  <NotificationsIcon />
                </Styled.IconLink>
                <Avatar
                  style={{ height: 30, width: 30, cursor: 'pointer' }}
                  src={user.imageUrl}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </>
            )}
            <div style={{ display: user ? 'none' : 'block' }}>
              <Login />
            </div>
            {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
          </>
        )}
      </Styled.RightHeader>
    </Styled.Header>
  );
};

export default Header;
