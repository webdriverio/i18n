---
id: gettingstarted
title: 시작하기
---

WebdriverIO 문서에 오신 것을 환영합니다. 이 문서는 빠르게 시작하는 데 도움이 될 것입니다. 문제가 발생하면 [Discord 지원 서버](https://discord.webdriver.io)에서 도움과 답변을 찾을 수 있으며, [𝕏](https://x.com/webdriverio)에서도 연락할 수 있습니다.

:::info
이 문서는 최신 버전(__>=9.x__)의 WebdriverIO에 대한 것입니다. 아직 이전 버전을 사용하고 계시다면, [이전 문서 웹사이트](/versions)를 방문해 주세요!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip 공식 유튜브 채널 🎥

[공식 유튜브 채널](https://youtube.com/@webdriverio)에서 WebdriverIO에 관한 더 많은 동영상을 찾을 수 있습니다. 구독하는 것을 잊지 마세요!

:::

## WebdriverIO 설정 시작하기

[WebdriverIO 스타터 툴킷](https://www.npmjs.com/package/create-wdio)을 사용하여 기존 또는 새 프로젝트에 전체 WebdriverIO 설정을 추가하려면 다음을 실행하세요:

기존 프로젝트의 루트 디렉터리에 있는 경우 다음을 실행하세요:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

또는 새 프로젝트를 생성하려면:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

또는 새 프로젝트를 생성하려면:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

또는 새 프로젝트를 생성하려면:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

또는 새 프로젝트를 생성하려면:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

이 명령은 WebdriverIO CLI 도구를 다운로드하고 테스트 스위트를 구성하는 데 도움이 되는 구성 마법사를 실행합니다.

<CreateProjectAnimation />

마법사는 설정 과정을 안내하는 일련의 질문들을 제시할 것입니다. `--yes` 매개변수를 전달하여 [페이지 객체](https://martinfowler.com/bliki/PageObject.html) 패턴을 사용하여 Chrome으로 Mocha를 사용하는 기본 설정을 선택할 수 있습니다.

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

## CLI 수동 설치하기

CLI 패키지를 프로젝트에 수동으로 추가할 수도 있습니다:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # prints e.g. `8.13.10`

# run configuration wizard
npx wdio config
```

## 테스트 실행하기

방금 생성한 WebdriverIO 구성을 가리키는 `run` 명령을 사용하여 테스트 스위트를 시작할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js
```

특정 테스트 파일을 실행하려면 `--spec` 매개변수를 추가할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

또는 구성 파일에서 스위트를 정의하고 스위트에 정의된 테스트 파일만 실행할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## 스크립트에서 실행하기

Node.JS 스크립트 내에서 [독립 실행 모드](/docs/setuptypes#standalone-mode)로 자동화 엔진으로 WebdriverIO를 사용하려면, WebdriverIO를 직접 설치하여 패키지로 사용할 수도 있습니다. 예를 들어 웹사이트의 스크린샷을 생성하는 경우:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__참고:__ 모든 WebdriverIO 명령은 비동기식이며 [`async/await`](https://javascript.info/async-await)을 사용하여 적절히 처리해야 합니다.

## 테스트 기록하기

WebdriverIO는 화면에서 테스트 작업을 기록하고 WebdriverIO 테스트 스크립트를 자동으로 생성하는 데 도움이 되는 도구를 제공합니다. 자세한 내용은 [Chrome DevTools 레코더로 테스트 기록하기](/docs/record)를 참조하세요.

## 시스템 요구 사항

[Node.js](http://nodejs.org)가 설치되어 있어야 합니다.

- 최소 v18.20.0 이상을 설치하세요(가장 오래된 활성 LTS 버전)
- LTS 릴리스이거나 앞으로 LTS 릴리스가 될 버전만 공식적으로 지원됩니다

Node가 현재 시스템에 설치되어 있지 않다면, [NVM](https://github.com/creationix/nvm)이나 [Volta](https://volta.sh/)와 같은 도구를 사용하여 여러 활성 Node.js 버전을 관리하는 것이 좋습니다. NVM은 인기 있는 선택이며, Volta도 좋은 대안입니다.