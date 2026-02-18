---
id: devtools
title: 개발자 도구
---

DevTools 서비스는 WebdriverIO 테스트 실행을 위한 강력한 브라우저 기반 디버깅 인터페이스를 제공합니다. 이를 통해 인터랙티브한 웹 애플리케이션을 통해 실시간으로 테스트를 시각화하고, 디버깅하고, 제어할 수 있습니다.

## 개요

이 서비스를 통해 다음과 같은 작업을 수행할 수 있습니다:

- **선택적 테스트 재실행** - 모든 테스트 케이스나 스위트를 클릭하여 즉시 재실행
- **시각적 디버깅** - 자동 스크린샷이 포함된 실시간 브라우저 미리보기
- **실행 추적** - 타임스탬프와 결과가 포함된 상세한 명령 로그 보기
- **네트워크 및 콘솔 모니터링** - API 호출 및 JavaScript 로그 검사
- **코드 탐색** - 테스트 소스 파일로 직접 이동

## 설치

서비스를 개발 의존성으로 설치하세요:

```sh
npm install --save-dev @wdio/devtools-service
```

## 구성

WebDriverIO 구성에 서비스를 추가하세요:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### 서비스 옵션

다음 옵션으로 DevTools 서비스를 구성하세요:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // 개발자 도구 UI를 위한 포트 (기본값: 3000)
        }]
    ],
    // ...
};
```

#### 옵션

- **port** (숫자, 기본값: `3000`) - 개발자 도구 UI 서버의 포트 번호

## 작동 방식

DevTools 서비스가 활성화된 상태에서 WebdriverIO 테스트를 실행하면:

1. 서비스는 `http://localhost:3000`(구성 가능)에서 브라우저 창을 엽니다
2. DevTools UI가 실시간 업데이트를 표시하는 동안 테스트가 정상적으로 실행됩니다
3. UI는 테스트 계층, 브라우저 미리보기, 명령 타임라인 및 로그를 표시합니다
4. 테스트가 완료되면 테스트를 클릭하여 개별적으로 재실행할 수 있습니다
5. 테스트는 더 빠른 디버깅을 위해 동일한 브라우저 세션에서 재실행됩니다

## 기능

DevTools 기능을 자세히 살펴보세요:

- **[인터랙티브 테스트 재실행 및 시각화](devtools/interactive-test-rerunning)** - 테스트 재실행을 통한 실시간 브라우저 미리보기
- **[다중 프레임워크 지원](devtools/multi-framework-support)** - Mocha, Jasmine 및 Cucumber와 함께 작동
- **[콘솔 로그](devtools/console-logs)** - 브라우저 콘솔 출력 캡처 및 검사
- **[네트워크 로그](devtools/network-logs)** - API 호출 및 네트워크 활동 모니터링
- **[TestLens](devtools/testlens)** - 인텔리전트 코드 탐색으로 소스 코드로 이동