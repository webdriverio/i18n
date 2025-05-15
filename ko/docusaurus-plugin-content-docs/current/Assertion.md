---
id: assertion
title: 단언(Assertion)
---

[WDIO 테스트러너](https://webdriver.io/docs/clioptions)는 브라우저의 다양한 측면이나 (웹) 애플리케이션 내 요소에 대해 강력한 단언을 할 수 있게 해주는 내장 단언 라이브러리와 함께 제공됩니다. 이는 [Jest의 매처(Matchers)](https://jestjs.io/docs/en/using-matchers) 기능을 e2e 테스팅에 최적화된 추가 매처로 확장합니다. 예를 들면:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

또는

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

전체 목록은 [expect API 문서](/docs/api/expect-webdriverio)를 참조하세요.

## Chai에서 마이그레이션하기

[Chai](https://www.chaijs.com/)와 [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme)는 공존할 수 있으며, 몇 가지 사소한 조정을 통해 expect-webdriverio로 원활하게 전환할 수 있습니다. WebdriverIO v6로 업그레이드한 경우, 기본적으로 모든 `expect-webdriverio` 단언에 바로 접근할 수 있습니다. 이는 전역적으로 `expect`를 사용하는 모든 곳에서 `expect-webdriverio` 단언을 호출한다는 의미입니다. 단, [`injectGlobals`](/docs/configuration#injectglobals)를 `false`로 설정하거나 전역 `expect`를 명시적으로 Chai를 사용하도록 재정의한 경우는 예외입니다. 이 경우 필요한 곳에 expect-webdriverio 패키지를 명시적으로 가져오지 않으면 expect-webdriverio 단언에 접근할 수 없습니다.

이 가이드는 로컬에서 재정의된 Chai에서 마이그레이션하는 방법과 전역적으로 재정의된 Chai에서 마이그레이션하는 방법의 예를 보여줍니다.

### 로컬

Chai가 파일에 명시적으로 임포트된 경우를 가정해 봅시다:

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

이 코드를 마이그레이션하려면 Chai 임포트를 제거하고 새로운 expect-webdriverio 단언 메소드 `toHaveUrl`을 대신 사용합니다:

```js
// myfile.js - 마이그레이션된 코드
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // 새 expect-webdriverio API 메소드 https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

동일한 파일에서 Chai와 expect-webdriverio를 모두 사용하려면 Chai 임포트를 유지하고 `expect`는 기본적으로 expect-webdriverio 단언을 사용하게 됩니다. 예:

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

이제 Chai와 expect-webdriverio를 함께 사용할 수 있습니다. 코드에서는 다음과 같이 Chai와 expect-webdriverio 단언을 사용할 수 있습니다:

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

마이그레이션하려면 각 Chai 단언을 점진적으로 expect-webdriverio로 이전해야 합니다. 코드베이스 전체에서 모든 Chai 단언이 대체되면 "before" 훅을 삭제할 수 있습니다. 그런 다음 `wdioExpect`의 모든 인스턴스를 `expect`로 바꾸는 전역 찾기 및 바꾸기 작업으로 마이그레이션을 완료합니다.