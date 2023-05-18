# 브라우저 구성요소

---

- 사용자 인터페이스: 주소표시줄, 이전/다음 버튼, 홈버튼, 새로고침 등 요청한 페이지를 보여주는 창 외에 사용자가 컨트롤할 수 있는 부분.
- 브라우저 엔진: 사용자 인터페이스와 렌더링 엔진 사이에 동작을 제어한다. ex) 전달자 역할, 자료 저장소에서 자료를 찾는 역할
- 자료 저장소: 쿠키 등의 자료를 컴퓨터 하드디스크에 저장한다. (HTML5부터 Web Database에 저장 가능)
- 렌더링 엔진: 요청한 URI를 브라우저 엔진에게 받아서 server에게 요청한다.(통신) server로부터 URI에 해당하는 데이터(HTML, CSS, JavaScript)를 받아서 파싱한 후 렌더링한다.(chrome webkit)
- 통신: 렌더링 엔진으로부터 HTTP 요청 등을 받아서 네트워크 처리 후 응답을 전달한다.
- 자바스크립트 해석기: Javascript를 파싱한다(chrome V8)
- UI 백엔드: 렌더트리를 브라우저에 그리는 역할을 담당한다.

# 브라우저 렌더링 과정(각 요소의 특징)

---

1. 사용자가 사용자 인터페이스에 주소표시줄에 URI를 입력하여 브라우저 엔진에 전달한다.
2. 브라우저 엔진은 자료 저장소에서 URI에 해당하는 자료를 찾고, 해당 자료를 쿠키에 저장했다면 그 자료를 렌더링 엔진에 전달한다.
3. 렌더링 엔진은 브라우저 엔진에서 가져온 자료를 분석한다. 동시에 URI 데이터를 통신, 자바스크립트 해석기, UI 백엔드로 전파한다.
4. 또한 렌더링 엔진은 통신 레이어에 URI에 대한 추가 데이터가 있다면 요청하고 응답할 때까지 기다린다.
5. 응답받은 데이터에서 HTML, CSS는 렌더링 엔진에 파싱한다.
6. 응답받은 데이터에서 Javascript는 JavaScript 해석기가 파싱한다.
7. JavaScript 해석기는 파싱한 결과를 렌더링 엔진에 전달하여 3번과 5번에서 파싱한 HTML의 결과인 DOM tree를 조작한다.
8. 조작이 완료되면 DOM node(DOM tree 구성요소)는 render object(렌더트리 구성요소)로 변한다.
9. UI 백엔드는 render object를 브라우저 렌더링 화면에 띄워준다.

# 렌더링 엔진

---

렌더링 엔진은 URI를 통해 요청을 받아서 해당하는 데이터를 렌더링하는 역할을 담당한다.  
chrome과 IOS는 webkit이라는 렌더링 엔진을 사용한다.

### 렌더링 엔진 동작 과정

`DOM tree 구축을 위한 HTML 파싱 => 렌더트리 구축 => 렌더트리 배치 => 렌더트리 그리기`

1. `DOM tree 구축`을 위한 HTML, CSS, Javscript 파싱: HTML 문서를 파싱한 후, content tree 내부에서 tag를 DOM node로 변환한다.
   그 다은 CSS 파일과 함께 모든 스타일 요소를 파싱한다. 스타일 요소와 HTML 표시 규칙, Javascript의 파싱 결과물은 렌더트리를 생성한다.
2. `렌더트리 구축`: HTML과 CSS를 파싱해서 만들어진 렌더트리는 색상 또는 면적 등 시각적 속성을 갖는 사각형을 포함한다. 정해진 순서대로 렌더링한다.
3. `렌더트리 배치`: 렌더트리가 생성이 끝나면, 배치가 시작된다. 각 노트가 정확한 위치에 표시되기 위해 이동한다.
4. `렌더트리 그리기`: 각 노드 배치를 완료하면 UI 백엔드에서 각 노드를 가로지르며 paint 작업을 한다.

**1번과 2,3,4번은 병렬적으로 진행된다.**
통신 레이어에서 data를 계속 받아오면서  
받아온 HTML, CSS, JavaScript를 파싱하면서(1번)
렌더트리에 노드를 그린다.(2,3,4번)

# webkit의 동작과정

1. HTML을 파싱하여 DOM 트리를 생성한다.

- 왜 HTML을 DOM 트리로 바꾸는가? DOM으로 바꾼 HTML은 JavaScript가 조작할 수 있다.

```
<html>
  <body>
    <span>Hello World</span>
    <script></script>
  </body>
</html>
```

브라우저는 tag의 파싱과 실행을 동시에 진행한다.

- 왜 `<script>`가 body 마지막 줄에 있어야 하나? 앞에 모든 태그들을 파싱한 뒤에 스크립트를 마지막에 파싱하는 동안 추가적으로 파싱할 html태그가 남아있지 않기 때문이다.
  그러므로 HTML5에서 추가된 기능이 있다.

* HTML에서는 `<script>` 태그를 비동기로 처리하는 속성을 추가했다.

2. CSS를 파싱하여 스타일 규칙을 얻는다.
3. DOM 트리를 생성하는 동시에, 이미 생성된 DOM 트리와 스타일 규칙을 Attachment 한다.
   - DOM tree를 구성하는 하나의 DOM node는 attach라는 method를 가진다. - 새로운 DOM node가 추가되면 attach가 호출되어 render object를 생성한다.
   - render object는 render tree의 구성요소로써, 자신과 자식 요소를 어떻게 배치하고 그려야할지 안다.
   - node의 css box를 표시할 정보를 가지고 있다.
   - 모든 DOM 노드가 전부 render object로 생성되는 것은 아니다. ex) head tag, display none tag 등
   - `<html>`과 `<body>` DOM 노드 또한 render object로 구성되는데 이들은 render tree root로써 render view라고 부른다.
   - 나머지 DOM node들은 render object로 생성되어 이 render tree root에 추가된다.
4. 구축한 렌더 트리를 배치한다.
   배치는 `<html>` 요소에 해당하는 최상위 render object에서 시작한다. 화면에 왼쪽 위부터 render object에 해당하는 DOM node를 그려나간다.
5. 배치가 끝난 렌더 트리를 그린다.

# references

---

- https://d2.naver.com/helloworld/59361
- https://davidhwang.netlify.app/Developments/browser-rendering-process/
