---
id: setuptypes
title: 설정 유형
---

WebdriverIO는 다양한 용도로 사용될 수 있습니다. WebDriver 프로토콜 API를 구현하여 브라우저를 자동화된 방식으로 실행할 수 있습니다. 이 프레임워크는 모든 임의의 환경과 모든 종류의, 작업을 위해 작동하도록 설계되었습니다. 프레임워크는 어떠한 서드파티 프레임워크에도 독립적이며 실행하기 위해 Node.js만 필요합니다.

## 프로토콜 바인딩

WebDriver 및 다른 자동화 프로토콜과의 기본 상호 작용을 위해 WebdriverIO는 [`webdriver`](https://www.npmjs.com/package/webdriver) NPM 패키지를 기반으로 자체 프로토콜 바인딩을 사용합니다:

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

모든 [프로토콜 명령](api/webdriver)은 자동화 드라이버에서 원시 응답을 반환합니다. 이 패키지는 매우 가벼우며 프로토콜 사용과의 상호 작용을 단순화하기 위한 자동 대기와 같은 스마트 로직이 __없습니다__.

인스턴스에 적용되는 프로토콜 명령은 드라이버의 초기 세션 응답에 따라 달라집니다. 예를 들어 응답이 모바일 세션이 시작되었음을 나타내는 경우, 패키지는 모든 Appium 및 Mobile JSON Wire 프로토콜 명령을 인스턴스 프로토타입에 적용합니다.

[`devtools`](https://www.npmjs.com/package/devtools) NPM 패키지를 가져와서 Chrome DevTools 프로토콜을 사용하여 동일한 명령 세트(모바일 명령 제외)를 실행할 수 있습니다. 이것은 `webdriver` 패키지와 동일한 인터페이스를 가지고 있지만 [Puppeteer](https://pptr.dev/)를 기반으로 자동화를 실행합니다.

이러한 패키지 인터페이스에 대한 자세한 내용은 [모듈 API](/docs/api/modules)를 참조하세요.

## 독립 실행 모드

WebDriver 프로토콜과의 상호 작용을 단순화하기 위해 `webdriverio` 패키지는 프로토콜 위에 다양한 명령(예: [`dragAndDrop`](api/element/dragAndDrop) 명령)과 [스마트 선택자](selectors) 또는 [자동 대기](autowait)와 같은 핵심 개념을 구현합니다. 위의 예제는 다음과 같이 단순화될 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

독립 실행 모드에서 WebdriverIO를 사용하면 여전히 모든 프로토콜 명령에 액세스할 수 있지만 브라우저와의 상호 작용 수준을 높이는 추가 명령의 상위 집합을 제공합니다. 이를 통해 새로운 자동화 라이브러리를 만들기 위해 자신의 (테스트) 프로젝트에 이 자동화 도구를 통합할 수 있습니다. 인기 있는 예로는 [Oxygen](https://github.com/oxygenhq/oxygen) 또는 [CodeceptJS](http://codecept.io)가 있습니다. 콘텐츠를 웹에서 스크랩하는 일반 Node 스크립트를 작성할 수도 있습니다(또는 실행 중인 브라우저가 필요한 다른 작업).

특정 옵션이 설정되지 않은 경우 WebdriverIO는 항상 capabilities의 `browserName` 속성과 일치하는 브라우저 드라이버를 다운로드하고 설정하려고 시도합니다. Chrome 및 Firefox의 경우 해당 브라우저를 기기에서 찾을 수 있는지 여부에 따라 이들을 설치할 수도 있습니다.

`webdriverio` 패키지 인터페이스에 대한 자세한 내용은 [모듈 API](/docs/api/modules)를 참조하세요.

## WDIO 테스트러너

그러나 WebdriverIO의 주요 목적은 대규모 엔드투엔드 테스트입니다. 따라서 우리는 읽기 쉽고 유지 관리가 쉬운 안정적인 테스트 스위트를 구축하는 데 도움이 되는 테스트 러너를 구현했습니다.

테스트 러너는 일반 자동화 라이브러리를 사용할 때 흔히 발생하는 많은 문제를 해결합니다. 하나는 테스트 실행을 구성하고 테스트 명세를 분할하여 최대 동시성으로 테스트를 실행할 수 있도록 합니다. 또한 세션 관리를 처리하고 문제를 디버깅하고 테스트에서 오류를 찾는 데 도움이 되는 많은 기능을 제공합니다.

다음은 WDIO에서 실행되는 테스트 명세로 작성된 위의 예제입니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

테스트 러너는 Mocha, Jasmine 또는 Cucumber와 같은 인기 있는 테스트 프레임워크의 추상화입니다. WDIO 테스트 러너를 사용하여 테스트를 실행하려면 자세한 내용은 [시작하기](gettingstarted) 섹션을 확인하세요.

`@wdio/cli` 테스트러너 패키지 인터페이스에 대한 자세한 내용은 [모듈 API](/docs/api/modules)를 참조하세요.