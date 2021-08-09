import { useState, useEffect, useRef } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimension = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const timerId = useRef();

  const debounce = (cb, ms) => () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      cb();
    }, ms);
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowDimensions(getWindowDimensions());
    }, 100);

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimension;
