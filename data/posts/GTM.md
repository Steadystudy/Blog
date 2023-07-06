2023년 7월 1일 구글 애널리틱스 GA4가 필수가 되면서 UA를 이용하던 사용자도 GA4로 설정을 바꿔야 한다.  
Next 13버전에서 직접 GA4를 설정하려고 했지만, 기존에 Next 12버전에서 했던 방식대로 구현하면 많은 에러가 발생한다. 그래서 올바르게 구현하는 방법을 찾던 중에 GTM(Google Tag Manager)을 활용하면 설정이 엄청 쉬워진다는 것을 알게 되었다.

## GTM 및 GA4 속성 설정

먼저 GTM 계정을 설정했는지 확인해야 한다. 아직 만들지 않았다면 [여기에서](https://tagmanager.google.com/#/home) 만들 수 있습니다. GTM ID(GTM-XXXXXXX)를 알아야 합니다.

GA4속성도 필요하므로 [구글 애널리틱스](http://analytics.google.com/)에서 웹스트림을 만들고 측정 ID(G-XXXXXXXXX)를 알아야 합니다.

## GTM에서 태그 만들기

1. 새 태그를 추가합니다.
2. 상단에 '이름 없는 태그'에 태그 이름을 지정한다.
3. '태그 구성'을 클릭하여 'Google 애널리틱스: GA4 구성'을 클릭한다.
4. 측정 ID 값에 G-XXXXXXXXX을 기입한다.
5. '태그 구성' 아래에 '트리거'를 클릭하여 'All Pages'를 클릭한다.
6. '저장'을 클릭한다.

## Next 전체 Layout에 GTM 추가

.env.local 파일

```
NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX;
```

app/layout.tsx

```js
import Script from 'next/script'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

...

<html>
<Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
    </Script>
    <body>
        ...

      <noscript
        dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
        }}
      />
    </body>
</html>
```

noscript를 추가하여 사용자 브라우저에서 javascript가 비활성화된 사용자들도 지원할 수 있다.  
**까먹지 말고 배포된 사이트에 꼭 환경변수를 추가하자!**

## 참고자료

[The Easiest Integration of GA4 in Next.js 13 Using GTM](https://www.rodyvansambeek.com/blog/easiest-ga4-integration-nextjs-13-gtm-guide)  
[GA4 in Next.js 12 Using GTM](https://github.com/vercel/next.js/tree/canary/examples/with-google-tag-manager)
