---
id: globals
title: 전역변수
---

테스트 파일에서, WebdriverIO는 이러한 메서드와 객체를 전역 환경에 넣습니다. 이를 사용하기 위해 별도로 임포트할 필요가 없습니다. 그러나 명시적 임포트를 선호한다면, `import { browser, $, $$, expect } from '@wdio/globals'`를 사용하고 WDIO 구성에서 `injectGlobals: false`를 설정할 수 있습니다.

다음 전역 객체들은 별도로 구성하지 않는 한 설정됩니다:

- `browser`: WebdriverIO [Browser 객체](https://webdriver.io/docs/api/browser)
- `driver`: `browser`의 별칭 (모바일 테스트를 실행할 때 사용됨)
- `multiRemoteBrowser`: `browser` 또는 `driver`의 별칭이지만 [Multiremote](/docs/multiremote) 세션에만 설정됨
- `$`: 요소를 가져오는 명령 ([API 문서](/docs/api/browser/$)에서 더 많은 정보 확인)
- `$$`: 요소들을 가져오는 명령 ([API 문서](/docs/api/browser/$$)에서 더 많은 정보 확인)
- `expect`: WebdriverIO용 어설션 프레임워크 ([API 문서](/docs/api/expect-webdriverio) 참조)

__참고:__ WebdriverIO는 환경을 부트스트래핑할 때 사용된 프레임워크(예: Mocha 또는 Jasmine)가 전역 변수를 설정하는 것을 제어할 수 없습니다.