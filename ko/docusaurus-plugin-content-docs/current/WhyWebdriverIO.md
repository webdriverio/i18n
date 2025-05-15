---
id: why-webdriverio
title: 왜 Webdriver.IO인가?
---

WebdriverIO는 현대적인 웹 및 모바일 애플리케이션을 자동화하기 위해 구축된 진보적인 자동화 프레임워크입니다. 애플리케이션과의 상호 작용을 간소화하고 확장 가능하고 견고하며 안정적인 테스트 스위트를 만드는 데 도움이 되는 플러그인 세트를 제공합니다.

다음과 같은 설계가 되어 있습니다:

- __확장 가능__ - 헬퍼 함수 추가나 기존 명령의 더 복잡한 세트와 조합은 __간단하고__ __매우 유용합니다__
- __호환성__ - WebdriverIO는 __진정한 크로스 브라우저 테스팅__을 위한 [WebDriver 프로토콜](https://w3c.github.io/webdriver/)과 [Puppeteer](https://pptr.dev/)를 사용한 Chromium 기반 자동화를 위한 [Chrome DevTools 프로토콜](https://chromedevtools.github.io/devtools-protocol/)에서 실행할 수 있습니다.
- __기능이 풍부함__ - 내장된 다양한 플러그인과 커뮤니티 플러그인을 통해 요구 사항을 충족하도록 설정을 __쉽게 통합하고__ __확장__할 수 있습니다.

WebdriverIO를 사용하여 다음을 자동화할 수 있습니다:

- 🌐 <span>&nbsp;</span> React, Vue, Angular, Svelte 또는 기타 프론트엔드 프레임워크로 작성된 __현대적인 웹 애플리케이션__
- 📱 <span>&nbsp;</span> 에뮬레이터/시뮬레이터 또는 실제 기기에서 실행되는 __하이브리드__ 또는 __네이티브 모바일 애플리케이션__
- 💻 <span>&nbsp;</span> __네이티브 데스크톱 애플리케이션__ (예: Electron.js로 작성된)
- 📦 <span>&nbsp;</span> 브라우저에서 웹 컴포넌트의 __유닛 또는 컴포넌트 테스팅__

## 웹 표준 기반

WebdriverIO는 모든 브라우저 공급업체에서 개발하고 지원하는 [WebDriver](https://w3c.github.io/webdriver/) 및 [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) 프로토콜의 기능을 활용하여 진정한 크로스 브라우저 테스팅 경험을 보장합니다. 다른 자동화 도구들이 실제 사용자가 사용하지 않는 수정된 브라우저 엔진을 다운로드하거나 JavaScript를 주입하여 사용자 행동을 에뮬레이션해야 하는 반면, WebdriverIO는 [적절하게 테스트된](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) 자동화를 위한 공통 표준에 의존하여 앞으로 수십 년 동안 호환성을 보장합니다.

또한 WebdriverIO는 디버깅 및 내부 검사 목적으로 [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/)와 같은 대체 독점 자동화 프로토콜도 지원합니다. 이를 통해 사용자는 WebDriver 기반의 일반적인 명령과 [Puppeteer](https://pptr.dev/)를 통한 강력한 브라우저 상호 작용 사이를 원활하게 전환할 수 있습니다.

이러한 자동화 표준의 차이점에 대해 [자동화 프로토콜](automationProtocols) 섹션에서 자세히 알아보세요.

## 진정한 오픈 소스

생태계의 많은 자동화 도구와 비교하면, WebdriverIO는 [OpenJS Foundation](https://openjsf.org/)이라는 비영리 단체가 소유하고 공개 거버넌스로 운영되는 진정한 오픈 소스 프로젝트입니다. 이는 프로젝트가 모든 참여자의 이익을 위해 성장하고 방향을 잡도록 법적으로 구속합니다. 프로젝트 팀은 개방성과 협업을 중요시하며 금전적 이익에 의해 추진되지 않습니다.

이로 인해 프로젝트는 개발 방식과 나아가야 할 방향에 있어 독립적입니다. 지속 가능한 커뮤니티를 구축하여 서로 지원하고 배우면서 [커뮤니티 채널](https://discord.webdriver.io)에서 무료로 24/7 지원을 제공할 수 있습니다. 마지막으로, [공개 거버넌스](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md) 덕분에 프로젝트에 기여하고 참여하는 사람들에게 많은 기회를 제공합니다.