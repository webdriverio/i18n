---
id: lambdatest
title: LambdaTest 접근성 테스트
---

# LambdaTest 접근성 테스트

[LambdaTest 접근성 테스트](https://www.lambdatest.com/support/docs/accessibility-automation-settings/)를 사용하여 WebdriverIO 테스트 스위트에 접근성 테스트를 쉽게 통합할 수 있습니다.

## LambdaTest 접근성 테스트의 장점

LambdaTest 접근성 테스트는 웹 애플리케이션의 접근성 문제를 식별하고 수정하는 데 도움을 줍니다. 주요 장점은 다음과 같습니다:

* 기존 WebdriverIO 테스트 자동화와 원활하게 통합됩니다.
* 테스트 실행 중 자동화된 접근성 스캔.
* 포괄적인 WCAG 준수 보고서.
* 해결 지침이 포함된 상세한 문제 추적.
* 여러 WCAG 표준 지원(WCAG 2.0, WCAG 2.1, WCAG 2.2).
* LambdaTest 대시보드에서 실시간 접근성 인사이트.

## LambdaTest 접근성 테스트 시작하기

WebdriverIO 테스트 스위트를 LambdaTest의 접근성 테스트와 통합하려면 다음 단계를 따르세요:

1. LambdaTest WebdriverIO 서비스 패키지를 설치합니다.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. `wdio.conf.js` 구성 파일을 업데이트합니다.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',
    
    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],
    
    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. 평소와 같이 테스트를 실행하세요. LambdaTest는 테스트 실행 중 접근성 문제를 자동으로 스캔합니다.

```bash
npx wdio run wdio.conf.js
```

## 구성 옵션

`accessibilityOptions` 객체는 다음 매개변수를 지원합니다:

* **wcagVersion**: 테스트할 WCAG 표준 버전 지정
  - `wcag20` - WCAG 2.0 레벨 A
  - `wcag21a` - WCAG 2.1 레벨 A
  - `wcag21aa` - WCAG 2.1 레벨 AA (기본값)
  - `wcag22aa` - WCAG 2.2 레벨 AA

* **bestPractice**: 모범 사례 권장 사항 포함(기본값: `false`)

* **needsReview**: 수동 검토가 필요한 문제 포함(기본값: `true`)

## 접근성 보고서 보기

테스트가 완료된 후 [LambdaTest 대시보드](https://automation.lambdatest.com/)에서 상세한 접근성 보고서를 볼 수 있습니다:

1. 테스트 실행으로 이동
2. "접근성" 탭을 클릭
3. 심각도 수준이 있는 식별된 문제 검토
4. 각 문제에 대한 해결 지침 확인

자세한 정보는 [LambdaTest 접근성 자동화 문서](https://www.lambdatest.com/support/docs/accessibility-automation-settings/)를 참조하세요.