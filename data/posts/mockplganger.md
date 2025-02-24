# 목플갱어 프론트엔드 개발기

## 개발 기간: 25.01.17 ~ 25.02.20 (약 5주)

## 링크

- [깃허브 링크](https://github.com/Steadystudy/mockplganger)
- [발표 유튜브 링크](https://youtu.be/WAEVcjhdqVQ)
- ~~서비스 링크 (2025.02.15~2025.02.21)~~

## 기획 배경

MBTI E가 1명 I가 5명으로 이뤄진 우리팀은 친해지기 쉽지 않았습니다. 점심시간에 아이스브레이킹용 게임을 하면서 빠르게 친해질 수 있었습니다. 이에 “목소리를 활용한 아이스브레이킹용 게임은 없을까? “고민하다가 성대모사를 활용해서 점수를 메기고 비교하면 재밌겠다고 생각하여 기획하게 되었습니다.

## 주요 기술 스택

| 기술         | 사용 이유                                                                                                                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js v.14 | 프로젝트 특성상 이미지를 많이 사용할 것으로 예상하여 최적화에 유용한 컴포넌트와 라우팅 등 편리한 기능이 있어 React 기반의 프레임 워크인 Next.js를 선택하게 되었고, Next 15와 React19 버전의 경우 당시 다른 라이브러리들과 호환성에 문제가 있어 14버전을 선택했습니다. |
| axios        | api 통신 관련 코드를 직관적이고 간소화하기 위해 사용했습니다.                                                                                                                                                                                                         |
| react-query  | api 통신과 비동기 데이터 관리를 위해 사용했습니다.                                                                                                                                                                                                                    |
| zustand      | 상태를 나눠서 관리해야 하는 게 많았기 때문에 클라이언트 상태 관리 라이브러리로 가볍고 사용하기 편리하여 사용했습니다.                                                                                                                                                 |
| tailwindcss  | 기존에 제공되는 style로 css 개발을 편하게 하기 위해 사용했습니다.                                                                                                                                                                                                     |

그 외 사용한 라이브러리

- shadcn/ui : UI 라이브러리를 통해 통일성 있고 기초 컴포넌트 개발 시간 단축하였습니다.
- sockjs-client : WebSocket Emulation 기술을 제공하는 JavaScript 라이브러리로 채팅, 실시간 게임 통신에 사용했습니다.
  - - WebSocket Emulation : 우선적으로 WebSocket을 활용하여 통신을 시도하고, 실패할 경우 HTTP 기반의 다른 기술로 전환하여 재연결을 시도하는 방식

## 구현한 기능

- **음성 녹음, 시각화 및 업로드**

  - Web API인 `Navigator.getUserMedia(options)`를 사용하여 사용자의 마이크에 접근했습니다.
  - 녹음 중에는 음성 데이터를 일정한 간격의 chunk 단위로 배열에 저장하여, 나중에 파일로 변환할 수 있도록 준비했습니다.
  - 녹음 과정에서 사용자의 소리가 제대로 입력되고 있는지 확인하기 위해 useVisualize 커스텀 훅을 만들었습니다.

  ```tsx
  import { useRef } from 'react';

  export const useVisualize = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);

    function visualize() {
      if (!canvasRef.current || !analyserRef.current) return;

      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext('2d');
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;

      function draw() {
        analyser.getByteFrequencyData(dataArray);

        canvasContext?.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          const gradient = canvasContext!.createLinearGradient(0, 0, canvasWidth, canvasHeight);
          gradient.addColorStop(1.0, '#000'); // Blue

          canvasContext!.fillStyle = gradient;
          canvasContext?.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

          x += barWidth + 1;
        }

        requestAnimationFrame(draw);
      }

      draw();
    }

    return { canvasRef, analyserRef, visualize };
  };
  ```

  - 이 visualizer는 실시간으로 음성 데이터를 시각적으로 표현하여, 녹음 상태를 직관적으로 확인할 수 있게 도와주었습니다.
  - aws S3에 업로드할 때 chunk 배열을 wav 형식의 파일로 변환후 `aws-sdk/client-s3`를 통해 업로드 합니다.
    - **S3 CORS 에러 해결**:
      S3 설정에서 권한이 부여된 사용자만 접근하도록 설정하고, 환경변수에 `secret_access_key`와 `access_key_id` 값을 관리하여 문제를 해결했습니다.
    - **헤더 서명 에러 해결** `There were headers present in the request which were not signed 문제, SignatureDoesNotMatch` :
      이를 해결하기 위해 `s3-request-presigner`를 활용하여 S3에서 제공하는 signed URL을 받아, 해당 URL로 `PUT` 요청을 보내 파일의 body 값을 전송하는 방식으로 업로드를 완료했습니다.

- **Sockjs와 Stomp로 웹소켓 통신으로 게임 진행**

![Image](/mockplganger/1.png)
![Image](/mockplganger/2.png)

- **방 참가 시 통신 시작:** 사용자가 방에 참가하면, 해당 방 URL로 publish를 실행하고 동시에 subscribe를 통해 서버로부터 실시간 데이터를 받아옵니다.
- 서버에서 전달받는 데이터는 게임 시작, 라운드 시작, 캐릭터 선택, 결과 등 다양한 이벤트를 타입으로 정의하여 일관된 데이터 처리와 UI 업데이트를 가능하게 했습니다.

```jsx
export const GAME_RESPONSE = {
  READY: 'READY',
  ROUND_START: 'ROUND_START',
  CHARACTER_SELECT: 'CHARACTER_SELECT',
  TURN: 'TURN',
  ROUND_OVER: 'ROUND_OVER',
  ROUND_RESULT: 'ROUND_RESULT',
  GAME_OVER: 'GAME_OVER',
  HIGHLIGHT: 'HIGHLIGHT',
  TURN_LOADING: 'TURN_LOADING',
};
```

- **클라이언트 상태 관리 (props drilling 해결)**

![Image](/mockplganger/3.png)

- Playground 컴포넌트와 GameUserList 컴포넌트를 나누면서, Playground 영역에서 변경된 값을 다른 컴포넌트에 전달하는 과정에서 상태 관리가 복잡해졌습니다.

**해결책**

- **Zustand 도입**
  - Context API는 Provider에 의존하는 모든 컴포넌트를 재렌더링하는 특성이 있어, 상태 변화가 발생하면 불필요한 렌더링이 많이 발생합니다.
  - Redux 보다 가볍고 사용하기 편합니다.
- Game과 GameRoom 크게 2개의 store로 상태를 나누었습니다.
- Game: 게임에 관련된 상태. ex) 현재 라운드, 진행중인 유저, 게임 상태 등
- GameRoom: 방 설정에 관련된 상태. ex) 방장, 총 라운드, 최대 인원 수 등

