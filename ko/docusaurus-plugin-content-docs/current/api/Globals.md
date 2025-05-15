---
id: globals
title: 글로벌
---

테스트 파일에서 WebdriverIO는 이러한 메서드와 객체를 각각 전역 환경에 배치합니다. 이를 사용하기 위해 아무것도 가져올 필요가 없습니다. 그러나 명시적 가져오기를 선호한다면, `import { browser, $, $$, expect } from '@wdio/globals'`를 수행하고 WDIO 구성에서 `injectGlobals: false`를 설정할 수 있습니다.

다음과 같은 글로벌 객체는 달리 구성되지 않은 경우 설정됩니다:

- `browser`: WebdriverIO [Browser 객체](https://webdriver.io/docs/api/browser)
- `driver`: `browser`의 별칭 (모바일 테스트를 실행할 때 사용)
- `multiremotebrowser`: `browser` 또는 `driver`의 별칭이지만 [Multiremote](/docs/multiremote) 세션에서만 설정됨
- `$`: 요소를 가져오는 명령 ([API 문서](/docs/api/browser/$)에서 자세히 보기)
- `$$`: 요소들을 가져오는 명령 ([API 문서](/docs/api/browser/$$)에서 자세히 보기)
- `expect`: WebdriverIO용 단언 프레임워크 ([API 문서](/docs/api/expect-webdriverio) 참조)

__참고:__ WebdriverIO는 환경을 부트스트랩할 때 사용되는 프레임워크(예: Mocha 또는 Jasmine)가 전역 변수를 설정하는 것을 제어할 수 없습니다.