import { useEffect, useState } from 'react';

type Width = number & { __brand: 'Width' };
type Height = number & { __brand: 'Height' };
type Sizes = [Width, Height];

type UseWindow = {
  sizes: Sizes;
  responsive: boolean | undefined;
};

function useWindow(): UseWindow {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [responsive, setResponsive] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setResponsive(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    sizes: [width as Width, height as Height],
    responsive,
  };
}

export default useWindow;
