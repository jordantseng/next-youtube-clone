import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

// api
export const getUniqueVideoBy = (videos, key) => {
  return [...new Map(videos.map((video) => [video[key], video])).values()];
};

// video card data transformation
export const transformDuration = (duration) => {
  const totalSeconds = dayjs.duration(duration).asSeconds();
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = Math.trunc(totalSeconds % 60);

  return `${hours === 0 ? '' : hours + ':'}${
    minutes < 10 ? '0' : ''
  }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const transformViews = (views) => {
  return +views >= 10000 ? `${Math.trunc(+views / 10000)}萬次` : `${+views}次`;
};

export const transformTimeStamp = (timestamp) => {
  const start = dayjs(timestamp);
  const now = dayjs(new Date());
  const hourDiff = now.diff(start, 'hour');

  if (hourDiff > 24 * 30 * 12) {
    return `${now.diff(start, 'year')}年前`;
  }

  if (hourDiff > 24 * 30) {
    return `${now.diff(start, 'month')}月前`;
  }

  if (hourDiff > 24) {
    return `${now.diff(start, 'day')}天前`;
  }

  return `${hourDiff || 1}小時前`;
};

// TODO: https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
export const transformSubscribers = (subscriberCount) => {
  return +subscriberCount >= 10000
    ? `${Math.trunc(+subscriberCount / 10000)} 萬`
    : `${+subscriberCount}`;
};

// refresh token per hour
export const setRefreshTokenTimer = (res) => {
  const refreshTime = res.tokenObj.expires_in * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();

    refreshTime = newAuthRes.expires_in * 1000;

    // save new token
    localStorage.setItem('authToken', newAuthRes.access_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTime);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTime);
};
