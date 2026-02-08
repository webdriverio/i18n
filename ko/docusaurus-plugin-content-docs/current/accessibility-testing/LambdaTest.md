---
id: testmuai
title: TestMu AI (이전 LambdaTest) 접근성 테스팅
---

# TestMu AI Accessibility Testing

WebdriverIO 테스트 스위트에서 [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/)을 사용하여 접근성 테스트를 쉽게 통합할 수 있습니다.

## TestMu AI Accessibility Testing의 장점

TestMu AI Accessibility Testing은 웹 애플리케이션의 접근성 문제를 식별하고 수정하는 데 도움을 줍니다. 주요 장점은 다음과 같습니다:

* 기존 WebdriverIO 테스트 자동화와 원활하게 통합됩니다.
* 테스트 실행 중 자동 접근성 스캐닝을 제공합니다.
* 포괄적인 WCAG 준수 보고서를 제공합니다.
* 문제 해결 지침이 포함된 상세한 이슈 추적을 제공합니다.
* 여러 WCAG 표준(WCAG 2.0, WCAG 2.1, WCAG 2.2)을 지원합니다.
* TestMu AI 대시보드에서 실시간 접근성 인사이트를 제공합니다.

## TestMu AI Accessibility Testing 시작하기

WebdriverIO 테스트 스위트를 TestMu AI의 Accessibility Testing과 통합하려면 다음 단계를 따르세요:

1. TestMu AI WebdriverIO 서비스 패키지를 설치합니다.

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

3. 평소와 같이 테스트를 실행합니다. TestMu AI는 테스트 실행 중 자동으로 접근성 문제를 스캔합니다.

```bash
npx wdio run wdio.conf.js
```

## 구성 옵션

`accessibilityOptions` 객체는 다음 매개변수를 지원합니다:

* **wcagVersion**: 테스트할 WCAG 표준 버전을 지정합니다
  - `wcag20` - WCAG 2.0 Level A
  - `wcag21a` - WCAG 2.1 Level A
  - `wcag21aa` - WCAG 2.1 Level AA (기본값)
  - `wcag22aa` - WCAG 2.2 Level AA

* **bestPractice**: 모범 사례 권장 사항 포함 (기본값: `false`)

* **needsReview**: 수동 검토가 필요한 이슈 포함 (기본값: `true`)

## 접근성 보고서 보기

테스트가 완료된 후 [TestMu AI Dashboard](https://automation.lambdatest.com/)에서 상세한 접근성 보고서를 볼 수 있습니다:

1. 테스트 실행으로 이동합니다
2. "Accessibility" 탭을 클릭합니다
3. 심각도 수준이 표시된 식별된 이슈를 검토합니다
4. 각 이슈에 대한 해결 지침을 확인합니다

더 자세한 정보는 [TestMu AI Accessibility Automation 문서](https://www.testmuai.com/support/docs/accessibility-automation-settings/)를 참조하세요.