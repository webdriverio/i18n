---
id: typescript
title: TypeScript 설정
---

자동 완성 및 타입 안전성을 얻기 위해 [TypeScript](http://www.typescriptlang.org)를 사용하여 테스트를 작성할 수 있습니다.

[`tsx`](https://github.com/privatenumber/tsx)를 `devDependencies`에 설치해야 합니다. 다음 명령어로 설치할 수 있습니다:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO는 이러한 의존성이 설치되어 있는지 자동으로 감지하고 구성과 테스트를 컴파일합니다. WDIO 구성과 동일한 디렉터리에 `tsconfig.json`이 있는지 확인하세요.

#### 사용자 정의 TSConfig

`tsconfig.json`에 다른 경로를 설정해야 할 경우, 원하는 경로로 TSCONFIG_PATH 환경 변수를 설정하거나 wdio 구성의 [tsConfigPath 설정](/docs/configurationfile)을 사용하세요.

또는 `tsx`의 [환경 변수](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path)를 사용할 수 있습니다.


#### 타입 검사

`tsx`는 타입 검사를 지원하지 않습니다. 타입을 검사하려면 별도의 단계에서 `tsc`를 사용해야 합니다.

## 프레임워크 설정

`tsconfig.json`에는 다음이 필요합니다:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

`webdriverio` 또는 `@wdio/sync`를 명시적으로 가져오지 마세요.
`tsconfig.json`의 `types`에 추가하면 `WebdriverIO` 및 `WebDriver` 타입은 어디서든 접근할 수 있습니다. 추가 WebdriverIO 서비스, 플러그인 또는 `devtools` 자동화 패키지를 사용하는 경우, 이들도 `types` 목록에 추가하세요. 많은 서비스가 추가 타입을 제공합니다.

## 프레임워크 타입

사용하는 프레임워크에 따라 해당 프레임워크의 타입을 `tsconfig.json`의 types 속성에 추가하고 해당 타입 정의를 설치해야 합니다. 이는 내장 어설션 라이브러리인 [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio)에 대한 타입 지원을 원하는 경우 특히 중요합니다.

예를 들어, Mocha 프레임워크를 사용하기로 결정한 경우, `@types/mocha`를 설치하고 다음과 같이 추가하여 모든 타입을 전역적으로 사용할 수 있게 해야 합니다:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## 서비스

브라우저 범위에 명령을 추가하는 서비스를 사용하는 경우 이를 `tsconfig.json`에도 포함해야 합니다. 예를 들어 `@wdio/lighthouse-service`를 사용하는 경우, 다음과 같이 `types`에 추가하세요:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

서비스와 리포터를 TypeScript 구성에 추가하면 WebdriverIO 구성 파일의 타입 안전성도 강화됩니다.

## 타입 정의

WebdriverIO 명령을 실행할 때 모든 속성은 일반적으로 타입이 지정되어 있어 추가 타입을 가져오는 문제를 처리할 필요가 없습니다. 그러나 변수를 미리 정의하고 싶은 경우가 있습니다. 이러한 변수가 타입 안전성을 갖도록 하기 위해 [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) 패키지에 정의된 모든 타입을 사용할 수 있습니다. 예를 들어 `webdriverio`의 원격 옵션을 정의하려면 다음과 같이 할 수 있습니다:

```ts
import type { Options } from '@wdio/types'

// 타입을 직접 가져오고 싶을 때의 예시
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// 다른 경우에는 `WebdriverIO` 네임스페이스를 사용할 수 있습니다
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // 다른 구성 옵션들
}
```

## 팁과 힌트

### 컴파일 및 린트

완전한 안전성을 위해 다음과 같은 모범 사례를 따를 수 있습니다: TypeScript 컴파일러로 코드를 컴파일하고(`tsc` 또는 `npx tsc` 실행) [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)를 [pre-commit 훅](https://github.com/typicode/husky)에서 실행하세요.