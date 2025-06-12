---
id: assertion
title: 단언(Assertion)
---

[WDIO 테스트러너](https://webdriver.io/docs/clioptions)는 브라우저의 다양한 측면이나 웹 애플리케이션 내의 요소에 대해 강력한 단언을 할 수 있게 해주는 내장 단언 라이브러리와 함께 제공됩니다. 이는 [Jest의 Matchers](https://jestjs.io/docs/en/using-matchers) 기능을 e2e 테스팅에 최적화된 추가 매처로 확장합니다. 예:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

또는

```js
const selectOptions = await $$('form select>option')

// 셀렉트에 최소 하나의 옵션이 있는지 확인
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

전체 목록은 [expect API 문서](/docs/api/expect-webdriverio)를 참조하세요.

## 소프트 단언(Soft Assertions)

WebdriverIO는 expect-webdriver(5.2.0)에서 기본적으로 소프트 단언을 포함합니다. 소프트 단언을 사용하면 단언이 실패하더라도 테스트 실행이 계속될 수 있습니다. 모든 실패는 수집되어 테스트 끝에 보고됩니다.

### 사용법

```js
// 이들은 실패해도 즉시 오류를 발생시키지 않습니다
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// 일반 단언은 여전히 즉시 오류를 발생시킵니다
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Chai에서 마이그레이션

[Chai](https://www.chaijs.com/)와 [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme)는 공존할 수 있으며, 몇 가지 사소한 조정으로 expect-webdriverio로의 원활한 전환이 가능합니다. WebdriverIO v6로 업그레이드했다면 기본적으로 `expect-webdriverio`의 모든 단언에 즉시 접근할 수 있습니다. 이는 전역적으로 `expect`를 사용하는 모든 곳에서 `expect-webdriverio` 단언을 호출한다는 의미입니다. 단, [`injectGlobals`](/docs/configuration#injectglobals)를 `false`로 설정하거나 Chai를 사용하기 위해 전역 `expect`를 명시적으로 재정의한 경우는 예외입니다. 이런 경우에는 필요한 곳에 expect-webdriverio 패키지를 명시적으로 가져오지 않으면 expect-webdriverio 단언에 접근할 수 없습니다.

이 가이드는 Chai가 로컬에서 재정의된 경우와 전역적으로 재정의된 경우 모두에서 Chai에서 마이그레이션하는 방법의 예를 보여줍니다.

### 로컬

Chai가 파일에 명시적으로 가져와진 경우를 가정해 보겠습니다:

```js
// myfile.js - 원본 코드
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

이 코드를 마이그레이션하려면 Chai 가져오기를 제거하고 새로운 expect-webdriverio 단언 메서드 `toHaveUrl`을 대신 사용하세요:

```js
// myfile.js - 마이그레이션된 코드
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // 새로운 expect-webdriverio API 메서드 https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

같은 파일에서 Chai와 expect-webdriverio를 모두 사용하려면 Chai 가져오기를 유지하고 `expect`는 기본적으로 expect-webdriverio 단언이 됩니다:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai 단언
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio 단언
    })
})
```

### 전역

`expect`가 전역적으로 Chai를 사용하도록 재정의된 경우를 가정해 보겠습니다. expect-webdriverio 단언을 사용하려면 "before" 훅에서 전역 변수를 설정해야 합니다:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

이제 Chai와 expect-webdriverio를 함께 사용할 수 있습니다. 코드에서 다음과 같이 Chai와 expect-webdriverio 단언을 사용할 수 있습니다:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai 단언
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio 단언
    });
});
```

마이그레이션하려면 각 Chai 단언을 점진적으로 expect-webdriverio로 옮기면 됩니다. 코드베이스 전체에서 모든 Chai 단언이 대체되면 "before" 훅을 삭제할 수 있습니다. `wdioExpect`를 `expect`로 바꾸는 전역 찾기 및 바꾸기 작업으로 마이그레이션을 완료할 수 있습니다.