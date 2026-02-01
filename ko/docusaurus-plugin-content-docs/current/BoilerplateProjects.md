---
id: boilerplates
title: 보일러플레이트 프로젝트
---

Over time, our community has developed several projects that you can use as inspiration to set up your own test suite.

# v9 보일러플레이트 프로젝트

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

우리 자체 Cucumber 테스트 스위트용 보일러플레이트입니다. 150개 이상의 미리 정의된 스텝 정의를 만들었으므로 프로젝트에서 바로 기능 파일 작성을 시작할 수 있습니다.

- 프레임워크:
    - Cucumber
    - WebdriverIO
- 특징:
    - 필요한 거의 모든 것을 다루는 150개 이상의 미리 정의된 스텝
    - WebdriverIO의 Multiremote 기능 통합
    - 자체 데모 앱

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel 기능과 페이지 오브젝트 패턴을 사용하여 Jasmine으로 WebdriverIO 테스트를 실행하는 보일러플레이트 프로젝트입니다.

- 프레임워크
    - WebdriverIO
    - Jasmine
- 특징
    - 페이지 오브젝트 패턴
    - Sauce Labs 통합

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
최소한의 Electron 애플리케이션에서 WebdriverIO 테스트를 실행하는 보일러플레이트 프로젝트입니다.

- 프레임워크
    - WebdriverIO
    - Mocha
- 특징
    - Electron API 모킹
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

이 보일러플레이트 프로젝트는 Cucumber, TypeScript 및 Appium을 사용한 WebdriverIO 9 모바일 테스트를 제공하며, Android 및 iOS 플랫폼에서 페이지 오브젝트 모델 패턴을 따릅니다. 종합적인 로깅, 보고, 모바일 제스처, 앱에서 웹 탐색, CI/CD 통합 기능을 갖추고 있습니다.

- 프레임워크:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- 특징:
    - 다중 플랫폼 지원
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - 모바일 제스처
      - 스크롤
      - 스와이프
      - 길게 누르기
      - 키보드 숨기기
    - 앱-웹 탐색
      - 컨텍스트 전환
      - 웹뷰 지원
      - 브라우저 자동화 (Chrome/Safari)
    - 앱 상태 초기화
      - 시나리오 간 자동 앱 리셋
      - 구성 가능한 리셋 동작 (noReset, fullReset)
    - 기기 구성
      - 중앙 집중식 기기 관리
      - 쉬운 플랫폼 전환
    - JavaScript / TypeScript용 디렉토리 구조 예시. 아래는 JS 버전이며, TS 버전도 동일한 구조를 가지고 있습니다.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gherkin .feature 파일에서 WebdriverIO 페이지 오브젝트 클래스와 Mocha 테스트 스펙을 자동으로 생성하여 수동 작업을 줄이고, 일관성을 향상시키며, QA 자동화 속도를 높입니다. 이 프로젝트는 webdriver.io와 호환되는 코드를 생성할 뿐만 아니라 webdriver.io의 모든 기능을 향상시킵니다. 우리는 JavaScript 사용자용과 TypeScript 사용자용 두 가지 버전을 만들었습니다. 하지만 두 프로젝트 모두 동일하게 작동합니다.

***작동 방식?***
- 이 과정은 두 단계의 자동화를 따릅니다:
- 1단계: Gherkin에서 stepMap으로 (stepMap.json 파일 생성)
  - stepMap.json 파일 생성:
    - Gherkin 문법으로 작성된 .feature 파일을 파싱합니다.
    - 시나리오와 단계를 추출합니다.
    - 다음을 포함하는 구조화된 .stepMap.json 파일을 생성합니다:
      - 수행할 작업 (예: click, setText, assertVisible)
      - 논리적 매핑을 위한 selectorName
      - DOM 요소를 위한 selector
      - 값이나 assertion을 위한 note
