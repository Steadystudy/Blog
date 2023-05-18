## 목표

- 버전 관리가 무엇인지 설명할 수 있다.
- Git의 동작 원리를 설명할 수 있다.
- Git의 기본 기능과 심화 기능을 실전에 사용할 수 있다.

# Git

Git은 분산 버전 관리 도구이다.

## 분산 버전 관리 시스템(DVCS)

- 저장소를 히스토리와 더불어 '전부' 복제한다. 만약 서버에 문제가 생기더라도 이 복제물로 다시 작업을 시작할 수 있다.
- 리모트 저장소가 존해하여 사람들이 동시에 다양한 방법으로 협업할 수 있다.

## Git의 목표

- 빠른 속도
- 단순한 구조
- 비선형적인 개발(동시 다발적인 브랜치)
- 완벽한 분산
- Linux 커널 같은 대형 프로젝트에도 유용할 것

## Git의 기초

- 다른 버전 관리 시스템(VCS)과 Git의 가장 큰 차이점은 `데이터를 다루는 방법`에 있다.

큰 틀에서 봤을 때 VCS 대부분은 관리하는 정보가 파일들의 목록이다. 각 파일의 변화를 시간순으로 관리하면서 파일들의 집합을 관리한다.

하지만 Git은 이런 식으로 데이터를 저장하지 않는다. 대신 Git은 데이터를 파일 시스템 스냅샷의 연속으로 취급하고 크기가 아주 작다.  
Git은 커밋하거나 프로젝트의 상태를 저장할 때마다 파일이 존재하는 그 순간을 중요하게 여긴다.  
파일이 달라지지 않았으면 Git은 성능을 위해서 파일을 새로 저장하지 않고, 이전 상태의 파일에 대한 링크만 저장한다.  
즉, Git은 데이터를 `스냅샷의 스트림`처럼 취급한다.

---

## Git을 사용하면 얻는 이득

### 거의 모든 명령을 로컬에서 실행할 수 있다.

- 거의 모든 명령이 로컬 파일과 데이터만 사용하기 때문에 네트워크에 있는 다른 컴퓨터는 필요 없다. 즉, 오프라인 상태이거나 VPN에 연결하지 못해도 커밋할 수 있다.

### Git의 무결성

- Git은 데이터를 저장하기 전에 항상 체크섬을 구하고 그 체크섬으로 데이터를 관리한다.
- 체크섬은 중복 검사의 한 형태로, 자료의 무결성을 보호하는 방법이다.

---

## Git의 세 가지 상태와 세 가지 단계

- `Committed`: 데이터가 로컬 데이터베이스에 안전하게 저장됐다는 것을 의미한다.
- `Modified`: 수정한 파일을 아직 로컬 데이터베이스에 커밋하지 않은 것을 말한다.
- `Staged`: 현재 수정한 파일을 곧 커밋할 것이라고 표시한 상태를 의미한다.

이 세 가지 상태는 Git 프로젝트의 세 가지 단계와 연결돼 있다.

- Git Directory: Git이 프로젝트의 메타데이터와 객체 데이터베이스를 저장하는 곳을 말한다. 다른 컴퓨터에 있는 저장소를 Clone할 때 Git Directory가 만들어진다.
- Working Tree: 프로젝트의 특정 버전을 Checkout 한 것이다. Git Directory는 지금 작업하는 디스크에 있고 그 Directory 안에 압축된 데이터베이스에서 파일을 가져와서 Working Tree를 만드는 것이다.
- Staging Area: Git Directory에 있다. 단순한 파일이고 곧 커밋할 파일에 대한 정보를 저장한다.

Git Directory에 있는 파일들은 `Commited` 상태이다. 파일을 수정하고 Staging Area에 추가했다면 `Staged`이고, 추가하지 않았다면 `Modified`이다.  
Git이 모르는 파일은 `Untracked`이다.
파일을 수정하지 않았다면 `Unmodified`이다.

## Commit 순서

1. Working Tree에서 파일을 수정한다.
2. Staging Area에 파일을 Stage해서 커밋할 스냅샷을 만든다. 모든 파일을 추가할 수도 있고 선택하여 추가할 수도 있다.
3. Staging Area에 있는 파일들을 commit해서 Git Directory에 스냅샷으로 저장한다.

# Git 명령어(심화)

## add

- staging area에 파일을 올릴 때 사용
- 사용 방법
  - 파일 전체 올리는 경우
    ```
      git add .
    ```
- vsc에서 소스제어에서 특정 파일만 올리거나 전체를 올리는 등 쉽게 제어가 가능하다.

## commit

- 사용 방법
  - 커밋 메세지 작성하는 경우
    ```
      git commit -m '(커밋 제목)'
    ```
  - 직전 커밋의 이름을 변경하고 싶은 경우
    ```
      git commit --amend -m '(변경할 커밋 제목)'
    ```
  - 직전 커밋의 내용을 변경하고 싶은 경우
    ```
      git commit --amend
    ```

## tag

