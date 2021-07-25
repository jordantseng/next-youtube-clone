import { useState, useEffect, useRef } from "react";

const useOnScreen = () => {
  const [element, setElement] = useState(null);
  const [visible, setVisible] = useState(false);
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });

    if (element) {
      observer.current.observe(element);
    }

    return () => {
      if (element) {
        observer.current.unobserve(element);
      }
    };
  }, [element]);

  return [visible, setElement];
};

export default useOnScreen;