- 2단계: stepMap에서 코드로 (WebdriverIO 코드 생성).
  stepMap.json을 사용하여 다음을 생성:
  - 공유 메서드와 browser.url() 설정이 포함된 기본 page.js 클래스를 생성합니다.
  - test/pageobjects/ 내에 기능별 WebdriverIO 호환 Page Object Model(POM) 클래스를 생성합니다.
  - Mocha 기반 테스트 스펙을 생성합니다.
- JavaScript / TypeScript용 디렉토리 구조 예시. 아래는 JS 버전이며, TS 버전도 동일한 구조를 가지고 있습니다.
```
project-root/
├── features/                   # Gherkin .feature 파일 (사용자 입력 / 소스 파일)
├── stepMaps/                   # 자동 생성된 .stepMap.json 파일
├── test/                 
│   ├── pageobjects/            # 자동 생성된 WebdriverIO 테스트 Page Object Model 클래스
│   └── specs/                  # 자동 생성된 Mocha 테스트 스펙
├── src/
│   ├── cli.js                  # 주요 CLI 로직
│   ├── generateStepsMap.js     # 기능-stepMap 생성기
│   ├── generateTestsFromMap.js # stepMap-페이지/스펙 생성기
│   ├── utils.js                # 헬퍼 메서드
│   └── config.js               # 경로, 대체 선택자, 별칭
│   └── __tests__/              # 단위 테스트 (Vitest)
├── testgen.js                  # CLI 진입점
│── wdio.config.js              # WebdriverIO 구성
├── package.json                # 스크립트 및 의존성
├── selector-aliases.json       # 기본 선택자를 재정의하는 선택적 사용자 정의 선택자
```
---
# v8 보일러플레이트 프로젝트

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- 프레임워크: WDIO-V8과 Cucumber (V8x).
- 특징:
    - 페이지 오브젝트 모델은 ES6/ES7 스타일 클래스 기반 접근 방식과 TypeScript 지원을 사용합니다
    - 한 번에 두 개 이상의 선택자로 요소를 쿼리하는 다중 선택자 옵션 예제
    - Chrome과 Firefox를 사용한 다중 브라우저 및 헤드리스 브라우저 실행 예제
    - BrowserStack, Sauce Labs, LambdaTest와의 클라우드 테스팅 통합
    - E2E 테스팅을 위한 외부 데이터 소스의 쉬운 테스트 데이터 관리를 위한 MS-Excel 데이터 읽기/쓰기 예제
    - 모든 RDBMS(Oracle, MySql, TeraData, Vertica 등)에 대한 데이터베이스 지원, E2E 테스팅을 위한 예제가 포함된 쿼리 실행/결과 세트 가져오기 등
    - 다중 보고(Spec, Xunit/Junit, Allure, JSON) 및 웹 서버에서 Allure와 Xunit/Junit 보고서 호스팅
    - 데모 앱 https://search.yahoo.com/ 및 http://the-internet.herokuapp.com 예제
    - BrowserStack, Sauce Labs, LambdaTest 및 Appium 전용 `.config` 파일(모바일 기기 재생용). iOS 및 Android 용 로컬 머신의 원클릭 Appium 설정은 [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)를 참조하십시오.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- 프레임워크: WDIO-V8과 Mocha (V10x).
- 특징:
    - 페이지 오브젝트 모델은 ES6/ES7 스타일 클래스 기반 접근 방식과 TypeScript 지원을 사용합니다
    - 데모 앱 https://search.yahoo.com 및 http://the-internet.herokuapp.com 예제
    - Chrome과 Firefox를 사용한 다중 브라우저 및 헤드리스 브라우저 실행 예제
    - BrowserStack, Sauce Labs, LambdaTest와의 클라우드 테스팅 통합
    - 다중 보고(Spec, Xunit/Junit, Allure, JSON) 및 웹 서버에서 Allure와 Xunit/Junit 보고서 호스팅
    - 외부 데이터 소스의 쉬운 테스트 데이터 관리를 위한 MS-Excel 데이터 읽기/쓰기 예제
    - E2E 테스팅을 위한 예제가 포함된 모든 RDBMS(Oracle, MySql, TeraData, Vertica 등)에 대한 DB 연결, 쿼리 실행/결과 세트 가져오기 등의 예제
    - BrowserStack, Sauce Labs, LambdaTest 및 Appium 전용 `.config` 파일(모바일 기기 재생용). iOS 및 Android 용 로컬 머신의 원클릭 Appium 설정은 [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)를 참조하십시오.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- 프레임워크: WDIO-V8과 Jasmine (V4x).
