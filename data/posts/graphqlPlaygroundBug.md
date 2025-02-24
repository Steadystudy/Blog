### 문제

8월 28일 현재 크롬이 최근 업데이트를 하면서 몇몇 deprecated 이벤트가 작동을 안해서 아래와 같이 태그박스가 사라지지 않는 이슈가 생겼다.

![graphqlBug](/images/graphqlBug.png)

### 해결방법

정말 간단한 방법으로는 firefox 브라우저를 사용하면 위 태그박스가 사라진다.  
graphql-playground-react 라이브러리를 사용하면 'DomNodeRemoved' 이벤트가 발생하는 곳에 observer로 바꿀 수 있지만, apollo로 playground를 사용한다면 이러한 이슈를 해결할 수 없다.  
아래 참고자료를 확인하면 observer를 사용하는 코드를 확인할 수 있다.

### 참고자료

https://github.com/graphql/graphql-playground/issues/1429  
https://github.com/graphql/graphql-playground/issues/1430
