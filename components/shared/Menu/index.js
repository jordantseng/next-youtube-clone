import { useContext } from 'react';
import { useGoogleLogout } from 'react-google-login';

import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Link from '../../ui/Link';

import UserContext from '../../../contexts/userContext';

import * as Styled from './styles';

const Menu = ({ setIsMenuOpen }) => {
  const { user, setUser } = useContext(UserContext);

  const onLogoutSuccess = (res) => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  const { signOut } = useGoogleLogout({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <Styled.MenuContainer>
      <Styled.MenuHeader>
        <Avatar
          src={user?.imageUrl}
          style={{ width: '40px', height: '40px', marginRight: '16px' }}
        />
        <div>
          <b>{user?.name}</b>
          <Link
            style={{
              display: 'block',
              marginTop: '8px',
              textDecoration: 'none',
              color: '#065fd4',
              fontSize: 14,
            }}
            href="/"
          >
            管理你的Google帳戶
          </Link>
        </div>
      </Styled.MenuHeader>
      <Styled.MenuItems>
        <Styled.MenuItem>
          <Brightness4Icon
            fontSize="small"
            style={{
              marginRight: '16px',
              color: 'gray',
            }}
          />
          <div style={{ flex: 1 }}>外觀：淺色主題</div>
          <ArrowForwardIosIcon style={{ fontSize: 16, color: 'gray' }} />
        </Styled.MenuItem>
        <Styled.MenuItem onClick={signOut}>
          <ExitToAppIcon
            fontSize="small"
            style={{ marginRight: '16px', color: 'gray' }}
          />
          <div>登出</div>
        </Styled.MenuItem>
      </Styled.MenuItems>
    </Styled.MenuContainer>
  );
};

export default Menu;