- 특징:
    - 페이지 오브젝트 모델은 ES6/ES7 스타일 클래스 기반 접근 방식과 TypeScript 지원을 사용합니다
    - 데모 앱 https://search.yahoo.com 및 http://the-internet.herokuapp.com 예제
    - Chrome과 Firefox를 사용한 다중 브라우저 및 헤드리스 브라우저 실행 예제
    - BrowserStack, Sauce Labs, LambdaTest와의 클라우드 테스팅 통합
    - 다중 보고(Spec, Xunit/Junit, Allure, JSON) 및 웹 서버에서 Allure와 Xunit/Junit 보고서 호스팅
    - 외부 데이터 소스의 쉬운 테스트 데이터 관리를 위한 MS-Excel 데이터 읽기/쓰기 예제
    - E2E 테스팅을 위한 예제가 포함된 모든 RDBMS(Oracle, MySql, TeraData, Vertica 등)에 대한 DB 연결, 쿼리 실행/결과 세트 가져오기 등의 예제
    - BrowserStack, Sauce Labs, LambdaTest 및 Appium 전용 `.config` 파일(모바일 기기 재생용). iOS 및 Android 용 로컬 머신의 원클릭 Appium 설정은 [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)를 참조하십시오.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

이 보일러플레이트 프로젝트는 cucumber와 typescript를 사용한 WebdriverIO 8 테스트를 페이지 오브젝트 패턴에 따라 포함하고 있습니다.

- 프레임워크:
    - WebdriverIO v8
    - Cucumber v8

- 특징:
    - Typescript v5
    - 페이지 오브젝트 패턴
    - Prettier
    - 다중 브라우저 지원
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - 크로스브라우저 병렬 실행
    - Appium
    - BrowserStack 및 Sauce Labs를 통한 클라우드 테스팅 통합
    - Docker 서비스
    - 데이터 공유 서비스
    - 각 서비스별 별도 구성 파일
    - 사용자 유형별 테스트 데이터 관리 및 읽기
    - 보고
      - Dot
      - Spec
      - 실패 스크린샷이 포함된 다중 cucumber html 보고서
    - Gitlab 저장소용 Gitlab 파이프라인
    - Github 저장소용 Github 액션
    - Docker 허브 설정을 위한 Docker compose
    - AXE를 사용한 접근성 테스트
    - Applitools를 사용한 시각적 테스트
    - 로그 메커니즘


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- 프레임워크
    - WebdriverIO (v8)
    - Cucumber (v8)

- 특징
    - cucumber의 샘플 테스트 시나리오 포함
    - 실패 시 내장된 비디오가 포함된 cucumber html 보고서 통합
    - Lambdatest 및 CircleCI 서비스 통합
    - 시각적, 접근성 및 API 테스팅 통합
    - 이메일 기능 통합
    - 테스트 보고서 저장 및 검색을 위한 s3 버킷 통합

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) 템플릿 프로젝트는 최신 WebdriverIO, Mocha 및 Serenity/JS를 사용하여 웹 애플리케이션의 인수 테스트를 시작하는 데 도움을 줍니다.

- 프레임워크
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD 보고

- 특징
    - [스크린플레이 패턴](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - 테스트 실패 시 자동 스크린샷, 보고서에 내장
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)을 사용한 지속적 통합(CI) 설정
    - GitHub Pages에 게시된 [데모 Serenity BDD 보고서](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) 템플릿 프로젝트는 최신 WebdriverIO, Cucumber 및 Serenity/JS를 사용하여 웹 애플리케이션의 인수 테스트를 시작하는 데 도움을 줍니다.

