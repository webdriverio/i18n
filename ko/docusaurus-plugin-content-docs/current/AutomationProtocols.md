---
id: automationProtocols
title: 자동화 프로토콜
---

WebdriverIO를 사용하면 E2E 테스트를 로컬에서 또는 클라우드에서 실행할 때 여러 자동화 기술 중에서 선택할 수 있습니다. 기본적으로 WebdriverIO는 [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) 프로토콜을 사용하여 로컬 자동화 세션을 시작하려고 시도합니다.

## WebDriver Bidi 프로토콜

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)는 양방향 통신을 사용하여 브라우저를 자동화하기 위한 자동화 프로토콜입니다. 이는 [WebDriver](https://w3c.github.io/webdriver/) 프로토콜의 후속 버전이며 다양한 테스트 사용 사례를 위한 더 많은 검사 기능을 제공합니다.

이 프로토콜은 현재 개발 중이며 앞으로 새로운 기본 요소가 추가될 수 있습니다. 모든 브라우저 공급업체는 이 웹 표준을 구현하기로 약속했으며 많은 [기본 요소](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned)가 이미 브라우저에 탑재되었습니다.

## WebDriver 프로토콜

> [WebDriver](https://w3c.github.io/webdriver/)는 사용자 에이전트의 검사와 제어를 가능하게 하는 원격 제어 인터페이스입니다. 프로세스 외부 프로그램이 웹 브라우저의 동작을 원격으로 지시할 수 있는 방법으로 플랫폼 및 언어 중립적인 유선 프로토콜을 제공합니다.

WebDriver 프로토콜은 사용자 관점에서 브라우저를 자동화하도록 설계되었으며, 사용자가 할 수 있는 모든 것을 브라우저로 수행할 수 있습니다. 애플리케이션과의 일반적인 상호 작용(예: 탐색, 클릭 또는 요소 상태 읽기)을 추상화하는 명령 세트를 제공합니다. 웹 표준이기 때문에 모든 주요 브라우저 공급업체에서 잘 지원되며 [Appium](http://appium.io)을 사용한 모바일 자동화의 기본 프로토콜로도 사용됩니다.

이 자동화 프로토콜을 사용하려면 모든 명령을 번역하고 대상 환경(즉, 브라우저 또는 모바일 앱)에서 실행하는 프록시 서버가 필요합니다.

브라우저 자동화의 경우 프록시 서버는 일반적으로 브라우저 드라이버입니다. 모든 브라우저에 사용 가능한 드라이버가 있습니다:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

모바일 자동화의 경우 [Appium](http://appium.io)을 설치하고 설정해야 합니다. 이를 통해 동일한 WebdriverIO 설정을 사용하여 모바일(iOS/Android) 또는 데스크톱(macOS/Windows) 애플리케이션을 자동화할 수 있습니다.

또한 자동화 테스트를 클라우드에서 대규모로 실행할 수 있는 많은 서비스가 있습니다. 이러한 모든 드라이버를 로컬에 설정하는 대신, 클라우드에서 이러한 서비스(예: [Sauce Labs](https://saucelabs.com))와 통신하고 해당 플랫폼에서 결과를 검사할 수 있습니다. 테스트 스크립트와 자동화 환경 간의 통신은 다음과 같이 이루어집니다:

![WebDriver Setup](/img/webdriver.png)