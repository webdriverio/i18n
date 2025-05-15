---
id: v6-migration
title: v5에서 v6로
---

이 튜토리얼은 WebdriverIO의 `v5`를 아직 사용하고 있으며 `v6` 또는 최신 버전의 WebdriverIO로 마이그레이션하고자 하는 사람들을 위한 것입니다. [릴리스 블로그 포스트](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released)에서 언급했듯이 이 버전 업그레이드의 변경 사항은 다음과 같이 요약될 수 있습니다:

- 일부 명령어(예: `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`)의 매개변수를 통합하고 모든 선택적 매개변수를 하나의 객체로 이동했습니다. 예:

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- 서비스 구성이 서비스 목록으로 이동되었습니다. 예:

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- 일부 서비스 옵션은 단순화를 위해 이름이 변경되었습니다
- Chrome WebDriver 세션을 위해 `launchApp` 명령어를 `launchChromeApp`으로 이름을 변경했습니다

:::info

WebdriverIO `v4` 이하 버전을 사용하고 있다면, 먼저 `v5`로 업그레이드 하세요.

:::

완전히 자동화된 프로세스를 갖추고 싶지만 현실은 다릅니다. 모든 사람은 다른 설정을 가지고 있습니다. 각 단계는 단계별 지침보다는 안내로 여겨져야 합니다. 마이그레이션에 문제가 있으시면 주저하지 말고 [저희에게 연락](https://github.com/webdriverio/codemod/discussions/new)하세요.

## 설정

다른 마이그레이션과 유사하게 WebdriverIO [codemod](https://github.com/webdriverio/codemod)를 사용할 수 있습니다. codemod를 설치하려면 다음 명령을 실행하세요:

```sh
npm install jscodeshift @wdio/codemod
```

## WebdriverIO 의존성 업그레이드

모든 WebdriverIO 버전은 서로 밀접하게 연결되어 있으므로 항상 특정 태그(예: `6.12.0`)로 업그레이드하는 것이 가장 좋습니다. `v5`에서 `v7`로 직접 업그레이드하기로 결정한 경우 태그를 생략하고 모든 패키지의 최신 버전을 설치할 수 있습니다. 이를 위해 `package.json`에서 WebdriverIO 관련 의존성을 모두 복사하고 다음과 같이 재설치합니다:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

일반적으로 WebdriverIO 의존성은 개발 의존성의 일부이지만, 프로젝트에 따라 달라질 수 있습니다. 이 작업 후에는 `package.json` 및 `package-lock.json`이 업데이트되어야 합니다. __참고:__ 이는 예시 의존성이며, 실제 의존성은 다를 수 있습니다. 다음과 같이 호출하여 최신 v6 버전을 찾도록 하세요:

```sh
npm show webdriverio versions
```

모든 핵심 WebdriverIO 패키지에서 사용 가능한 최신 버전 6을 설치하세요. 커뮤니티 패키지의 경우 패키지마다 다를 수 있습니다. 여기서는 v6와 호환되는 버전에 대한 정보를 위해 변경 로그를 확인하는 것이 좋습니다.

## 구성 파일 변환

좋은 첫 번째 단계는 구성 파일부터 시작하는 것입니다. 모든 주요 변경 사항은 codemod를 사용하여 완전히 자동으로 해결할 수 있습니다:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

codemod는 아직 TypeScript 프로젝트를 지원하지 않습니다. [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)을 참조하세요. 곧 지원을 구현하기 위해 노력하고 있습니다. TypeScript를 사용하고 있다면 참여해 주세요!

:::

## 스펙 파일 및 페이지 객체 업데이트

모든 명령어 변경 사항을 업데이트하려면 WebdriverIO 명령어가 포함된 모든 e2e 파일에서 codemod를 실행하세요:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

이게 전부입니다! 더 이상의 변경이 필요하지 않습니다 🎉

## 결론

이 튜토리얼이 WebdriverIO `v6`로의 마이그레이션 과정에 도움이 되길 바랍니다. `v7`로의 업데이트는 거의 주요 변경 사항이 없어 사소한 작업이므로 최신 버전으로 계속 업그레이드하는 것을 강력히 권장합니다. [v7로 업그레이드](v7-migration)하기 위한 마이그레이션 가이드를 확인하세요.

커뮤니티는 다양한 조직의 다양한 팀과 함께 테스트하면서 codemod를 계속 개선하고 있습니다. 피드백이 있으시면 [이슈를 제기](https://github.com/webdriverio/codemod/issues/new)하거나 마이그레이션 과정에서 어려움이 있으시면 [토론을 시작](https://github.com/webdriverio/codemod/discussions/new)하는 것을 주저하지 마세요.