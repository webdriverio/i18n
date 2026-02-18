---
id: console-logs
title: 콘솔 로그
---

테스트 실행 중 모든 브라우저 콘솔 출력을 캡처하고 검사합니다. DevTools는 애플리케이션의 콘솔 메시지(`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`)와 `wdio.conf.ts`에서 구성한 `logLevel`에 따른 WebDriverIO 프레임워크 로그를 기록합니다.

**기능:**
- 테스트 실행 중 실시간 콘솔 메시지 캡처
- 브라우저 콘솔 로그(log, warn, error, info, debug)
- 구성된 `logLevel`(trace, debug, info, warn, error, silent)에 따라 필터링된 WebDriverIO 프레임워크 로그
- 각 메시지가 기록된 정확한 시간을 보여주는 타임스탬프
- 테스트 단계와 브라우저 스크린샷과 함께 표시되는 콘솔 로그로 맥락 제공

**구성:**
```js
// wdio.conf.ts
export const config = {
    // 로깅 상세 수준: trace | debug | info | warn | error | silent
    logLevel: 'info', // 캡처되는 프레임워크 로그를 제어합니다
    // ...
};
```

이를 통해 JavaScript 오류를 디버깅하고, 애플리케이션 동작을 추적하며, 테스트 실행 중 WebDriverIO의 내부 작업을 확인하기 쉬워집니다.

## 데모

### >_ 콘솔 로그
![Console Logs](./demo/console-logs.gif)