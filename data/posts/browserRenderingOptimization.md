# 왜 브라우저 렌더링 최적화를 해야하는가?

오늘날의 웹 사용자는 페이지가 빠르게 로드되고 잘 실행될 것을 기대한다.  
성능이 뛰어난 사이트와 앱을 만드려면 브라우저에서 HTML, JavaScript 및 CSS를 처리하는 방법을 이해해야 한다.

### FPS(Frame Per Second)

fps는 1초에 몇 프레임이 그려지는지 표현하는 단위이다.  
60fps는 1초에 60장의 프레임이 그려지는 것이다.  
1/60(second) = **16.66ms**안에 새로운 화면을 브라우저가 렌더링을 성공하지 못한다면 애니메이션이 끊김 현상이 발생한다.  
그러나 실제로 브라우저는 하우스키핑 작업을 수행해야 하므로 모든 작업을 **10ms** 이내에 완료해야 한다.

# Pixel Pipeline

`JS/CSS > Style > Layout > Paint > Composite`

- Layout: 브라우저에 구성 요소를 배치하는 작업이다. 웹의 레이아웃 모델은 한 요소가 다른 요소에 영향을 줄 수 있다.
- Paint: 픽셀을 채우는 과정이다. 기본적으로 구성 요소의 모든 시각적 부분인 텍스트, 색상, 이미지 등을 그리는 작업이다.
- Composite: 화면에 표시하기 위해 페이지에서 paint 된 부분을 합치는 과정이다.

# 크롬 브라우저 Rendering Path

```
document.getElementById("box").style.height = "100px";
```

1. **recalculate style**: 엘리먼트에 style을 적용하기 위해 계산하는 작업 (엘리먼트의 style객체가 변경될 떄 발생함)
2. height 속성 변경으로 좌표 계산이 필요한가?
3. 계산이 필요하다면 **Layout** 발생: 언제 발생? width, height, left, top, scroll 등이 변경될 때 발생함.
4. 효과적인 처리를 위해 **Update Layer Tree**: Layout을 위해, Render Tree를 **변경**하고, paint를 위해 텍스쳐를 **예약**하는 작업
5. 계산된 영역의 정보를 비트맵으로 저장하기 위해 **paint** 발생: Layer에 엘리먼트의 픽셀 정보를 기록하는 작업
6. Composite Layer 작업에서 각 **레이어**를 병합 후, 화면 출력: Layer를 변형하여 화면에 그리는 작업

`부드러운 애니메이션을 위해서는 위 작업이 모두 10ms 내에 처리되어야 한다.`

**Layer model**: 웹 페이지를 렌더링하기 위해 필요한 이미지 단위 요소

- 레이어들을 배치/합성하여 최종적인 웹페이지를 표현한다.
- 모든 페이지는 root 레이어를 가진다.
- 레이어의 이미지는 텍스처로서 paint 작업시, CPU에 의해 Video Memory에 로드된다. 따라서, 레이어 생성 비용이 크고, 추가 Memory가 필요하다.

## 어떤 장치가 연산하여 각 렌더링 프로세스를 수행하는 것일까?

위 크롬 부라우저 Render Path에서 scirpt가 들어오면 **CPU**에서 **1번, 2번, 3번, 4번**이 이루어진다.  
그 결과를 **Main Memory**에 전달하고 저장하게 된다.  
이것을 **Video Memory**에 전달하면서 **5번**이 이루어진다.  
마지막으로 **GPU**에서 **6번**과정을 거치면서 화면에 출력이 된다.

- 필연적으로 **1번, 4번, 6번**는 꼭 발생한다.
- **4번과 6번**의 비용은 Layout과 Paint, 그리고 Layer에 결정되어 진다.

# 브라우저 렌더링 최적화

브라우저 렌더링을 최적화 하기 위해서는 `Layout, Paint를 줄이고, 최적의 Layer를 구성하면 된다.`

## Layout, Paint 비용 줄이기

Layout, paint를 유발하는 속성을 사용하지 않는다.  
reflow, repaint가 발생하는 속성 알아보기 => https://boxfoxs.tistory.com/408

대신, GPU가 처리할 수 있는 변형을 이용하여 같은 효과를 구현한다.  
왜? GPU가 연산 비용이 훨씬 적기 때문에

- ex) left/top에 의한 이동은 transform: translate를 이용, show/hide는 alpha 값을 이용하는 opacity를 이용  
  transform은 position과 다르게 layer를 새롭게 생성하기 때문에 그 결과 다른 layer에서 렌더링 후 composite하게 되므로 렌더링 성능이 개선된다.(싱글 스레드가 마치 멀티 스레드로 동작하는 것과 흡사)

## 최적의 Layer 구성하기

대상 DOM 노드가 주변이나 자신에 의해 자주 변경되지 않는 경우(transform, opacity 제외)로 구성
ex) 사용하지 않는 Layer는 display: none처리하기

## 참고 문서

- https://sculove.github.io/slides/improveBrowserRendering/#/7
- https://web.dev/rendering-performance/
