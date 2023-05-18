## D3

데이터 기반으로 DOM을 다루는 자바스크립트 라이브러리

- 특징
  - 다양한 데이터 포맷처리 & import 제공
  - HTML, SVG 웹 표준 기술을 다양하게 사용
  - 데이터와 DOM element를 결합

### SVG(Scalable Vector Graphics)

- 크기를 축소/ 확대하면 해상도를 조절 (픽셀이 깨지지 않음)
- HTML과 비슷한 마크업 언어 설정 (<circle />, <rect />)
- SVG는 XML코드이기 때문에 파일의 크기가 작음
- XML코드에는 키워드, 설명, 링크 등이 포함될 수 있습니다. 그래서 해당 콘텐츠를 검색 엔진에서 더 쉽게 접할 수 있도록 할 수 있습니다. (SEO에 친화적)

### D3와 SVG

- 각각의 데이터 포인트를 SVG element와 결합
- 시각적인 형태와 위치를 조절
- SVG로 만들어서 확대/ 축소를 해도 해상도 픽셀이 흐려지거나 깨지지 않음

### D3 단점?

- 분석 툴이 아니므로 Excel 처럼 쉽고 빠르게 시각화를 만들어낼 순 없음
- selections, transitions 등.. 원리들을 이해해야 함

### 메서드

- d3.select(selector)

  - querySelector와 흡사
  - 인자와 일치한 가장 첫번째 요소로 Selection 객체 구성
  - 일치하는게 없으면, 빈 배열을 가진 Selection 객체 구성

- d3.selectAll(selector)

- selection.text([value])

  - Selection이 가리키는 element의 텍스트를 가져옴
  - 인자 값을 넣으면, 해당 값으로 Selection의 텍스트 설정

- selection.attr(name[, value])

  - Selection이 가리키는 element의 속성을 가져오거나 설정

- selection.style(node, name)

  - Selection이 가리키는 element의 스타일을 설정

- selection.classed(node[, value])
  - value가 없으면 Selection이 가리키는 element의 CSS 클래스
    여부를 확인(있으면 true)
  - value가 true라면 Selection이 가리키는 element의 CSS 클래스를 할당
  - value가 false라면 Selection이 가리키는 element의 CSS 클래스 비할당
- selection.append(type)

  - element의 자식으로 요소를 추가
  - 생성된 요소를 반환하기 때문에, 코드 마지막에 넣거나 변수를 활용을 권장

- selection.remove()
  - element를 DOM에서 삭제
  - 제거된 요소를 반환
- selection.insert(type[, before])
  - before element를 추가하면 append와 다르게 지정된 요소 앞에 새로운 문서 요소를 추가
  - before 생략시 append와 동일
- selection.clone(boolean)
- selection.raise()
  - selection의 요소를 해당 부모의 마지막 자식으로 DOM에 다시 삽입합니다.
- selection.lower()
  - selection의 요소를 해당 부모의 첫번째 자식으로 다시 삽입합니다. (raise와 반대)
- selection.sort(func)
  - d3에서 제공하는 비교지들을 사용할수있다
    - d3.ascending, d3.descending
      ex) .sort((a,b) ⇒ d3.ascending(a.width, b.width))
- selection.nodes()
  - selection의 모든 요소를 배열로 반환
  - ex) d3.selectAll(’rect’).nodes()
- selection.node()
  - selection의 첫번째 요소를 반환
  - selection이 비어 있으면 null을 반환
- selection.call(func [, arguments..])
  - 여러 selection에 실행해야 하는 일련의 처리가 있는 경우 유용
  - 호출된 selection을 반환하므로 체이닝으로 사용될 수 있다.
  - 두번째부터 추가되는 매개변수는 함수 실행시 이 매개변수 값들이 함수에 전달됩니다.
