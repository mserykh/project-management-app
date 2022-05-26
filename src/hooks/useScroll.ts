import { useEffect, useState } from 'react';

export const useScroll = (): boolean => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const collapseHeader = (): void => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', collapseHeader);

    collapseHeader();

    return () => window.removeEventListener('scroll', collapseHeader);
  }, []);

  return isScrolling;
};
