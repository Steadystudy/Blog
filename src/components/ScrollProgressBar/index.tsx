'use client';

import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState<string>('0');

  const calculateProgress = useCallback(() => {
    const { clientHeight } = document.documentElement;
    const { scrollHeight, scrollTop } = document.body;

    const windowHeight = scrollHeight - clientHeight;
    const currentPercent = scrollTop / windowHeight;

    return (currentPercent * 100).toFixed(3);
  }, []);

  const handleScroll = useCallback(() => {
    const currentPercent = calculateProgress();
    setProgress(currentPercent);
  }, [calculateProgress]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { capture: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="fixed top-[60px] w-full h-2 lg:hidden z-20">
      <ProgressBar width={progress} />
    </div>
  );
}

// twin.macro 버그로 인해 임시 styled component 생성
type Bar = {
  width: string;
};

const ProgressBar = styled.div<Bar>`
  height: 100%;
  background-color: #ffe7a0;
  width: ${(props) => props.width}%;
`;
