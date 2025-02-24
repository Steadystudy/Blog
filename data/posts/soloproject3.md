# 나 혼자 프로젝트 #2

혼자 프로젝트를 하기로 했지만, 팀 프로젝트라고 생각하고 개발 환경을 설정했다.

## Storybook

next와 함께 쓰다보니 세팅해줘야 할 것이 제일 많았다.

1. font 문제
2. image 문제

두문제 다 .storybook/main.ts 파일에서 staticDirs로 파일 위치를 알려주면 되는 문제였다.  
중요한 점은 파일의 정확한 위치를 알려줘야 한다는 점이다.

```typescript
import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/nextjs',
  staticDirs: [
    '../public',
    { from: '../public/fonts', to: '/public/fonts' },
    { from: '../public/icons', to: '/icons' },
  ],
};

export default config;
```

## antd와 tailwindcss

antd의 기본 설정된 css와 tailwindcss로 인라인 스타일링을 했을 때 antd 기본 설정 값이 적용되지 않는 이슈가 있었다. 이는 antd 5.0이상에서 생긴 문제로 해결방법은 tailwind config에서 설정을 해주면 된다.

```
// tailwind.config.js

module.exports = {
// ...other

  corePlugins: {
// Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false
  },
  important: '#app',

// ...other
}
```

- \*최근 antd 공문에서 함께 사용하는 설정하는 방법이 나왔다.
  https://ant.design/docs/react/compatible-style#tailwindcss-arrange-layer

## tailwindcss에 input style

tailwindcss/forms 라이브러리를 다운받아야 input, select, textarea 등 다양한 css 스타일을 사용할 수 있다. `<input type="checkbox" />` 스타일을 변경해주기 위해 라이브러리를 설치했다.

## 느낀점

개발보다 설정이 정말 힘들게 느껴진다. stack overflow나 github issue에서 사람들의 도움 없이는 정말 막막하다고 많이 느꼈다. 지금 보면 정말 간단한 이슈지만 이를 해결하기 위해 정말 많은 소스코드를 뜯어보면서 체크했던 거 같다. 커뮤니티의 중요성을 느끼게 되었고, 나 또한 문제를 해결했을 때 적극적으로 글을 작성하면서 남들에게 도움이 되는 개발자가 되어야겠다.

### 참고자료

https://storybook.js.org/docs/configure/integration/images-and-assets  
https://ant.design/docs/react/compatible-style#tailwindcss-arrange-layer  
https://github.com/ant-design/ant-design/issues/38794  
https://github.com/tailwindlabs/tailwindcss-forms
