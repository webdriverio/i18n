---
id: retry
title: 불안정한 테스트 재시도하기
---

WebdriverIO 테스트러너를 사용하면 불안정한 네트워크나 경쟁 조건과 같은 이유로 불안정한 테스트를 다시 실행할 수 있습니다. (그러나 테스트가 불안정해진다고 단순히 재시도 횟수를 늘리는 것은 권장하지 않습니다!)

## Mocha에서 스위트 재실행

Mocha 버전 3부터는 전체 테스트 스위트(`describe` 블록 내부의 모든 것)를 재실행할 수 있습니다. Mocha를 사용하는 경우 특정 테스트 블록(모든 `it` 블록 내부)만 재실행할 수 있는 WebdriverIO 구현 대신 이 재시도 메커니즘을 선호해야 합니다. `this.retries()` 메서드를 사용하기 위해, 스위트 블록 `describe`는 [Mocha 문서](https://mochajs.org/#arrow-functions)에 설명된 대로 화살표 함수 `() => {}` 대신 바인딩되지 않은 함수 `function(){}`를 사용해야 합니다. Mocha를 사용하면 `wdio.conf.js`에서 `mochaOpts.retries`를 사용하여 모든 스펙에 대한 재시도 횟수를 설정할 수도 있습니다.

예시:

```js
describe('retries', function () {
    // 이 스위트의 모든 테스트를 최대 4번까지 재시도
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // 이 테스트는 최대 2번까지만 재시도하도록 지정
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Jasmine 또는 Mocha에서 단일 테스트 재실행

특정 테스트 블록을 재실행하려면 테스트 블록 함수 뒤에 마지막 매개변수로 재실행 횟수를 적용하면 됩니다:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * 최대 4번 실행되는 스펙(1번 실제 실행 + 3번 재시도)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // 재시도 횟수 반환
        // ...
    }, 3)
})
```

훅에서도 똑같이 작동합니다:

```js
describe('my flaky app', () => {
    /**
     * 최대 2번 실행되는 훅(1번 실제 실행 + 1번 재시도)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * 최대 4번 실행되는 스펙(1번 실제 실행 + 3번 재시도)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // 재시도 횟수 반환
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

훅에서도 똑같이 작동합니다:

```js
describe('my flaky app', () => {
    /**
     * 최대 2번 실행되는 훅(1번 실제 실행 + 1번 재시도)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Jasmine을 사용하는 경우 두 번째 매개변수는 타임아웃용으로 예약되어 있습니다. 재시도 매개변수를 적용하려면 타임아웃을 기본값인 `jasmine.DEFAULT_TIMEOUT_INTERVAL`로 설정한 다음 재시도 횟수를 적용해야 합니다.

</TabItem>
</Tabs>

이 재시도 메커니즘은 단일 훅이나 테스트 블록만 재시도할 수 있습니다. 애플리케이션을 설정하기 위한 훅이 테스트와 함께 있는 경우 이 훅은 실행되지 않습니다. [Mocha는](https://mochajs.org/#retry-tests) 이 동작을 제공하는 네이티브 테스트 재시도를 제공하지만 Jasmine은 제공하지 않습니다. `afterTest` 훅에서 실행된 재시도 횟수에 접근할 수 있습니다.

## Cucumber에서 재실행

### Cucumber에서 전체 스위트 재실행

cucumber >=6의 경우 실패한 모든 또는 일부 시나리오가 성공할 때까지 추가 재시도를 얻도록 선택적 매개변수 `retryTagFilter`와 함께 [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) 구성 옵션을 제공할 수 있습니다. 이 기능이 작동하려면 `scenarioLevelReporter`를 `true`로 설정해야 합니다.

### Cucumber에서 스텝 정의 재실행

특정 스텝 정의에 대한 재실행 비율을 정의하려면 다음과 같이 재시도 옵션을 적용하세요:

```js
export default function () {
    /**
     * 최대 3번 실행되는 스텝 정의(1번 실제 실행 + 2번 재시도)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

재실행은 스텝 정의 파일에서만 정의할 수 있으며, 기능 파일에서는 정의할 수 없습니다.

## 스펙파일 기준으로 재시도 추가

이전에는 테스트 및 스위트 수준 재시도만 사용할 수 있었는데, 대부분의 경우 이것으로 충분합니다.

그러나 서버나 데이터베이스의 상태와 관련된 테스트에서는 첫 번째 테스트 실패 후 상태가 무효화될 수 있습니다. 이후의 재시도는 시작 시 무효한 상태로 인해 통과할 가능성이 없을 수 있습니다.

각 스펙파일마다 새로운 `browser` 인스턴스가 생성되므로, 이는 다른 상태(서버, 데이터베이스)를 연결하고 설정하는 이상적인 위치입니다. 이 수준에서의 재시도는 새 스펙파일에 대한 것처럼 전체 설정 프로세스가 단순히 반복됨을 의미합니다.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * 전체 스펙파일이 실패할 때 재시도할 횟수
     */
    specFileRetries: 1,
    /**
     * 스펙파일 재시도 시도 사이의 지연 시간(초)
     */
    specFileRetriesDelay: 0,
    /**
     * 재시도된 스펙파일은 대기열의 시작 부분에 삽입되어 즉시 재시도됨
     */
    specFileRetriesDeferred: false
}
```

## 특정 테스트를 여러 번 실행

이는 불안정한 테스트가 코드베이스에 도입되는 것을 방지하는 데 도움이 됩니다. `--repeat` CLI 옵션을 추가하면 지정된 스펙이나 스위트를 N번 실행합니다. 이 CLI 플래그를 사용할 때는 `--spec` 또는 `--suite` 플래그도 함께 지정해야 합니다.

CI/CD 프로세스를 통해 코드베이스에 새 테스트를 추가할 때, 테스트가 통과되어 병합될 수 있지만 나중에 불안정해질 수 있습니다. 이러한 불안정성은 네트워크 문제, 서버 부하, 데이터베이스 크기 등 다양한 요인에서 비롯될 수 있습니다. CD/CD 프로세스에서 `--repeat` 플래그를 사용하면 이러한 불안정한 테스트가 주요 코드베이스에 병합되기 전에 발견하는 데 도움이 될 수 있습니다.

사용할 수 있는 전략은 CI/CD 프로세스에서 평소처럼 테스트를 실행하되, 새 테스트를 도입하는 경우 `--spec`에 새 스펙을 지정하고 `--repeat`과 함께 다른 테스트 세트를 실행하여 새 테스트가 x번 실행되도록 하는 것입니다. 테스트가 그 중 어느 시점에서든 실패하면 테스트는 병합되지 않고 실패 원인을 살펴봐야 합니다.

```sh
# 이렇게 하면 example.e2e.js 스펙이 5번 실행됩니다
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```