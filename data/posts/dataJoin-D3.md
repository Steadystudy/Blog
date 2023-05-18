# Data Join

- DOM element와 Selection, Data가 결합하는 것
- d3에서 데이터는 셀렉션의 속성이 아니고, 셀렉션의 최말단 문서요소들의 속성이다.
- 데이터를 셀렉션에 바인딩 하면, 데이터는 셀렉션의 최말단 DOM 문서요소의 \_\_data\_\_라는 속성에 할당된다.

## selection.data(data[,key])

- 데이터를 바인딩

  ### Key

- Selection에 데이터를 결합하는 방법을 설명함
- Selection의 객체 불변성을 유지하면서 새로운 데이터로 업데이트할 수 있음

## selection.join(enter[, update][, exit])

- 반환할 땐, 신규요소 + 기존 요소를 정렬하여 모두 반환

- enter

  - 신규 요소를 추가
  - enter 셀렉션은 아직 존재하지 않는 문서요소를 나타내기 때문에 보통 셀렉션과 다르다.
  - enter selection은 DOM 문서요소를 포함하지 않고 \_\_data\_\_ 속성만을 가지는 단순 객체를 포함한다.
  - selection.selectAll을 호출하여 노드가 group 배열의 부모로 삽입되도록 해야 한다.

- update

  - 기존 요소에 대한 업데이트 동작

- exit
  - 유효하지 않은 기존 데이터를 처리하는 방식
  - exit 셀렉션은 원래 셀렉션의 순서를 그대로 보존한다. 애니메이션 효과를 주면서 삭제할 때 유용하다.

```js
const movies = [
  {
    name: 영화1,
    year: 2022,
  },
  {
    name: 영화2,
    year: 2023,
  },
];

const svg = d3.select('body').append('svg');
svg
  .selectAll('rect')
  .data(movies, (movie) => movie.year)
  .join(
    (enter) => enter.append('rect').attr('fill', 'red'),
    (update) => update.attr('fill', 'orange'),
    (exit) => exit.remove(),
  );
```

# 데이터를 가져오는 방법

```
// csv 파일 가져오기 => 반환되는 모든 값이 문자열이다.
// 숫자로 된 값이 필요하다면 map이나 filter등을 사용해 가공해야한다
const csvData = await d3.csv('./data/movie.csv');
const data = csvData.map(d => parseInt(d.year))

// tsv 파일 가져오기
const tsvData = await d3.tsv('./data/movie.tsv');

// text 파일 가져오기
const textData = await d3.text('./data/movie.csv');

// xml 파일 가져오기
const xmlData = await d3.xml('./data/movie.xml');

// html 파일 가져오기
const htmlData = await d3.html('./data/movie.html');

// json 파일 가져오기
const jsonData = await d3.json('./data/movie.json');

// api request에서 가져오기
const apiData = await d3.json(api 불러올 url);
```
