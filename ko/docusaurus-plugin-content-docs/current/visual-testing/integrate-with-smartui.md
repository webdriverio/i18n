---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI (구 LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/)는 WebdriverIO 테스트를 위한 AI 기반 시각적 회귀 테스트를 제공합니다. 스크린샷을 캡처하고, 기준선과 비교하며, 지능형 비교 알고리즘으로 시각적 차이를 강조합니다.

## 설정

**SmartUI 프로젝트 생성**

TestMu AI (구 LambdaTest)에 [로그인](https://accounts.lambdatest.com/register)하고 [SmartUI Projects](https://smartui.lambdatest.com/)로 이동하여 새 프로젝트를 생성합니다. 플랫폼으로 **Web**을 선택하고 프로젝트 이름, 승인자 및 태그를 구성합니다.

**자격 증명 설정**

TestMu AI (구 LambdaTest) 대시보드에서 `LT_USERNAME`과 `LT_ACCESS_KEY`를 가져와 환경 변수로 설정합니다:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**SmartUI SDK 설치**

```sh
npm install @lambdatest/wdio-driver
```

**WebdriverIO 구성**

`wdio.conf.js`를 업데이트합니다:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## 사용법

`browser.execute('smartui.takeScreenshot')`를 사용하여 스크린샷을 캡처합니다:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**테스트 실행**

```sh
npx wdio wdio.conf.js
```

[SmartUI 대시보드](https://smartui.lambdatest.com/)에서 결과를 확인하세요.

## 고급 옵션

**요소 무시하기**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**특정 영역 선택하기**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## 리소스

| 리소스                                                                                          | 설명                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [공식 문서](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | SmartUI 문서                    |
| [SmartUI 대시보드](https://smartui.lambdatest.com/)                                              | SmartUI 프로젝트 및 빌드 접근  |
| [고급 설정](https://www.testmuai.com/support/docs/test-settings-options/)              | 비교 민감도 구성         |
| [빌드 옵션](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | 고급 빌드 구성             |