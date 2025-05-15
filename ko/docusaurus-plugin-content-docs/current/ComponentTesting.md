---
id: component-testing
title: 컴포넌트 테스팅
---

WebdriverIO의 [브라우저 러너](/docs/runner#browser-runner)를 사용하면 실제 데스크톱이나 모바일 브라우저에서 테스트를 실행하면서 WebdriverIO와 WebDriver 프로토콜을 사용하여 페이지에 렌더링된 내용을 자동화하고 상호작용할 수 있습니다. 이 접근 방식은 [JSDOM](https://www.npmjs.com/package/jsdom)에서만 테스트를 허용하는 다른 테스트 프레임워크와 비교했을 때 [많은 장점](/docs/runner#browser-runner)이 있습니다.

## 어떻게 작동하나요?

브라우저 러너는 [Vite](https://vitejs.dev/)를 사용하여 테스트 페이지를 렌더링하고 브라우저에서, 테스트를 실행하기 위한 테스트 프레임워크를 초기화합니다. 현재는 Mocha만 지원하지만 Jasmine과 Cucumber는 [로드맵](https://github.com/orgs/webdriverio/projects/1)에 있습니다. 이를 통해 Vite를 사용하지 않는 프로젝트에서도 모든 종류의 컴포넌트를 테스트할 수 있습니다.

Vite 서버는 WebdriverIO 테스트러너에 의해 시작되며, 일반 e2e 테스트에 사용했던 모든 리포터와 서비스를 사용할 수 있도록 구성됩니다. 또한 페이지의 모든 요소와 상호작용할 수 있는 [WebdriverIO API](/docs/api)의 하위 집합에 접근할 수 있는 [`browser`](/docs/api/browser) 인스턴스를 초기화합니다. e2e 테스트와 유사하게 글로벌 스코프에 연결된 `browser` 변수를 통해 또는 [`injectGlobals`](/docs/api/globals) 설정 방식에 따라 `@wdio/globals`에서 가져와서 해당 인스턴스에 접근할 수 있습니다.

WebdriverIO는 다음 프레임워크에 대한 기본 지원을 제공합니다:

- [__Nuxt__](https://nuxt.com/): WebdriverIO의 테스트러너는 Nuxt 애플리케이션을 감지하고 자동으로 프로젝트 컴포저블을 설정하고 Nuxt 백엔드를 모킹하는 데 도움을 줍니다. 자세한 내용은 [Nuxt 문서](/docs/component-testing/vue#testing-vue-components-in-nuxt)를 참조하세요.
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIO의 테스트러너는 TailwindCSS를 사용하고 있는지 감지하고 테스트 페이지에 환경을 적절히 로드합니다.

## 설정

브라우저에서 단위 또는 컴포넌트 테스트를 위해 WebdriverIO를 설정하려면 다음과 같이 새 WebdriverIO 프로젝트를 초기화하세요:

```bash
npm init wdio@latest ./
# 또는
yarn create wdio ./
```

구성 마법사가 시작되면, 단위 및 컴포넌트 테스트를 실행하기 위해 `browser`를 선택하고 원하는 경우 사전 설정 중 하나를 선택하거나, 기본 단위 테스트만 실행하려면 _"Other"_를 선택하세요. 프로젝트에서 이미 Vite를 사용하고 있다면 사용자 정의 Vite 구성을 설정할 수도 있습니다. 자세한 정보는 모든 [러너 옵션](/docs/runner#runner-options)을 확인하세요.

:::info

__참고:__ WebdriverIO는 기본적으로 CI 환경에서 헤드리스 모드로 브라우저 테스트를 실행합니다(예: `CI` 환경 변수가 `'1'` 또는 `'true'`로 설정된 경우). 러너의 [`headless`](/docs/runner#headless) 옵션을 사용하여 이 동작을 수동으로 구성할 수 있습니다.

:::

이 과정이 끝나면 다양한 WebdriverIO 구성이 포함된 `wdio.conf.js` 파일을 찾을 수 있으며, 여기에는 `runner` 속성이 포함됩니다. 예:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

서로 다른 [capabilities](/docs/configuration#capabilities)를 정의하여 다양한 브라우저에서 테스트를 실행할 수 있으며, 원하는 경우 병렬로 실행할 수 있습니다.

모든 것이 어떻게 작동하는지 아직 확실하지 않다면, WebdriverIO에서 컴포넌트 테스팅을 시작하는 방법에 대한 다음 튜토리얼을 시청하세요:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## 테스트 하네스

테스트에서 무엇을 실행하고 어떻게 컴포넌트를 렌더링할지는 전적으로 사용자의 선택입니다. 그러나 React, Preact, Svelte 및 Vue와 같은 다양한 컴포넌트 프레임워크용 플러그인을 제공하는 [Testing Library](https://testing-library.com/)를 유틸리티 프레임워크로 사용하는 것을 권장합니다. 이는 테스트 페이지에 컴포넌트를 렌더링하는 데 매우 유용하며 각 테스트 후 자동으로 이러한 컴포넌트를 정리합니다.

원하는 대로 Testing Library 기본 요소와 WebdriverIO 명령을 혼합하여 사용할 수 있습니다. 예:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__참고:__ Testing Library의 렌더 메서드를 사용하면 테스트 간에 생성된 컴포넌트를 제거하는 데 도움이 됩니다. Testing Library를 사용하지 않는 경우 테스트 사이에 정리되는 컨테이너에 테스트 컴포넌트를 연결했는지 확인하세요.

## 설정 스크립트

Node.js 또는 브라우저에서 임의의 스크립트를 실행하여 테스트를 설정할 수 있습니다. 예를 들어, 스타일 주입, 브라우저 API 모킹 또는 제3자 서비스에 연결하는 등의 작업이 가능합니다. WebdriverIO [훅](/docs/configuration#hooks)은 Node.js에서 코드를 실행하는 데 사용할 수 있고, [`mochaOpts.require`](/docs/frameworks#require)는 테스트가 로드되기 전에 브라우저로 스크립트를 가져올 수 있게 해줍니다. 예:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // 브라우저에서 실행할 설정 스크립트 제공
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // Node.js에서 테스트 환경 설정
    }
    // ...
}
```

예를 들어, 다음 설정 스크립트로 테스트에서 모든 [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 호출을 모킹하고 싶다면:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// 모든 테스트가 로드되기 전에 코드 실행
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // 테스트 파일이 로드된 후 코드 실행
}

export const mochaGlobalTeardown = () => {
    // 스펙 파일이 실행된 후 코드 실행
}

```

이제 테스트에서 모든 브라우저 요청에 대한 사용자 정의 응답 값을 제공할 수 있습니다. 글로벌 픽스처에 대한 자세한 내용은 [Mocha 문서](https://mochajs.org/#global-fixtures)를 참조하세요.

## 테스트 및 애플리케이션 파일 감시

브라우저 테스트를 디버깅하는 방법은 여러 가지가 있습니다. 가장 쉬운 방법은 `--watch` 플래그를 사용하여 WebdriverIO 테스트러너를 시작하는 것입니다. 예:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

이렇게 하면 처음에 모든 테스트가 실행되고 모두 실행된 후 중지됩니다. 그런 다음 개별 파일을 변경하면 해당 파일만 다시 실행됩니다. [`filesToWatch`](/docs/configuration#filestowatch)를 애플리케이션 파일을 가리키도록 설정하면 앱이 변경될 때 모든 테스트가 다시 실행됩니다.

## 디버깅

아직 IDE에서 중단점을 설정하고 원격 브라우저에서 이를 인식하도록 하는 것은 불가능하지만, [`debug`](/docs/api/browser/debug) 명령을 사용하여 언제든지 테스트를 중지할 수 있습니다. 이를 통해 DevTools를 열고 [소스 탭](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools)에서 중단점을 설정하여 테스트를 디버깅할 수 있습니다.

`debug` 명령이 호출되면 터미널에서 Node.js repl 인터페이스도 표시됩니다:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

테스트를 계속하려면 `Ctrl` 또는 `Command` + `c`를 누르거나 `.exit`를 입력하세요.

## Selenium Grid를 사용하여 실행

[Selenium Grid](https://www.selenium.dev/documentation/grid/)를 설정하고 해당 그리드를 통해 브라우저를 실행하는 경우, 테스트 파일이 제공되는 올바른 호스트에 브라우저가 접근할 수 있도록 `host` 브라우저 러너 옵션을 설정해야 합니다. 예:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // WebdriverIO 프로세스를 실행하는 머신의 네트워크 IP
        host: 'http://172.168.0.2'
    }]
}
```

이렇게 하면 브라우저가 WebdriverIO 테스트를 실행하는 인스턴스에서 호스팅되는 올바른 서버 인스턴스를 확실히 열 수 있습니다.

## 예제

[예제 저장소](https://github.com/webdriverio/component-testing-examples)에서 인기 있는 컴포넌트 프레임워크를 사용하여 컴포넌트를 테스트하는 다양한 예제를 찾을 수 있습니다.