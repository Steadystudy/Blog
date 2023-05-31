### 문제의 발단

Next 13버전에서 Scroll Progress bar 컴포넌트를 구현하다가 마주친 문제  
tailwindcss에서는 가변적인 변수를 받아와 스타일을 적용할 수 없다.

전체코드

```js
'use client';

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
      // 여기서 문제가 발생했다.
      <div className={`w-[${progress}%] h-full bg-black`}></div>
    </div>
  );
}
```

### 문제의 전개

찾아보니 emotion과 tailwindcss를 함께 사용할 수 있는 방법이 `twin.macro` 라이브러리였다.
하지만 Next 13버전부터 RSC가 도입되면서 app directory에 컴포넌트를 생성하면 기본적으로 서버 컴포넌트가 되었다. 그래서 useEffect나 useState와 같은 csr에서 사용하는 훅을 사용하기 위해서는 파일 최상단에 'use client'를 붙여 파일을 클라이언트 컴포넌트로 바꿔야 한다.  
여기서 문제가 발생하는데 `twin.macro` 문서([here](https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion))에서 제공하는 세팅을 했을 때 @emotion/react에서 제공하는 context가 클라이언트 컴포넌트에서만 사용해야 해서 'use client'를 붙이라는 오류가 나온다. 그렇게 되면 서버 컴포넌트에서만 사용 가능한 metadata나 generateMetadata 등 서버 컴포넌트에서만 사용할 수 있는 것이 불가능해진다. 현재 Emotion에서 Next 13버전에 맞게 업데이트 되지 않은 것 같다. ([관련 이슈](https://github.com/emotion-js/emotion/issues/2928))

### 문제의 절정

아직도 해결되지 않은 것 같다. styled component는 사용 가능한 방법이 있는 것 같다.(이 마저도 편법 같다.)  
[twin.macro과 styled component 함께 사용할 때 생기는 버그 고치는 법](https://github.com/ben-rogerson/twin.macro/issues/788)

문제가 해결되면 추후 업데이트 해야겠다.
