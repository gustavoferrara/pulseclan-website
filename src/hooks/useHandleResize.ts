import { RefObject, useEffect, useState } from 'react';

type UseHandleResize = (videoBtn: RefObject<HTMLButtonElement>) => {
  chartCutout: number;
};

const useHandleResize: UseHandleResize = videoBtn => {
  const [chartCutout, setChartCutout] = useState(0);

  useEffect(() => {
    const chart = document.querySelector('canvas');
    chart!.style.position = 'absolute';
    chart!.style.top = '-8%';

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartCutout(
          104 + ((180 - 104) * (window.innerWidth - 320)) / (1100 - 320),
        );
      } else {
        setChartCutout(148);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { chartCutout };
};

export default useHandleResize;