- git log가 길어진다면 어떤 특정한 부분으로 가기 어렵기 때문에 tag를 이용하여 북마크처럼 사용한다.
- ### sementic version

  ex) v2.0.0 (major.minor.fix)

- tag 생성 방법
  ```
    git tag v1.0.0 0adb2dd
    // (tag name) (특정 commit 해시코드)
  ```
- 해당 tag로 이동하는 방법: git checkout (tag name)

## rebase

- 주의사항

  - rebase 하면 안되는 경우

    > 다른 개발자와 한 브랜치에서 개발하는 경우  
    > 이미 history가 서버에 업로드된 경우

  - Rebase는 `기존의 커밋을 그대로 사용하는 것이 아니라 내용은 같지만 다른 커밋을 새로 만든다.`
  - 다른 개발자와 한 브랜치에서 개발하고 있다면 rebase 하고 push를 하여 서버에 변경된 정보를 업데이트 하게 된다면 커밋이 완전 달라지기 때문에 merge conflict이 발생할 수 있다.
  - 서버에 업로드 되지 않는 나의 로컬에 한해서는 rebase를 해도 된다.

- rebase 과정

  글로는 설명하기 힘들어 그림으로 설명되어 있는 [공식사이트](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0)를 올립니다.

- 사용 방법

  - master와 feature 두 브랜치만 있는 경우
    ```
      git checkout feature
      git rebase master
    ```
  - (master)와 (base branch인 feature)과 (feature에서 파생된 브랜치 feat2)에서 feat2 브랜치를 master에 rebase 하는 경우
    ```
      git checkout master
      git rebase --onto master feature feat2
      // (rebase 붙일 곳) (base branch name) (파생된 branch name)
    ```

- 옵션

  -i

## cherry-pick

- 작업하는 branch에서 딱 하나의 커밋만 다른 브랜치에 머지하고 싶을 때 사용한다.
  ```
    // master에 붙이려고 할 때
    git checkout master
    git cherry-pick (특정 커밋 해시코드)
  ```

## stash

- 작업하는 내용을 잠시 저장할 수 있다.
- 사용 방법

  ```
    // stash 하기
    git stash push -m '(이름)'

    // stash한 list를 보기
    git stash list

    // stash@{1} 처럼 list 중 하나를 지정하여 들고오기
    git stash apply stash@{1}

    // stash를 삭제하기
    git stash drop stash@{1}
  ```

- 소스트리를 사용하면 훨씬 편하게 사용할 수 있다.

## reset

- 특정 커밋으로 초기화 시켜줄 수 있는 명령어이다.

- 옵션

  - soft

    history에서 삭제하면서 staging area로 초기화하고 싶을 떄

  - mixed

    history에서 삭제하면서 working directory로 초기화하고 싶을 떄

  - hard

    완전히 작업했던 내용도 삭제하고 싶을 때

- 사용 방법
  - HEAD에서 3번째 앞까지 초기화 경우
    ```
      git reset --옵션 HEAD~3
    ```
  - 특정 커밋으로 초기화하는 경우
    ```
      git reset --옵션 (특정 해시코드)
    ```

## reflog

- 이전의 HEAD가 기록한 것(커밋)으로 다시 되돌아갈 수 있다.
- 실수로 reset --hard한 경우 유용하게 쓰일 수 있다.
- 사용 방법
  ```
    git reflog
    // 다시 되돌리고 싶은 기록의 해시코드를 복사하여
    git reset --hard (해시코드)
  ```
- 다만 커밋하지 않은 파일이 있을 때 reset --hard한 경우 그 파일을 되찾기 힘들다. 그러므로 git reset --hard를 주의해서 사용하자.
- extension에서 `Local History`를 사용한다면 커밋하지 않아도 되돌릴 수 있다고 한다.

## revert

- 해당하는 커밋의 변경사항을 다시 되돌려는, 취소하는 명령어이다.
- 사용 방법
  ```
    git revert (특정 해시코드 or HEAD~index)
  ```

## fetch

- 서버에 있는 git history를 받아와서 나의 git history에 업데이트 하지만 HEAD는 그대로 유지된다.
- 서버에서 어떤 일이 발생하고 있는지 확인하고 싶을 때 사용하기 좋다.
- 사용 방법
  ```
    // 서버에 있는 git history를 모두 들고오기
    git fetch
    // 특정 브랜치에 있는 history만 들고오기
    git fetch (특정 브랜치)
  ```

## pull

- 서버에 있는 git history를 가지고 오면서 HEAD도 서버 최신 커밋으로 바뀐다.
- 서버에 있는 내용을 받아와서 로컬 버전도 서버와 동일하게 하고 싶을 때 사용한다.
- 사용 방법
  ```
    git pull
  ```

# Trouble Shooting

- 로컬과 서버에서 각각 동일한 파일을 수정했을 때, 서로 새로운 커밋이 있는 경우, 로컬에 있는 커밋을 아직 서버에 올리지 않았을 때 사용할 수 있는 방법
  ```
    git pull --rebase
    git mergetool
    // 수정 후
    git rebase --continue
  ```
