# Snippet

스니펫(snippet)이란 재사용 가능한 소스 코드를 말한다.  
가끔 반복적인 코드가 필요할 때 스니펫을 설정하여 사용하면 도움이 많이 된다.  
본인은 스토리북 설정이나 블로그 글을 쓸 때 사용하고 있다.  
예를 들어, 아래와 같은 코드를 매번 블로그 글을 최상단에 작성해야 한다.

```
---
emoji: ✍️
title: markdown snippet 설정
date: 2022-12-09 00:14
author: Steadystudy
tags: snippet
categories: snippet
---
```

스니펫을 설정하여 단축어를 쓰면 훨씬 편하게 작성할 수 있다.

## 설정 방법

mac 기준으로 `command` + `shift` + `p`를 눌러준 후  
`Snippets: Configure User Snippets`을 클릭 후  
스크롤해서 아래로 내려 `markdown.json`을 클릭하면 된다.

```
{
  "블로그 글 기본 설정": {
    "prefix": "blog",
    "body": [
      "---",
      "emoji: ",
      "title: ",
      "date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}",
      "author: Steadystudy",
      "tags: ",
      "categories: ",
      "---"
    ],
    "description": "블로그 글 기본 설정"
  }
}
```

`"date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}"`처럼  
변수를 사용하면 'blog'를 클릭했을 때 년도, 날짜, 시간 등을 자동으로 기재해준다.

자세한 스니펫 세팅은 아래 글을 참조하면 된다.  
[Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets)
[Snippet 완성 툴](https://snippet-generator.app/)
최근에 드림코딩 유튜브에서 스니펫 설정 및 꿑팁들을 올려주셨다!
[드림코딩 스니펫 영상](https://www.youtube.com/watch?v=umeqCopb96w&ab_channel=%EB%93%9C%EB%A6%BC%EC%BD%94%EB%94%A9)

## 마크다운 단축키가 안 뜨는 경우

setting에 들어가서 setting.json에 아래 설정을 추가하면 단축키가 보이게 된다.

```
"[markdown]": {
    "editor.quickSuggestions": {
      "other": true,
      "comments": false,
      "strings": true
    }
  },
```
