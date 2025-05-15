---
id: timeouts
title: 타임아웃
---

각 WebdriverIO 명령은 비동기 작업입니다. Selenium 서버(또는 [Sauce Labs](https://saucelabs.com)와 같은 클라우드 서비스)에 요청이 전송되고, 응답에는 작업이 완료되거나 실패한 결과가 포함됩니다.

따라서 시간은 전체 테스트 프로세스에서 중요한 요소입니다. 특정 작업이 다른 작업의 상태에 의존할 때, 올바른 순서대로 실행되도록 확인해야 합니다. 이러한 문제를 다룰 때 타임아웃이 중요한 역할을 합니다.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver 타임아웃

### 세션 스크립트 타임아웃

세션에는 비동기 스크립트가 실행될 때까지 기다리는 시간을 지정하는 세션 스크립트 타임아웃이 있습니다. 따로 명시하지 않으면 30초입니다. 이 타임아웃을 다음과 같이 설정할 수 있습니다:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### 세션 페이지 로드 타임아웃

세션에는 페이지 로딩이 완료될 때까지 기다리는 시간을 지정하는 세션 페이지 로드 타임아웃이 있습니다. 따로 명시하지 않으면 300,000밀리초입니다.

이 타임아웃을 다음과 같이 설정할 수 있습니다:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` 키워드는 공식 WebDriver [명세](https://www.w3.org/TR/webdriver/#set-timeouts)의 일부이지만, 브라우저에 따라 [지원되지 않을](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) 수 있습니다(이전 이름은 `page load`).

### 세션 암묵적 대기 타임아웃

세션에는 관련 세션 암묵적 대기 타임아웃이 있습니다. 이는 [`findElement`](/docs/api/webdriver#findelement) 또는 [`findElements`](/docs/api/webdriver#findelements) 명령([`$`](/docs/api/browser/$) 또는 [`$$`](/docs/api/browser/$$), WebdriverIO를 WDIO 테스트러너와 함께 또는 없이 실행할 때)을 사용하여 요소를 찾을 때 암묵적 요소 위치 전략을 기다리는 시간을 지정합니다. 따로 명시하지 않으면 0밀리초입니다.

이 타임아웃은 다음과 같이 설정할 수 있습니다:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO 관련 타임아웃

### `WaitFor*` 타임아웃

WebdriverIO는 요소가 특정 상태(예: 활성화, 표시, 존재)에 도달할 때까지 기다리는 여러 명령을 제공합니다. 이러한 명령은 선택자 인수와 타임아웃 숫자를 사용하며, 이 숫자는 인스턴스가 해당 요소가 상태에 도달할 때까지 기다리는 시간을 결정합니다. `waitforTimeout` 옵션을 사용하면 모든 `waitFor*` 명령에 대한 전역 타임아웃을 설정할 수 있으므로 동일한 타임아웃을 반복해서 설정할 필요가 없습니다. _(소문자 `f`에 주의하세요!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

테스트에서 이제 다음과 같이 할 수 있습니다:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// 필요한 경우 기본 타임아웃을 재정의할 수도 있습니다
await myElem.waitForDisplayed({ timeout: 10000 })
```

## 프레임워크 관련 타임아웃

WebdriverIO와 함께 사용하는 테스트 프레임워크는 모든 것이 비동기적이기 때문에 타임아웃을 처리해야 합니다. 이는 문제가 발생했을 때 테스트 프로세스가 멈추지 않도록 보장합니다.

기본적으로 타임아웃은 10초이며, 이는 단일 테스트가 그 이상 걸리지 않아야 함을 의미합니다.

Mocha의 단일 테스트는 다음과 같습니다:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

Cucumber에서는 타임아웃이 단일 스텝 정의에 적용됩니다. 그러나 테스트가 기본값보다 오래 걸려서 타임아웃을 늘리고 싶다면 프레임워크 옵션에서 설정해야 합니다.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>