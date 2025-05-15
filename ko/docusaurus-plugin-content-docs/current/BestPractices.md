---
id: bestpractices
title: 모범 사례
---

# 모범 사례

이 가이드는 성능이 좋고 견고한 테스트를 작성하는 데 도움이 되는 모범 사례를 공유하는 것을 목표로 합니다.

## 견고한 셀렉터 사용하기

DOM 변경에 강한 셀렉터를 사용하면, 예를 들어 요소에서 클래스가 제거될 때 테스트가 실패하는 경우가 적거나 아예 없게 됩니다.

클래스는 여러 요소에 적용될 수 있으므로 의도적으로 해당 클래스를 가진 모든 요소를 가져오려는 경우가 아니라면 가능한 피해야 합니다.

```js
// 👎
await $('.button')
```

다음 셀렉터들은 모두 단일 요소를 반환해야 합니다.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__참고:__ WebdriverIO가 지원하는 모든 가능한 셀렉터를 알아보려면 [셀렉터](./Selectors.md) 페이지를 확인하세요.

## 요소 쿼리 수 제한하기

[`$`](https://webdriver.io/docs/api/browser/$) 또는 [`$$`](https://webdriver.io/docs/api/browser/$$) 명령을 사용할 때마다(체이닝 포함), WebdriverIO는 DOM에서 요소를 찾으려고 시도합니다. 이러한 쿼리는 비용이 많이 들기 때문에 가능한 한 제한해야 합니다.

세 개의 요소를 쿼리합니다.

```js
// 👎
await $('table').$('tr').$('td')
```

하나의 요소만 쿼리합니다.

``` js
// 👍
await $('table tr td')
```

체이닝을 사용해야 하는 유일한 경우는 서로 다른 [셀렉터 전략](https://webdriver.io/docs/selectors/#custom-selector-strategies)을 결합하려는 경우입니다.
다음 예제에서는 요소의 섀도우 DOM 내부로 들어가는 전략인 [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors)를 사용합니다.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### 목록에서 하나를 선택하는 대신 단일 요소를 직접 찾는 것이 좋습니다

항상 가능한 것은 아니지만, [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)와 같은 CSS 의사 클래스를 사용하여 부모 요소의 자식 목록에서 해당 요소의 인덱스를 기반으로 요소를 일치시킬 수 있습니다.

모든 테이블 행을 쿼리합니다.

```js
// 👎
await $$('table tr')[15]
```

단일 테이블 행을 쿼리합니다.

```js
// 👍
await $('table tr:nth-child(15)')
```

## 내장된 어설션 사용하기

결과가 일치할 때까지 자동으로 기다리지 않는 수동 어설션을 사용하지 마세요. 이는 불안정한 테스트의 원인이 됩니다.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

내장된 어설션을 사용하면 WebdriverIO는 실제 결과가 예상 결과와 일치할 때까지 자동으로 기다려 견고한 테스트를 만듭니다.
이는 어설션이 통과하거나 타임아웃될 때까지 자동으로 재시도함으로써 달성됩니다.

```js
// 👍
await expect(button).toBeDisplayed()
```

## 지연 로딩 및 프로미스 체이닝

WebdriverIO는 깔끔한 코드 작성에 있어 몇 가지 기술을 가지고 있습니다. 요소를 지연 로딩할 수 있어 프로미스를 체이닝하고 `await`의 사용을 줄일 수 있습니다. 이를 통해 요소를 Element 대신 ChainablePromiseElement로 전달할 수 있으며 페이지 객체와 함께 사용하기가 더 쉽습니다.

그렇다면 언제 `await`를 사용해야 할까요?
`$`와 `$$` 명령을 제외하고는 항상 `await`를 사용해야 합니다.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// 또는
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// 또는
await $('div').$('button').click()
```

## 명령과 어설션을 과도하게 사용하지 않기

expect.toBeDisplayed를 사용할 때 암시적으로 요소가 존재할 때까지 기다립니다. 이미 동일한 작업을 수행하는 어설션이 있을 때 waitForXXX 명령을 사용할 필요가 없습니다.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

요소의 텍스트와 같은 것을 상호 작용하거나 확인할 때 요소가 명시적으로 보이지 않을 수 있거나(예: opacity: 0) 명시적으로 비활성화될 수 있는 경우(예: disabled 속성)가 아니라면 요소가 존재하거나 표시될 때까지 기다릴 필요가 없습니다. 이런 경우에는 요소가 표시될 때까지 기다리는 것이 타당합니다.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## 동적 테스트

비밀 자격 증명과 같은 동적 테스트 데이터를 테스트에 하드코딩하지 말고 환경 변수를 사용하여 환경 내에 저장하세요. 이 주제에 대한 자세한 정보는 [테스트 매개변수화](parameterize-tests) 페이지를 참조하세요.

## 코드 린팅하기

eslint를 사용하여 코드를 린팅하면 오류를 조기에 발견할 수 있습니다. 모범 사례가 항상 적용되도록 [린팅 규칙](https://www.npmjs.com/package/eslint-plugin-wdio)을 사용하세요.

## 일시 중지 사용하지 않기

pause 명령을 사용하고 싶을 수 있지만, 이는 견고하지 않으며 결국 장기적으로 불안정한 테스트를 유발할 수 있어 좋지 않은 방법입니다.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // 제출 버튼이 활성화될 때까지 기다림
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## 비동기 루프

반복하려는 비동기 코드가 있을 때, 모든 루프가 이를 수행할 수 있는 것은 아님을 아는 것이 중요합니다.
예를 들어, Array의 forEach 함수는 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)에서 볼 수 있듯이 비동기 콜백을 허용하지 않습니다.

__참고:__ 이 예제에서 보여주는 것처럼 작업이 동기적으로 수행될 필요가 없는 경우에는 여전히 이러한 방법을 사용할 수 있습니다: `console.log(await $$('h1').map((h1) => h1.getText()))`.

아래는 이것이 무엇을 의미하는지 몇 가지 예입니다.

다음은 비동기 콜백이 지원되지 않기 때문에 작동하지 않습니다.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

다음은 작동합니다.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## 간단하게 유지하기

때로는 사용자들이 텍스트나 값과 같은 데이터를 매핑하는 것을 볼 수 있습니다. 이는 종종 필요하지 않으며 대개 코드 냄새의 징후입니다. 아래 예시에서 이것이 왜 그런지 확인해보세요.

```js
// 👎 너무 복잡하고, 동기적 어설션, 불안정한 테스트를 방지하기 위해 내장 어설션 사용
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 너무 복잡함
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 텍스트로 요소를 찾지만 요소의 위치를 고려하지 않음
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 고유 식별자 사용 (종종 사용자 정의 요소에 사용됨)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 접근성 이름 (종종 네이티브 html 요소에 사용됨)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

때로는 단순한 것에 대해 과도하게 복잡한 해결책을 보기도 합니다.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## 병렬로 코드 실행하기

코드가 실행되는 순서에 신경 쓰지 않는 경우 [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)을 활용하여 실행 속도를 높일 수 있습니다.

__참고:__ 이렇게 하면 코드 가독성이 떨어지므로 페이지 객체나 함수를 사용하여 추상화할 수 있습니다. 다만 성능 이점이 가독성 비용보다 더 가치가 있는지도 고려해야 합니다.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

추상화하면 아래와 같이 로직이 submitWithDataOf라는 메서드에 포함되고 데이터는 Person 클래스에서 가져오는 형태가 될 수 있습니다.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```