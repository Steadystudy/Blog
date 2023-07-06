## 문제의 발단

```js
'use client'
const BUSAN_GU = ['강서구','금정구','남구',...];

export default async function PlaceSearch() {
  const [tab, setTab] = useState(BUSAN_GU[0]);

  return (
    <section>
      <ul>
        {BUSAN_GU.map((gu, idx) => (
          <li key={idx + gu}>
            <button onClick={() => setTab(gu)}>{gu}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

Nextjs 13버전에서 클라이언트 컴포넌트를 만들어 행정구가 적힌 버튼을 누르면 탭이 변하는 간단한 로직이다.  
여기서 무한 렌더링이 발생한 이유를 찾을 수 있는가?  
button에 `onClick={setTab(gu)}`을 했다면 문제가 생길 수도 있지만 제대로 작성하였고 이유를 찾지 못해서 헤매다가 nextjs [issue](https://github.com/vercel/next.js/issues/51528)를 보고 문제의 원인을 찾을 수 있었다.

## 문제의 원인

클라이언트 컴포넌트에 async를 붙여서 생기는 이슈이다. 그 이유에 대해서는 아직 확실하게 나오지 않았다.

## 문제 해결

클라이언트 컴포넌트에 async를 안붙이면 된다. 만약 비동기로 받아와야하는 결과가 있다면 client component내부가 아닌 외부에서 결과를 가져올 수 있게 분리해야한다.  
이를 방지하기 위해 lint에 추가해야 한다는 의견이 꽤 보인다. 실제로 lint 설정을 공유해주기도 한다. [no-async-when-use-client](https://github.com/vercel/next.js/issues/50898#issuecomment-1590492412)  
공식적으로 lint에 추가하여 다른 사람들이 쉽게 문제를 파악할 수 있으면 좋겠다.