### 이미지 최적화

- WebP 사용 이유
  - WebP는 기존 JPEG나 PNG보다 훨씬 높은 압축률을 제공하여, 동일한 품질을 유지하면서 파일 크기를 크게 줄일 수 있습니다.
  - 파일 크기가 작아지면 네트워크 전송 시간이 단축되어 페이지 로딩 속도가 빨라지고, 사용자 경험과 SEO 측면에서도 긍정적인 영향을 미칩니다.
  - 확장자를 하나로 통일함으로서 확장자 혼동없이 코드 작성에 에러를 줄임
- 이미지 경량화
  - 기존 이미지는 크면 100kb에 가까웠음.
  - 이미지 경량화를 통해 대부분의 이미지를 10kb로 줄임으로 서버 부하를 줄이고, 느린 네트워크에서도 빠르게 불러오도록 했습니다.
- 성과
  - 초기 배포시 페이지 불러오는 시간이 8초였던 것에서 2초 이내로 단축되었습니다.

## 트러블슈팅

- **문제 상황**
  - 게임 페이지 진입 시 서버에 POST 요청이 발생하여, 방이 꽉 찬 상태임에도 불구하고 유저가 입장하려고 하여 인원수가 이상하게 변동됨.
  - 예를 들어, 제한 인원이 2명인 경우 방장이 입장하면 1/2 → 2/2 → 1/2로 인원이 조정되고, 새로운 유저가 들어올 때 2/2 → 3/2 (에러 발생) → 1/2로 변화함.
- **원인**
  - React 18의 Strict Mode가 개발 모드에서 컴포넌트를 두 번 렌더링하여, 부작용(POST 요청)이 두 번 실행되게 됨.
  - 이 문제는 프로덕션에서는 발생하지 않으나, 개발 환경에서는 의도치 않은 동작을 유발함.
- **해결 방법**
  - 페이지에 진입할 때 POST 요청이 단 한 번만 실행되도록 제어하기 위해 `useRef`를 사용하여 플래그를 설정함.

```jsx
   const hasCalledEnterRoom = useRef(false);

  useEffect(() => {
    if (!hasCalledEnterRoom.current) {
      hasCalledEnterRoom.current = true;
      mutateSendEnterRoom({ roomId, uuid: user.uuid });
    }
    ...
  },[...])
```

- **useEffect로 해야할까?**
  - 게임 초대 시 URL을 활용하여, 페이지에 들어와 user가 생성되는 즉시 게임에 join 요청을 해야 합니다.
  - 이러한 동작은 페이지가 처음 마운트될 때 한 번만 실행되어야 하므로, useEffect 내부에 작성했습니다.
  - 해당 이슈를 찾아보면서 useEffect 안티 패턴에 대해 공부할 수 있었습니다.

## 성과 (16~21일까지 총 6일)

- **홍보**
  - SSAFY Mattermost를 통해 홍보를 진행했습니다.

![Image](/mockplganger/4.png)

- **유저 반응**

![Image](/mockplganger/5.png)
![Image](/mockplganger/6.png)
![Image](/mockplganger/7.png)

- **Google Analytics**

![Image](/mockplganger/8.png)
![Image](/mockplganger/9.png)
![Image](/mockplganger/10.png)

## 느낀점

- 6일간 주 80시간 가까이 개발에 집중하며 사용자 피드백을 적극 반영한 결과, 개발에 대한 큰 재미와 열정을 느낄 수 있었습니다.
- 기획 단계에서 의견 충돌과 정리의 어려움을 겪으면서, 자신의 생각을 명확하게 전달하는 것이 얼마나 중요한지 깨달았습니다. 특히, 글뿐 아니라 그림을 통해 시각적으로 소통하니 아이디어 전달이 훨씬 수월해졌습니다.

## 아쉬운점

**FE 폴더 아키텍처 관리**

- 프로젝트 진행 중 폴더 구조가 점점 비대해지면서 원하는 코드를 찾기 어려워진 경험이 있었습니다. 이에 따라, FSD 아키텍처에 대해 알게 되었고 다음 프로젝트에서는 이를 적극 활용해 효율적인 코드 관리 방식을 도입해 보고자 합니다.