- 프레임워크
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD 보고

- 특징
    - [스크린플레이 패턴](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - 테스트 실패 시 자동 스크린샷, 보고서에 내장
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)을 사용한 지속적 통합(CI) 설정
    - GitHub Pages에 게시된 [데모 Serenity BDD 보고서](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumber 기능과 페이지 오브젝트 패턴을 사용하여 Headspin 클라우드(https://www.headspin.io/)에서 WebdriverIO 테스트를 실행하는 보일러플레이트 프로젝트입니다.
- 프레임워크
    - WebdriverIO (v8)
    - Cucumber (v8)

- 특징
    - [Headspin](https://www.headspin.io/)과 클라우드 통합
    - 페이지 오브젝트 모델 지원
    - BDD의 선언적 스타일로 작성된 샘플 시나리오 포함
    - cucumber html 보고서 통합

# v7 보일러플레이트 프로젝트
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

다음을 위한 WebdriverIO로 Appium 테스트를 실행하는 보일러플레이트 프로젝트:

- iOS/Android 네이티브 앱
- iOS/Android 하이브리드 앱
- Android Chrome 및 iOS Safari 브라우저

이 보일러플레이트에는 다음이 포함됩니다:

- 프레임워크: Mocha
- 특징:
    - 다음에 대한 구성:
        - iOS 및 Android 앱
        - iOS 및 Android 브라우저
    - 다음을 위한 헬퍼:
        - WebView
        - 제스처
        - 네이티브 알림
        - 피커
     - 다음에 대한 테스트 예제:
        - WebView
        - 로그인
        - 양식
        - 스와이프
        - 브라우저

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
PageObject가 있는 Mocha, WebdriverIO v6를 사용한 ATDD WEB 테스트

- 프레임워크
  - WebdriverIO (v7)
  - Mocha
- 특징
  - [페이지 오브젝트](pageobjects) 모델
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)를 통한 Sauce Labs 통합
  - Allure 보고서
  - 실패 테스트에 대한 자동 스크린샷 캡처
  - CircleCI 예제
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mocha로 E2E 테스트를 실행하는 보일러플레이트 프로젝트입니다.

- 프레임워크:
    - WebdriverIO (v7)
    - Mocha
- 특징:
    - TypeScript
    - [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    - [시각적 회귀 테스트](https://github.com/wswebcreation/wdio-image-comparison-service)
    - 페이지 오브젝트 패턴
    - [Commit lint](https://github.com/conventional-changelog/commitlint) 및 [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    - ESlint
    - Prettier
    - Husky
    - Github Actions 예제
    - Allure 보고서 (실패 시 스크린샷)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

다음을 위한 **WebdriverIO v7** 테스트를 실행하는 보일러플레이트 프로젝트:

[Cucumber 프레임워크에서 TypeScript를 사용한 WDIO 7 스크립트](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mocha 프레임워크에서 TypeScript를 사용한 WDIO 7 스크립트](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Docker에서 WDIO 7 스크립트 실행](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[네트워크 로그](https://github.com/17thSep/MonitorNetworkLogs/)

다음을 위한 보일러 플레이트 프로젝트:

- 네트워크 로그 캡처
- 모든 GET/POST 호출 또는 특정 REST API 캡처
- 요청 매개변수 검증
- 응답 매개변수 검증
- 모든 응답을 별도의 파일에 저장

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

페이지 오브젝트 패턴을 사용하여 cucumber v7 및 wdio v7로 네이티브 및 모바일 브라우저에 대한 appium 테스트를 실행하는 보일러플레이트 프로젝트입니다.

- 프레임워크
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- 특징
    - 네이티브 Android 및 iOS 앱
    - Android Chrome 브라우저
    - iOS Safari 브라우저
    - 페이지 오브젝트 모델
    - cucumber에 샘플 테스트 시나리오 포함
    - 다중 cucumber html 보고서 통합

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

이 템플릿 프로젝트는 최신 WebdriverIO 및 Cucumber 프레임워크를 사용하여 웹 애플리케이션에서 webdriverio 테스트를 실행하는 방법을 보여줍니다. 이 프로젝트는 Docker에서 WebdriverIO 테스트를 실행하는 방법을 이해하는 데 사용할 수 있는 기본 이미지 역할을 하는 것을 목적으로 합니다.

이 프로젝트에는 다음이 포함됩니다:

- DockerFile
- cucumber 프로젝트

자세한 내용은 다음에서 읽어보세요: [Medium 블로그](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

이 템플릿 프로젝트는 WebdriverIO를 사용하여 electronJS 테스트를 실행하는 방법을 보여줍니다. 이 프로젝트는 WebdriverIO electronJS 테스트를 실행하는 방법을 이해하는 데 사용할 수 있는 기본 이미지 역할을 하는 것을 목적으로 합니다.

이 프로젝트에는 다음이 포함됩니다:

- 샘플 electronjs 앱
- 샘플 cucumber 테스트 스크립트

자세한 내용은 다음에서 읽어보세요: [Medium 블로그](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

이 템플릿 프로젝트는 winappdriver와 WebdriverIO를 사용하여 윈도우 애플리케이션을 자동화하는 방법을 보여줍니다. 이 프로젝트는 windappdriver와 WebdriverIO 테스트를 실행하는 방법을 이해하는 데 사용할 수 있는 기본 이미지 역할을 하는 것을 목적으로 합니다.

자세한 내용은 다음에서 읽어보세요: [Medium 블로그](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


이 템플릿 프로젝트는 최신 WebdriverIO 및 Jasmine 프레임워크와 함께 webdriverio multiremote 기능을 실행하는 방법을 보여줍니다. 이 프로젝트는 Docker에서 WebdriverIO 테스트를 실행하는 방법을 이해하는 데 사용할 수 있는 기본 이미지 역할을 합니다.

이 프로젝트는 다음을 사용합니다:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

페이지 오브젝트 패턴을 사용하여 실제 Roku 장치에서 mocha를 사용하여 appium 테스트를 실행하는 템플릿 프로젝트입니다.

- 프레임워크
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure 보고

- 특징
    - 페이지 오브젝트 모델
    - Typescript
    - 실패 시 스크린샷
    - 샘플 Roku 채널을 사용한 예제 테스트

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E Multiremote Cucumber 테스트와 데이터 기반 Mocha 테스트를 위한 PoC 프로젝트

- 프레임워크:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- 특징:
    - Cucumber 기반 E2E 테스트
    - Mocha 기반 데이터 기반 테스트
    - 웹 전용 테스트 - 로컬 및 클라우드 플랫폼에서
    - 모바일 전용 테스트 - 로컬 및 원격 클라우드 에뮬레이터(또는 장치)
    - 웹 + 모바일 테스트 - Multiremote - 로컬 및 클라우드 플랫폼
    - Allure를 포함한 다양한 보고서 통합
    - 테스트 실행 후 파일에 데이터(즉석에서 생성)를 쓸 수 있도록 전역적으로 처리되는 테스트 데이터(JSON/XLSX)
    - 테스트를 실행하고 allure 보고서를 업로드하는 Github 워크플로

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

이 보일러플레이트 프로젝트는 최신 WebdriverIO를 사용하여 appium과 chromedriver 서비스를 사용한 webdriverio 멀티-리모트 실행 방법을 보여줍니다.

- 프레임워크
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- 특징
  - [페이지 오브젝트](pageobjects) 모델
  - Typescript
  - 웹 + 모바일 테스트 - Multiremote
  - 네이티브 Android 및 iOS 앱
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com 로그인과 [WebdriverIO 네이티브 데모 앱](https://github.com/webdriverio/native-demo-app)에 대한 테스트 예제