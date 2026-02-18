---
id: multi-framework-support
title: 다중 프레임워크 지원
---

DevTools는 Mocha, Jasmine 및 Cucumber와 같은 프레임워크에서 특별한 구성 없이 자동으로 작동합니다. WebDriverIO 설정에 이 서비스를 추가하기만 하면 어떤 테스트 프레임워크를 사용하든 모든 기능이 원활하게 작동합니다.

**지원되는 프레임워크:**
- **Mocha** - grep 필터링을 통한 테스트 및 스위트 수준 실행
- **Jasmine** - grep 기반 필터링을 통한 완전한 통합
- **Cucumber** - feature:line 타겟팅을 통한 시나리오 및 예제 수준 실행

동일한 디버깅 인터페이스, 테스트 재실행 및 시각화 기능이 모든 프레임워크에서 일관되게 작동합니다.

## Configuration

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // or 'jasmine' or 'cucumber'
    services: ['devtools'],
    // ...
};
```