---
id: v7-migration
title: v6에서 v7로
---

이 튜토리얼은 WebdriverIO의 `v6`를 사용하고 있으며 `v7`로 마이그레이션하고자 하는 사용자를 위한 것입니다. [릴리스 블로그 포스트](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released)에서 언급했듯이 변경 사항은 대부분 내부적인 것이며 업그레이드는 간단한 과정이어야 합니다.

:::info

WebdriverIO `v5` 이하 버전을 사용하고 계신다면, 먼저 `v6`로 업그레이드하세요. [v6 마이그레이션 가이드](v6-migration)를 확인해 주세요.

:::

자동화된 프로세스가 있으면 좋겠지만 현실은 다릅니다. 모든 사람이 각기 다른 설정을 가지고 있습니다. 각 단계는 단계별 지침이라기보다 가이드로 봐야 합니다. 마이그레이션에 문제가 있으면 주저하지 말고 [연락해주세요](https://github.com/webdriverio/codemod/discussions/new).

## 설정

다른 마이그레이션과 마찬가지로 WebdriverIO [codemod](https://github.com/webdriverio/codemod)를 사용할 수 있습니다. 이 튜토리얼에서는 커뮤니티 구성원이 제출한 [보일러플레이트 프로젝트](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)를 사용하여 `v6`에서 `v7`로 완전히 마이그레이션합니다.

codemod를 설치하려면 다음을 실행하세요:

```sh
npm install jscodeshift @wdio/codemod
```

#### 커밋:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## WebdriverIO 의존성 업그레이드

모든 WebdriverIO 버전이 서로 연결되어 있기 때문에 항상 특정 태그(예: `latest`)로 업그레이드하는 것이 좋습니다. 이렇게 하려면 `package.json`에서 WebdriverIO 관련 의존성을 복사하고 다음과 같이 다시 설치합니다:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

일반적으로 WebdriverIO 의존성은 개발 의존성의 일부이지만, 프로젝트에 따라 다를 수 있습니다. 이 후 `package.json`과 `package-lock.json`이 업데이트되어야 합니다. __참고:__ 이것은 [예제 프로젝트](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)에서 사용된 의존성이며, 당신의 프로젝트는 다를 수 있습니다.

#### 커밋:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## 설정 파일 변환

좋은 첫 단계는 설정 파일부터 시작하는 것입니다. WebdriverIO `v7`에서는 더 이상 컴파일러를 수동으로 등록할 필요가 없습니다. 사실 이들은 제거되어야 합니다. 이 작업은 codemod를 사용하여 완전히 자동으로 수행할 수 있습니다:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

codemod는 아직 TypeScript 프로젝트를 지원하지 않습니다. [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)을 참조하세요. 우리는 곧 지원을 구현하기 위해 노력하고 있습니다. TypeScript를 사용하고 있다면 참여해 주세요!

:::

#### 커밋:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## 스텝 정의 업데이트

Jasmine이나 Mocha를 사용하고 있다면, 여기서 끝납니다. 마지막 단계는 Cucumber.js 임포트를 `cucumber`에서 `@cucumber/cucumber`로 업데이트하는 것입니다. 이것도 codemod를 통해 자동으로 수행할 수 있습니다:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

이게 전부입니다! 더 이상의 변경이 필요하지 않습니다 🎉

#### 커밋:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## 결론

이 튜토리얼이 WebdriverIO `v7`로의 마이그레이션 과정에 도움이 되길 바랍니다. 커뮤니티는 다양한 팀과 조직에서 테스트하면서 codemod를 계속 개선하고 있습니다. 피드백이 있으시면 [이슈를 제기](https://github.com/webdriverio/codemod/issues/new)하거나 마이그레이션 과정에서 어려움을 겪으시면 [토론을 시작](https://github.com/webdriverio/codemod/discussions/new)하는 것을 주저하지 마세요.