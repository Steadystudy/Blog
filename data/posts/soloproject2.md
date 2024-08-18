# 나 혼자 프로젝트 #2

지금까지 세팅한 프론트 라이브러리 및 프레임워크와 테스트는 어떻게 하고 있는지 적어보려고 한다.

## 프론트엔드

### 기술스택

<div className="flex">
![NextJS](https://img.shields.io/badge/NextJS-%23000000.svg?style=for-the-badge&logo=Next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-004088.svg?style=for-the-badge&logo=typescript&logoColor=white)  
</div>
<div>
![Storybook](https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
</div>

### Next

Next의 장점이 많이 있지만 그 중에서 복잡한 설정 없이 사용하기 쉽다.  
실제 서비스를 만들 수 없기 때문에 성능 최적화를 할 필요는 없지만 Image, Font 최적화도 잘 되어 있고 라우팅이 편하고 레이아웃도 쉽게 만들 수 있다.
무엇보다 이미 사용했던 프레임워크라 러닝커브가 거의 없다.

### Storybook

사실 팀원들과 함께 만들거라 생각해서 미리 storybook을 chromatic으로 배포하고 컴포넌트를 만들어서 UI test를 하고 있었다.  
사실 혼자 만들 때는 안쓰는 것이 더 좋은 것 같다. storybook과 next 설정하다가 시간을 꽤나 많이 소비했다. local font 설정, 이미지 경로 문제 등 자잘한 이슈들이 많았다.

### 추가 라이브러리

**antd**

- 혼자 작업하기 때문에 모든 컴포넌트를 하나씩 만들 시간이 없어서 이 라이브러리를 사용하기로 했다. 업데이트도 자주하고 문서도 잘 작성되어 있어서 작업하는데 큰 도움이 되었다.

**tailwindcss**

- 인라인 스타일로 작성해서 작업 속도가 굉장히 빠르다. 이 문법에 익숙해지고 스타일 순서를 정해서 작성하면 유지보수하기도 편하다. antd와 같이 쓸 떄 코드를 더 짧게 쓸 수 있지만 자잘한 버그가 있어서 세팅을 해줘야 한다.
- 그럼에도 함께 사용한 이유는 예시 코드를 보면 tailwindcss와 antd를 함께 썼을 때 코드수를 엄청 줄일 수 있다는 걸 볼 수 있다.

```tsx
import { Avatar, Badge, Flex, Typography } from 'antd';
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { MouseEventHandler } from 'react';

export type AvatarSize = 'large' | 'small' | 'default';

export type AvatarProps = {
  size?: AvatarSize;
  name?: string;
  src?: string;
  alt?: string;
  remove?: boolean;
  onClick?: MouseEventHandler;
};

const sizes: Record<AvatarSize, number> = {
  small: 32,
  default: 36,
  large: 80,
};

export default function AvatarProfile({
  size = 'default',
  src,
  alt,
  name,
  remove = false,
  onClick,
}: AvatarProps) {
  const { Text } = Typography;

  return (
    <Flex vertical wrap gap={1} className={`text-center`} onClick={onClick}>
      <Badge count={remove ? <CloseCircleOutlined /> : ''}>
        <Avatar src={src} alt={alt} size={sizes[size]} icon={<UserOutlined />} />
      </Badge>
      {name && (
        <Text
          ellipsis
          style={{ width: `${sizes[size]}px` }}
          className={`text-xs font-bold font-pretendard`}
        >
          {name}
        </Text>
      )}
    </Flex>
  );
}
```

**zustand**

- 상태관리 라이브러리로 redux를 쓸만큼 상태가 많지 않아서 사용하게 되었다. 기존에 recoil을 사용해 본 적있는데 zustand가 더 가볍다고 하여 공부해볼 겸 사용하였다. 실제로 사용해보니 러닝커브가 적고 쓰기 간편하다.
- 아래 코드는 현재 방을 만들 때 전역에서 관리해야 편한 상태들을 묶어서 관리하고 있다.

```typescript
import { User } from 'types';
import { create } from 'zustand';

type State = {
  myTeam: User[];
  opponent: User[];
  judge: User[];
};
type Actions = {
  updateMyteam: (data: User[]) => void;
  updateOpponent: (data: User[]) => void;
  updateJudge: (data: User[]) => void;
  reset: () => void;
};

export const initialState: State = {
  myTeam: [],
  opponent: [],
  judge: [],
};

export const useRoomStore = create<State & Actions>((set, get) => ({
  ...initialState,
  updateMyteam: (newUsers: User[]) => {
    set(() => {
      return { myTeam: newUsers };
    });
  },
  updateOpponent: (newUsers: User[]) => {
    set(() => {
      return { opponent: newUsers };
    });
  },
  updateJudge: (newUsers: User[]) => {
    set(() => {
      return { judge: newUsers };
    });
  },
  reset: () => {
    set(initialState);
  },
}));
```

### 스니펫

storybook을 이용할 떄 코드가 대부분 비슷하다. 그래서 snippet을 활용하여 코드 작성의 반복을 줄였다.

```typescript
{
  "Storybook Component Template": {
    "prefix": "story",
    "body": [
      "import type { Meta, StoryObj } from '@storybook/react';",
      "",
      "import ${TM_FILENAME_BASE/(.*)\\.stories$/${1}/} from './${TM_FILENAME_BASE/(.*)\\.stories$/${1}/}';",
      "",
      "const meta: Meta<typeof ${TM_FILENAME_BASE/(.*)\\.stories$/${1}/}> = {",
      "  component: ${TM_FILENAME_BASE/(.*)\\.stories$/${1}/},",
      "  title: '${TM_FILENAME_BASE/(.*)\\.stories$/${1}/}',",
      "  tags: ['autodocs'],",
      "  argTypes: {},",
      "};",
      "export default meta;",
      "",
      "type Story = StoryObj<typeof ${TM_FILENAME_BASE/(.*)\\.stories$/${1}/}>;",
      "",
      "export const Default: Story = {",
      "  args: {},",
      "};"
    ],
    "description": "Storybook Template"
  }
}
```

### Atomic Design

Atomic Design을 활용하여 컴포넌트 재사용 및 유지보수를 쉽게 할 수 있었다.  
기존 Atomic design에서는 atom - molecules - organisms - templates - pages 순으로 만든다.  
하지만 5단계로 세분화할 필요성을 못느껴 크게 3단계로 나눠서 관리하였다.  
**장점**

- 컴포넌트를 파편화 해두었기 때문에 유지보수하기 편리했다.
- storybook으로 ui testing까지 같이 하기 때문에 어디서 문제가 생기는지 명확하게 알 수 있었다.

**단점**

- 불필요한 props가 늘어나기도 하고, 경계선이 애매하다는 점이 있다.
- 혼자하는 프로젝트이기 때문에 문제가 없었지만 추후 팀과 함께 만들 때 충분히 상의할 만한 주제인 거 같다.

## 정리

- 프론트 기술 스택을 정한 이유를 적어보았다.
- 기술을 사용하면서 장단점을 파악하여 다음에 있을 팀프로젝트에 어떻게 적용할지 생각할 수 있었다.
- 다음에는 위 설정을 하면서 해결한 트러블 슈팅을 적어봐야겠다.
