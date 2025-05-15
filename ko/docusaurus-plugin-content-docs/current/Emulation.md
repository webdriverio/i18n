---
id: emulation
title: 에뮬레이션
---

WebdriverIO를 사용하면 [`emulate`](/docs/api/browser/emulate) 명령을 통해 특정 브라우저 동작을 에뮬레이션하는 데 도움이 되는 사용자 정의 값을 반환하여 Web API를 에뮬레이션할 수 있습니다. 이를 위해서는 애플리케이션이 명시적으로 이러한 API를 사용해야 합니다.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

이 기능은 브라우저의 WebDriver Bidi 지원이 필요합니다. Chrome, Edge 및 Firefox의 최신 버전들은 이러한 지원이 있지만, Safari는 __지원하지 않습니다__. 업데이트는 [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned)에서 확인하세요. 또한 클라우드 벤더를 사용하여 브라우저를 실행하는 경우, 해당 벤더가 WebDriver Bidi를 지원하는지 확인하세요.

테스트에서 WebDriver Bidi를 활성화하려면 capabilities에 `webSocketUrl: true`가 설정되어 있는지 확인하세요.

:::

## 지오로케이션

브라우저 지오로케이션을 특정 지역으로 변경할 수 있습니다:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

이는 [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)의 작동 방식을 변경하여 사용자가 제공한 위치를 반환합니다.

## 색상 구성표

브라우저의 기본 색상 구성표를 다음과 같이 변경할 수 있습니다:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

이는 `(prefers-color-scheme: dark)`를 통해 색상 구성표를 쿼리할 때 [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)의 동작 방식을 변경합니다.

## 사용자 에이전트

브라우저의 사용자 에이전트를 다른 문자열로 변경할 수 있습니다:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

이는 [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)의 값을 변경합니다. 브라우저 벤더들이 점진적으로 사용자 에이전트를 더 이상 사용하지 않게 되고 있음을 참고하세요.

## onLine 속성

브라우저의 온라인 상태를 다음과 같이 변경할 수 있습니다:

```ts
await browser.emulate('onLine', false)
```

이는 브라우저와 인터넷 간의 네트워크 트래픽을 끄지 __않고__ [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)의 반환 값만 변경합니다. 브라우저의 네트워크 기능을 수정하는 데 관심이 있다면, [`throttleNetwork`](/docs/api/browser/throttleNetwork) 명령을 참고하세요.

## 시계

[`emulate`](/docs/emulation) 명령을 사용하여 브라우저 시스템 시계를 수정할 수 있습니다. 이는 시간과 관련된 네이티브 전역 함수를 재정의하여 `clock.tick()` 또는 생성된 clock 객체를 통해 동기적으로 제어할 수 있게 합니다. 다음을 제어할 수 있습니다:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

시계는 유닉스 에폭(타임스탬프 0)에서 시작합니다. 즉, `emulate` 명령에 다른 옵션을 전달하지 않으면 애플리케이션에서 새 Date를 인스턴스화할 때 1970년 1월 1일의 시간을 갖게 됩니다.

##### 예시

`browser.emulate('clock', { ... })`를 호출하면 현재 페이지와 이후 모든 페이지에 대한 전역 함수를 즉시 덮어씁니다:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

[`setSystemTime`](/docs/api/clock/setSystemTime) 또는 [`tick`](/docs/api/clock/tick)을 호출하여 시스템 시간을 수정할 수 있습니다.

`FakeTimerInstallOpts` 객체는 다음과 같은 속성을 가질 수 있습니다:

```ts
interface FakeTimerInstallOpts {
    // 지정된 유닉스 에폭으로 가짜 타이머를 설치합니다
    // @default: 0
    now?: number | Date | undefined;

    // 가짜로 만들 전역 메서드와 API의 이름 배열. 기본적으로 WebdriverIO는
    // `nextTick()`과 `queueMicrotask()`를 대체하지 않습니다. 예를 들어,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })`는
    // `setTimeout()`과 `nextTick()`만 가짜로 만듭니다
    toFake?: FakeMethod[] | undefined;

    // runAll()을 호출할 때 실행될 최대 타이머 수(기본값: 1000)
    loopLimit?: number | undefined;

    // 실제 시스템 시간 변화를 기반으로 모의 시간을 자동으로 증가시키도록 WebdriverIO에 알립니다
    // (예: 실제 시스템 시간이 20ms 변경될 때마다 모의 시간도 20ms씩 증가)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // shouldAdvanceTime: true를 사용할 때만 관련됩니다. 실제 시스템 시간이
    // advanceTimeDelta ms 변경될 때마다 모의 시간을 advanceTimeDelta ms씩 증가시킵니다
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // FakeTimers에게 각각의 핸들러에 위임하여 '네이티브'(즉, 가짜가 아닌) 타이머를 
    // 지우도록 지시합니다. 이들은 기본적으로 지워지지 않으므로, FakeTimers를 설치하기 전에
    // 타이머가 존재했다면 예상치 못한 동작이 발생할 수 있습니다.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## 디바이스

`emulate` 명령은 또한 뷰포트, 디바이스 스케일 팩터 및 사용자 에이전트를 변경하여 특정 모바일 또는 데스크톱 디바이스를 에뮬레이션하는 것을 지원합니다. 이는 데스크톱 브라우저 엔진이 모바일 엔진과 다르기 때문에 모바일 테스트에 사용되어서는 안 됩니다. 이는 애플리케이션이 작은 뷰포트 크기에 대해 특정 동작을 제공하는 경우에만 사용해야 합니다.

예를 들어, iPhone 15의 사용자 에이전트와 뷰포트로 전환하려면 다음을 실행하세요:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// 애플리케이션 테스트...

// 원래 뷰포트와 사용자 에이전트로 재설정
await restore()
```

WebdriverIO는 [모든 정의된 디바이스](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts)의 고정 목록을 유지 관리합니다.