import { useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';

import Avatar from '@material-ui/core/Avatar';

import Button from '../Button';

import UserContext from '../../../contexts/userContext';

import { setRefreshTokenTimer } from '../../../lib/utils';

import * as Styled from './styles';

const Login = () => {
  const { setUser } = useContext(UserContext);

  const onSuccess = (res) => {
    setUser(res.profileObj);
    localStorage.setItem('authToken', res.tokenObj.access_token);

    setRefreshTokenTimer(res);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.CLIENT_ID,
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
  });

  return (
    <Button
      onClick={signIn}
      variant="outlined"
      color="primary"
      style={{ padding: '8px 11px', borderRadius: 3 }}
    >
      <Styled.ButtonText>
        <Avatar style={{ height: 24, width: 24, backgroundColor: '#065fd4' }} />
        <p>登入</p>
      </Styled.ButtonText>
    </Button>
  );
};

export default Login;
