---
id: browserstack
title: BrowserStack 접근성 테스팅
---

# BrowserStack 접근성 테스팅

WebdriverIO 테스트 스위트에서 [BrowserStack 접근성 테스팅의 자동화된 테스트 기능](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)을 사용하여 접근성 테스트를 쉽게 통합할 수 있습니다.

## BrowserStack 접근성 테스팅에서 자동화된 테스트의 장점

BrowserStack 접근성 테스팅에서 자동화된 테스트를 사용하려면 테스트가 BrowserStack Automate에서 실행되어야 합니다.

자동화된 테스트의 장점은 다음과 같습니다:

* 기존 자동화 테스트 스위트에 원활하게 통합됩니다.
* 테스트 케이스에 코드 변경이 필요하지 않습니다.
* 접근성 테스팅을 위한 추가 유지 관리가 전혀 필요하지 않습니다.
* 과거 추세를 이해하고 테스트 케이스에 대한 인사이트를 얻을 수 있습니다.

## BrowserStack 접근성 테스팅 시작하기

WebdriverIO 테스트 스위트를 BrowserStack의 접근성 테스팅과 통합하려면 다음 단계를 따르세요:

1. `@wdio/browserstack-service` npm 패키지를 설치합니다.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. `wdio.conf.js` 설정 파일을 업데이트합니다.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Optional configuration options
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

자세한 안내는 [여기](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)에서 확인할 수 있습니다.