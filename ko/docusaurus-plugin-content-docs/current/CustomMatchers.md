---
id: custommatchers
title: 커스텀 매처
---

WebdriverIO는 웹 및 모바일 테스트 실행을 위한 특별한 기능과 커스텀 매처가 포함된 Jest 스타일의 [`expect`](https://webdriver.io/docs/api/expect-webdriverio) 어설션 라이브러리를 사용합니다. 매처 라이브러리가 크지만 모든 가능한 상황에 맞지는 않습니다. 따라서 사용자가 정의한 커스텀 매처로 기존 매처를 확장할 수 있습니다.

:::warning

현재 [`browser`](/docs/api/browser) 객체 또는 [element](/docs/api/element) 인스턴스에 특화된 매처를 정의하는 방식에는 차이가 없지만, 이것은 미래에 변경될 수 있습니다. 이 개발에 대한 추가 정보는 [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408)를 확인하세요.

:::

## 커스텀 브라우저 매처

커스텀 브라우저 매처를 등록하려면 스펙 파일에서 직접 또는 `wdio.conf.js`의 `before` 훅의 일부로 `expect` 객체에서 `extend`를 호출하세요:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

예제에서 보여주듯이 매처 함수는 첫 번째 매개변수로 예상 객체(브라우저 또는 요소 객체)를, 두 번째 매개변수로 예상 값을 받습니다. 그런 다음 다음과 같이 매처를 사용할 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## 커스텀 요소 매처

커스텀 브라우저 매처와 유사하게 요소 매처도 다르지 않습니다. 요소의 aria-label을 검증하는 커스텀 매처를 만드는 예제입니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

이를 통해 다음과 같이 어설션을 호출할 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript 지원

TypeScript를 사용하는 경우, 커스텀 매처의 타입 안전성을 보장하기 위해 한 단계가 더 필요합니다. `Matcher` 인터페이스를 커스텀 매처로 확장하면 모든 타입 문제가 해결됩니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

커스텀 [비대칭 매처](https://jestjs.io/docs/expect#expectextendmatchers)를 만든 경우, 다음과 같이 `expect` 타입을 확장할 수 있습니다:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```