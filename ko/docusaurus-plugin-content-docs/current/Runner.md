---
id: runner
title: 러너
---

import CodeBlock from '@theme/CodeBlock';

WebdriverIO의 러너는 테스트러너를 사용할 때 테스트가 어떻게 그리고 어디서 실행되는지를 조율합니다. WebdriverIO는 현재 두 가지 유형의 러너를 지원합니다: 로컬 러너와 브라우저 러너입니다.

## 로컬 러너

[로컬 러너](https://www.npmjs.com/package/@wdio/local-runner)는 워커 프로세스 내에서 프레임워크(예: Mocha, Jasmine 또는 Cucumber)를 초기화하고 Node.js 환경 내에서 모든 테스트 파일을 실행합니다. 모든 테스트 파일은 능력(capability)당 별도의 워커 프로세스에서 실행되어 최대 동시성을 허용합니다. 모든 워커 프로세스는 단일 브라우저 인스턴스를 사용하므로 자체 브라우저 세션을 실행하여 최대 격리를 가능하게 합니다.

모든 테스트가 자체 격리된 프로세스에서 실행되기 때문에 테스트 파일 간에 데이터를 공유하는 것은 불가능합니다. 이를 해결하기 위한 두 가지 방법이 있습니다:

- [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service)를 사용하여 모든 워커 간에 데이터 공유
- 스펙 파일 그룹화([테스트 스위트 구성](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially)에서 자세히 읽기)

`wdio.conf.js`에 다른 설정이 정의되지 않은 경우 로컬 러너가 WebdriverIO의 기본 러너입니다.

### 설치

로컬 러너를 사용하려면 다음과 같이 설치할 수 있습니다:

```sh
npm install --save-dev @wdio/local-runner
```

### 설정

로컬 러너는 WebdriverIO의 기본 러너이므로 `wdio.conf.js` 내에서 정의할 필요가 없습니다. 명시적으로 설정하려면 다음과 같이 정의할 수 있습니다:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## 브라우저 러너

[로컬 러너](https://www.npmjs.com/package/@wdio/local-runner)와 달리 [브라우저 러너](https://www.npmjs.com/package/@wdio/browser-runner)는 브라우저 내에서 프레임워크를 초기화하고 실행합니다. 이를 통해 다른 많은 테스트 프레임워크처럼 JSDOM이 아닌 실제 브라우저에서 유닛 테스트나 컴포넌트 테스트를 실행할 수 있습니다.

[JSDOM](https://www.npmjs.com/package/jsdom)은 테스트 목적으로 널리 사용되지만, 결국 실제 브라우저가 아니며 모바일 환경도 에뮬레이션할 수 없습니다. 이 러너를 통해 WebdriverIO는 브라우저에서 쉽게 테스트를 실행하고 WebDriver 명령을 사용하여 페이지에 렌더링된 요소와 상호 작용할 수 있게 합니다.

다음은 JSDOM과 WebdriverIO 브라우저 러너에서 테스트를 실행하는 것에 대한 비교입니다.

| | JSDOM | WebdriverIO 브라우저 러너 |
|-|-------|----------------------------|
|1.| WHATWG DOM 및 HTML 표준을 재구현한 Node.js 내에서 테스트를 실행 | 실제 브라우저에서 테스트를 실행하고 사용자가 사용하는 환경에서 코드를 실행 |
|2.| 컴포넌트와의 상호작용은 JavaScript를 통해서만 모방 가능 | [WebdriverIO API](api)를 사용하여 WebDriver 프로토콜을 통해 요소와 상호작용 가능 |
|3.| Canvas 지원은 [추가 종속성](https://www.npmjs.com/package/canvas)이 필요하고 [제한](https://github.com/Automattic/node-canvas/issues)이 있음 | 실제 [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)에 접근 가능 |
|4.| JSDOM은 몇 가지 [주의사항](https://github.com/jsdom/jsdom#caveats)과 지원되지 않는 Web API가 있음 | 테스트가 실제 브라우저에서 실행되므로 모든 Web API 지원 |
|5.| 크로스 브라우저 오류 감지 불가능 | 모바일 브라우저를 포함한 모든 브라우저 지원 |
|6.| 요소 의사 상태를 테스트할 수 __없음__ | `:hover`나 `:active`와 같은 의사 상태 지원 |

이 러너는 [Vite](https://vitejs.dev/)를 사용하여 테스트 코드를 컴파일하고 브라우저에 로드합니다. 다음과 같은 컴포넌트 프레임워크에 대한 프리셋이 제공됩니다:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

모든 테스트 파일/테스트 파일 그룹은 단일 페이지 내에서 실행되며, 이는 각 테스트 사이에 페이지가 다시 로드되어 테스트 간 격리를 보장함을 의미합니다.

### 설치

브라우저 러너를 사용하려면 다음과 같이 설치할 수 있습니다:

```sh
npm install --save-dev @wdio/browser-runner
```

### 설정

브라우저 러너를 사용하려면 `wdio.conf.js` 파일에 `runner` 속성을 정의해야 합니다. 예를 들면:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### 러너 옵션

브라우저 러너는 다음과 같은 구성을 허용합니다:

#### `preset`

위에서 언급한 프레임워크 중 하나를 사용하여 컴포넌트를 테스트하는 경우, 모든 것이 즉시 구성되도록 프리셋을 정의할 수 있습니다. 이 옵션은 `viteConfig`와 함께 사용할 수 없습니다.

__유형:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__예시:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

자신만의 [Vite 구성](https://vitejs.dev/config/)을 정의합니다. 사용자 정의 객체를 전달하거나 개발에 Vite.js를 사용하는 경우 기존 `vite.conf.ts` 파일을 가져올 수 있습니다. WebdriverIO는 테스트 하네스를 설정하기 위해 사용자 정의 Vite 구성을 유지합니다.

__유형:__ `string` 또는 [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) 또는 `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__예시:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // 또는 간단히:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // 또는 값이 읽힐 때만 해결하려는 많은 플러그인이 포함된 경우
    // 함수를 사용하세요
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

`true`로 설정하면 러너는 헤드리스 모드에서 테스트를 실행하도록 기능을 업데이트합니다. 기본적으로 이것은 `CI` 환경 변수가 `'1'` 또는 `'true'`로 설정된 CI 환경에서 활성화됩니다.

__유형:__ `boolean`<br />
__기본값:__ `false`, `CI` 환경 변수가 설정된 경우 `true`로 설정됨

#### `rootDir`

프로젝트 루트 디렉토리.

__유형:__ `string`<br />
__기본값:__ `process.cwd()`

#### `coverage`

WebdriverIO는 [`istanbul`](https://istanbul.js.org/)을 통한 테스트 커버리지 보고를 지원합니다. 자세한 내용은 [커버리지 옵션](#coverage-options)을 참조하세요.

__유형:__ `object`<br />
__기본값:__ `undefined`

### 커버리지 옵션

다음 옵션을 사용하여 커버리지 보고를 구성할 수 있습니다.

#### `enabled`

커버리지 수집을 활성화합니다.

__유형:__ `boolean`<br />
__기본값:__ `false`

#### `include`

글로브 패턴으로 커버리지에 포함된 파일 목록.

__유형:__ `string[]`<br />
__기본값:__ `[**]`

#### `exclude`

글로브 패턴으로 커버리지에서 제외된 파일 목록.

__유형:__ `string[]`<br />
__기본값:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

보고서에 포함해야 하는 파일 확장자 목록.

__유형:__ `string | string[]`<br />
__기본값:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

커버리지 보고서를 작성할 디렉토리.

__유형:__ `string`<br />
__기본값:__ `./coverage`

#### `reporter`

사용할 커버리지 리포터. 모든 리포터의 자세한 목록은 [istanbul 문서](https://istanbul.js.org/docs/advanced/alternative-reporters/)를 참조하세요.

__유형:__ `string[]`<br />
__기본값:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

파일별로 임계값을 확인합니다. 실제 임계값은 `lines`, `functions`, `branches` 및 `statements`를 참조하세요.

__유형:__ `boolean`<br />
__기본값:__ `false`

#### `clean`

테스트를 실행하기 전에 커버리지 결과를 정리합니다.

__유형:__ `boolean`<br />
__기본값:__ `true`

#### `lines`

라인에 대한 임계값.

__유형:__ `number`<br />
__기본값:__ `undefined`

#### `functions`

함수에 대한 임계값.

__유형:__ `number`<br />
__기본값:__ `undefined`

#### `branches`

분기에 대한 임계값.

__유형:__ `number`<br />
__기본값:__ `undefined`

#### `statements`

구문에 대한 임계값.

__유형:__ `number`<br />
__기본값:__ `undefined`

### 제한 사항

WebdriverIO 브라우저 러너를 사용할 때, `alert`나 `confirm`과 같은 스레드 차단 대화 상자는 기본적으로 사용할 수 없다는 점에 유의하는 것이 중요합니다. 이는 웹 페이지를 차단하므로 WebdriverIO가 페이지와 계속 통신할 수 없어 실행이 멈추기 때문입니다.

이러한 상황에서 WebdriverIO는 이러한 API에 대한 기본 반환 값을 가진 기본 모의(mock)를 제공합니다. 이는 사용자가 실수로 동기식 팝업 웹 API를 사용하더라도 실행이 멈추지 않도록 보장합니다. 그러나 더 나은 경험을 위해 사용자가 이러한 웹 API를 모의(mock)하는 것이 여전히 권장됩니다. [모의(Mocking)](/docs/component-testing/mocking)에서 자세히 읽어보세요.

### 예시

[컴포넌트 테스팅](https://webdriver.io/docs/component-testing)에 관한 문서를 확인하고 이러한 프레임워크 및 다양한 기타 프레임워크를 사용한 예제가 있는 [예제 저장소](https://github.com/webdriverio/component-testing-examples)를 살펴보세요.