---
id: protocols
title: 프로토콜 명령어
---

WebdriverIO는 원격 에이전트(예: 브라우저, 모바일 기기 또는 텔레비전)를 제어하기 위해 다양한 자동화 프로토콜에 의존하는 자동화 프레임워크입니다. 원격 장치에 따라 다른 프로토콜이 적용됩니다. 이러한 명령어는 원격 서버(예: 브라우저 드라이버)의 세션 정보에 따라 [Browser](/docs/api/browser) 또는 [Element](/docs/api/element) 객체에 할당됩니다.

내부적으로 WebdriverIO는 원격 에이전트와의 거의 모든 상호 작용에 프로토콜 명령어를 사용합니다. 그러나 [Browser](/docs/api/browser) 또는 [Element](/docs/api/element) 객체에 할당된 추가 명령어는 WebdriverIO의 사용을 단순화합니다. 예를 들어, 프로토콜 명령어를 사용하여 요소의 텍스트를 가져오는 것은 다음과 같습니다:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

[Browser](/docs/api/browser) 또는 [Element](/docs/api/element) 객체의 편리한 명령어를 사용하면 이를 다음과 같이 줄일 수 있습니다:

```js
$('#lst-ib').getText()
```

다음 섹션에서는 각 개별 프로토콜을 설명합니다.

## WebDriver 프로토콜

[WebDriver](https://w3c.github.io/webdriver/#elements) 프로토콜은 브라우저 자동화를 위한 웹 표준입니다. 다른 E2E 도구와 달리 Firefox, Safari, Chrome 및 Edge와 같은 Chromium 기반 브라우저 등 실제 사용자가 사용하는 브라우저에서 자동화를 수행할 수 있으며, WebKit과 같은 브라우저 엔진에서만 수행하는 것이 아닙니다.

[Chrome DevTools](https://w3c.github.io/webdriver/#elements)와 같은 디버깅 프로토콜 대신 WebDriver 프로토콜을 사용하는 장점은 모든 브라우저에서 동일한 방식으로 브라우저와 상호 작용할 수 있는 특정 명령 세트가 있어 불안정성의 가능성을 줄인다는 것입니다. 또한 이 프로토콜은 [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) 및 [기타](https://github.com/christian-bromann/awesome-selenium#cloud-services)와 같은 클라우드 공급업체를 사용하여 대규모 확장성을 제공합니다.

## WebDriver Bidi 프로토콜

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) 프로토콜은 프로토콜의 두 번째 세대로 현재 대부분의 브라우저 공급업체에서 작업 중입니다. 이전 버전과 비교하여 이 프로토콜은 프레임워크와 원격 장치 간의 양방향 통신(따라서 "Bidi")을 지원합니다. 또한 브라우저에서 현대적인 웹 애플리케이션을 더 잘 자동화하기 위한 더 나은 브라우저 내부 검사를 위한 추가 기본 요소를 도입합니다.

이 프로토콜은 현재 진행 중이므로 시간이 지남에 따라 더 많은 기능이 추가되고 브라우저에서 지원될 것입니다. WebdriverIO의 편리한 명령어를 사용하는 경우 변경 사항은 없을 것입니다. WebdriverIO는 이러한 새로운 프로토콜 기능을 브라우저에서 사용 가능하고 지원되는 즉시 활용할 것입니다.

## Appium

[Appium](https://appium.io/) 프로젝트는 모바일, 데스크톱 및 기타 모든 종류의 IoT 장치를 자동화하는 기능을 제공합니다. WebDriver가 브라우저와 웹에 중점을 두는 반면, Appium의 비전은 동일한 접근 방식을 사용하되 임의의 장치에 적용하는 것입니다. WebDriver가 정의하는 명령 외에도 자동화되는 원격 장치에 특정한 특수 명령이 있습니다. 모바일 테스트 시나리오의 경우 Android와 iOS 애플리케이션 모두에 대해 동일한 테스트를 작성하고 실행하려는 경우 이상적입니다.

Appium [문서](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)에 따르면, 다음 네 가지 원칙에 따라 모바일 자동화 요구를 충족하도록 설계되었습니다:

- 앱을 자동화하기 위해 앱을 재컴파일하거나 어떤 방식으로든 수정할 필요가 없어야 합니다.
- 테스트를 작성하고 실행하기 위해 특정 언어나 프레임워크에 묶여 있어서는 안 됩니다.
- 모바일 자동화 프레임워크는 자동화 API에 관해서 바퀴를 재발명해서는 안 됩니다.
- 모바일 자동화 프레임워크는 정신적으로나 실질적으로, 그리고 이름뿐만 아니라 오픈 소스여야 합니다!

## Chromium

Chromium 프로토콜은 WebDriver 프로토콜 위에 명령어의 슈퍼셋을 제공하며, [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) 또는 [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver)를 통해 자동화 세션을 실행할 때만 지원됩니다.

## Firefox

Firefox 프로토콜은 WebDriver 프로토콜 위에 명령어의 슈퍼셋을 제공하며, [Geckodriver](https://github.com/mozilla/geckodriver)를 통해 자동화 세션을 실행할 때만 지원됩니다.

## Sauce Labs

[Sauce Labs](https://saucelabs.com/) 프로토콜은 WebDriver 프로토콜 위에 명령어의 슈퍼셋을 제공하며, Sauce Labs 클라우드를 사용하여 자동화 세션을 실행할 때만 지원됩니다.

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) 프로토콜은 WebDriver 프로토콜 위에 명령어의 슈퍼셋을 제공하며, Selenium Grid를 사용하여 자동화 세션을 실행할 때만 지원됩니다.

## JSON Wire 프로토콜

[JSON Wire 프로토콜](https://www.selenium.dev/documentation/legacy/json_wire_protocol/)은 WebDriver 프로토콜의 전신이며 오늘날 __사용 중단__ 되었습니다. 일부 환경에서 일부 명령이 여전히 지원될 수 있지만, 그 명령어를 사용하는 것은 권장되지 않습니다.

## Mobile JSON Wire 프로토콜

[Mobile JSON Wire 프로토콜](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md)은 JSON Wire 프로토콜 위에 모바일 명령어의 슈퍼셋입니다. 이것이 사용 중단되었으므로 Mobile JSON Wire 프로토콜도 __사용 중단__ 되었습니다. Appium은 여전히 일부 명령을 지원할 수 있지만 사용하는 것은 권장되지 않습니다.