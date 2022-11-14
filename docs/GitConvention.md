## Git 컨벤션 

> **Branch**

**Branch convention**

<aside> 💡 관련 기능 키워드 작성은 `camel case`를 사용한다.

</aside>

```bash
#feat branch
<백/프>-<관련 기능 키워드>

# 예시
# fe-campaign
# be-user
# docs

# worker branch
<feat branch name>-<관련 기능>

# 예시
# be-user-socialApi
# be-user-logIn
# fe-user-commonSignUp
# fe-campaign-campaignWrite
```

- `work branch`는 `feat branch`에서 분기한다.

예시)

feat branch : **fe-user / be-user**

work branch : **be-user-socialApi**

feat branch는 **develop에서 분기한 브랜치**이며, social_login브랜치는 **feat-user 브랜치에서 분기**한 브랜치이다.

```
dev > be-user > be-user-socialApi
# branch 분기 (be-user는 이미 분기되어있다고 가정)
git checkout be-user
git checkout -b be-user-socialApi    # feat-user 브랜치에서 login-social_api 파생
... # 작업
git commit -m "소셜 로그인 기능 구현 - 구글"
git push origin be-user-socialApi
# Git lab에서 login-social_api를 feat-user에 Merge하는 Merge Request 생성
# 코드 리뷰
# Merge
```

**Branch 종류**

- 주요 브랜치

  - master
    - 서비스 중인 최종 버전
  - dev
    - 배포 준비 브랜치
    - 배포 준비가 될 경우에 release 브랜치를 분기한다.

- 보조 브랜치

  - be/fe-*

    > 갈라져 나온 브랜치 : dev merge할 브랜치 : dev 브랜치 이름 규칙 : feat-{기능분류}

    - 브랜치 이름 규칙에 대해서 고민이 있었다. JIRA의 에픽단위로 가기에는 기능이 너무 세분화되어있다. 서비스에 추가되는 기능의 단위는 회원 서비스, 캠페인 서비스 단위이지 회원 가입, 로그인 단위는 아니다. 그렇기 때문에 기능 분류를 Epic 보다 한 단계 더 크게 잡아줘야한다.
    - 해당 기능이 전부 완성된다면 merge를 진행한다.

  - release-*

    > 갈라져 나온 브랜치 : dev merge할 브랜치 : dev, master 브랜치 이름 규칙 : release-{버전명}

    - release는 배포를 준비하는 브랜치이다. 배포하는데 필요한 버전 넘버, 빌드 일정등의 메타데이터 준비하고 사소한 버그를 잡는다.
    - dev 브랜치가 배포될 수 있는 상태가 되었을 때 release 브랜치로 분기해야한다.
    - 만약 이번 배포에 포함되지 않을 기능은 release 브랜치 분기 전 까지 merge를 하지 않는다.
    - release 브랜치를 생성하는 것은 버전 넘버를 새로 부여하는 것을 의미한다.
    - 해당 기능이 전부 완성된다면 merge를 진행한다.
    - 배포 과정에서 발생한 버그는 release 브랜치에서 해결하며 추가되는 기능은 dev 브랜치에 merge하고 다음 배포에 포함시킨다.

  - hotfix-*

    > 갈라져 나온 브랜치 : master merge할 브랜치 : master, dev 브랜치 이름 규칙 : hotfix-{현재 버전 + 추가버전}  ex) 1.2.1

    - 버그를 수정했다면 dev 브랜치에도 merge해줘야지 다음 배포때 수정이 포함되어 배포된다.

> **PULL Conevention**

MR : Merge Request == Pull Request == PR == MR

```bash
<타입>:<이슈번호> <기능명>
--------------------------
[예시]
feat:S06P22B105-22 백엔드 프로젝트 초기설정
fix:S06P22B105-59 Swagger 작동 안되는 문제 수정
```

- 타입 리스트

  - **`feat`**: 새로운 기능 추가(a new feature)

  - **`fix`**: 버그 수정(a bug fix)

  - **`docs`**: 문서 수정(changes to documentation)

  - **`style`**: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 (formatting, missing semi colons, etc; no code change)

  - `refactor`

    : 코드 리팩토링(refactoring production code), 로직과 관계 없는 소스 코드 개선

    - 불필요한 파일 및 코드 삭제
    - 라우트 설정 파일 변경

  - **`test`**: 테스트 코드, 리펙토링 테스트 코드 추가(adding tests, refactoring test; no production code change)

  - `chore`

    : 빌드 업무 수정, 패키지 매니저 수정, 라이브러리, 환경 설정 파일(package.json, .config 등) 수정 등

    - updating build tasks, package manager configs, etc; no production code change

  - `**design**`: CSS 등 사용자 UI 디자인 변경

  - `**comment**`: 필요한 주석 추가 및 변경

  - `**rename**`: 파일 또는 폴더명을 수정하거나 옮기는 작업만 수행한 경우

  - `**remove**`: 파일을 삭제하는 작업만 수행한 경우

  - `**!BREAKING CHANGE**` : API의 큰 변경인 경우

  - `**!HOTFIX**`: 급하게 치명적인 버그를 고쳐야 하는 경우

> **Commit Conevention**

```bash
<타입>:<기능명>
--------------------------
[예시]
feat: 백엔드 프로젝트 초기설정
fix: 회원가입 수정
```

- 타입 리스트

  - **`feat`**: 새로운 기능 추가(a new feature)

  - **`fix`**: 버그 수정(a bug fix)

  - **`docs`**: 문서 수정(changes to documentation)

  - **`style`**: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 (formatting, missing semi colons, etc; no code change)

  - `refactor`

    : 코드 리팩토링(refactoring production code), 로직과 관계 없는 소스 코드 개선

    - 불필요한 파일 및 코드 삭제
    - 라우트 설정 파일 변경

  - **`test`**: 테스트 코드, 리펙토링 테스트 코드 추가(adding tests, refactoring test; no production code change)

  - `chore`

    : 빌드 업무 수정, 패키지 매니저 수정, 라이브러리, 환경 설정 파일(package.json, .config 등) 수정 등

    - updating build tasks, package manager configs, etc; no production code change

  - `**design**`: CSS 등 사용자 UI 디자인 변경

  - `**comment**`: 필요한 주석 추가 및 변경

  - `**rename**`: 파일 또는 폴더명을 수정하거나 옮기는 작업만 수행한 경우

  - `**remove**`: 파일을 삭제하는 작업만 수행한 경우

  - `**!BREAKING CHANGE**` : API의 큰 변경인 경우

  - `**!HOTFIX**`: 급하게 치명적인 버그를 고쳐야 하는 경우