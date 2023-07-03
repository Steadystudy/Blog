`이 글은 원티드 프리온보딩 사전 챌린지 질문에 대한 포스팅입니다.`

## CSR(Client-side Rendering)이란 무엇이며, 그것의 장단점에 대하여 설명해주세요.

- CSR은 클라이언트 측에서 JavaScript를 사용하여 HTML을 생성하여 브라우저에서 콘텐츠를 렌더링하는 것입니다.
- CSR의 장점?
  - 한 번 로딩되면 빠른 UX 제공으로 좋은 사용자 경험을 제공할 수 있습니다.
  - 클라이언트 측에서 js파일을 받아 렌더링하기 때문에 서버 부하가 적습니다.
  - 서버가 각 페이지 요청에 대해 HTML을 생성할 필요가 없기 때문에 SSR보다 확장하기 쉽습니다.
- CSR의 단점?
  - js파일로 html을 그리기 때문에 크롤러가 크롤링하고 인덱싱하기 힘들어서 SEO(검색 엔진 최적화)에 좋지 않습니다.
  - 첫 페이지가 보여지는 시간(TTV)이 SSR보다 더 걸립니다.
  - 주로 클라이언트 측에서 데이터를 가져오기 때문에, 클라이언트 코드를 조작하거나 보안을 우회하는 시도를 할 수 있기 때문에 보안 관련 검증을 해야합니다.
  - CDN에 캐시가 안됩니다.
  - 클라이언트 브라우저에서 javascript 활성화가 필수입니다.
- CSR 작동원리?
  1. 사용자가 서버에 페이지를 요청한다.
  2. 서버는 최소한의 HTML 파일과 JS 및 CSS 파일을 클라이언트에 보낸다.
  3. 클라이언트 측에서 HTML 페이지를 로드하고 JS 코드를 실행합니다.
  4. 데이터를 요청하여 페이지를 렌더링하는 데 필요한 데이터를 가져옵니다.
  5. 브라우저에서 페이지를 렌더링합니다.
- CSR이 필요한 순간?
  - SEO가 중요하지 않은 페이지를 만들 때(ex. 크롤러가 접근할 수 없는 계정 페이지)
  - 스크립트가 가벼울 때
  - 사용자와 상호 작용이 많을 때

## SPA(Single Page Application)로 구성된 웹 앱에서 SSR(Server-side Rendering)이 필요한 이유에 대하여 설명해주세요.

1. TTV  
   SPA는 초기에 단일 HTML 페이지만 로드하고, 이후에 필요한 데이터를 동적으로 가져와서 페이지를 업데이트 합니다. 이러면 사용자가 페이지 보이기 까지 시간이 걸릴 수 있습니다. SSR을 사용하면 서버에서 완성된 HTML 페이지를 생성하고 전송하여 렌더링되므로 TTV가 빨라집니다.
2. SEO  
   일부 크롤러는 js를 실행하지 않고 인덱싱하기 때문에 SPA의 경우 비어있는 페이지만 크롤링하게 됩니다. SSR을 사용하면 크롤링에 필요한 메타 데이터나 컨텐츠들이 함께 제공되기 때문에 SEO에 큰 도움이 됩니다.  
   꼭 SSR이 아니더라도 SEO를 적용할 수 있지만, 꽤나 까다롭다. => [SPA에서 SEO 적용하기](https://mygumi.tistory.com/385)

## Next.js 프로젝트에서 yarn start(or npm run start) 스크립트를 실행했을 때 실행되는 코드를 Next.js Github 레포지토리에서 찾은 뒤, 해당 파일에 대한 간단한 설명을 첨부해주세요.

next로 만든 프로젝트에서 yarn start를 실행하면 next start가 실행이 된다.

```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

> next start 실행 동작 => [next github 주소](https://github.com/vercel/next.js/blob/canary/packages/next/src/cli/next-start.ts)

먼저 4개의 옵션을 받을 수 있다. 만약 없는 옵션을 실행했다면 error를 반환한다.

```js
const validArgs: arg.Spec = {
  // Types
  '--help': Boolean,
  '--port': Number,
  '--hostname': String,
  '--keepAliveTimeout': Number,

  // Aliases
  '-h': '--help',
  '-p': '--port',
  '-H': '--hostname',
};
let args: arg.Result<arg.Spec>;
try {
  args = arg(validArgs, { argv });
} catch (error) {
  if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
    return printAndExit(error.message, 1);
  }
  throw error;
}
```

--help 옵션을 실행했을 때 console에 보여주고 실행을 중단한다.

```js
if (args['--help']) {
  console.log(`
      ...
    `);
  process.exit(0);
}
```

--keepAliveTimeout 옵션으로 받은 값이 undefined가 아닌데 NaN이거나 Infinite하거나 음수값이라면 잘못된 값을 받았다고 알려주고 종료한다.

```js
if (
  typeof keepAliveTimeoutArg !== 'undefined' &&
  (Number.isNaN(keepAliveTimeoutArg) ||
    !Number.isFinite(keepAliveTimeoutArg) ||
    keepAliveTimeoutArg < 0)
) {
  printAndExit(
    `Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`,
    1,
  );
}
```

모든 옵션 값이 제대로 들어오면 서버를 실행한다.

```js
await startServer({
  dir,
  isDev: false,
  hostname: host,
  port,
  keepAliveTimeout,
  useWorkers: !!config.experimental.appDir,
});
```

Next Github repository에서 next start, next build 등 스크립트를 실행할 때 넣을 수 있는 옵션들이나 내부 동작 원리를 조금이나마 이해할 수 있었고, 그동안 무슨 뜻인지 모르는 옵션을 사용할 때가 많았는데 앞으로 확실하게 알고 사용할 수 있게 되었다.
