---
id: clock
title: 시계 객체
---

[`emulate`](/docs/emulation) 명령을 사용하여 브라우저 시스템 시계를 수정할 수 있습니다. 이것은 시간과 관련된 네이티브 전역 함수를 재정의하여 `clock.tick()` 또는 생성된 시계 객체를 통해 동기적으로 제어할 수 있게 합니다. 이것은 다음을 제어할 수 있습니다:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

시계는 유닉스 에포크(타임스탬프 0)에서 시작됩니다. 이는 `emulate` 명령에 다른 옵션을 전달하지 않으면 애플리케이션에서 새 Date를 인스턴스화할 때 1970년 1월 1일의 시간을 갖게 된다는 것을 의미합니다.

## 예시

`browser.emulate('clock', { ... })`를 호출하면 현재 페이지 및 이후의 모든 페이지에 대한 전역 함수를 즉시 덮어씁니다. 예:

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

await browser.url('http://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

[`setSystemTime`](/docs/api/clock/setSystemTime) 또는 [`tick`](/docs/api/clock/tick)을 호출하여 시스템 시간을 수정할 수 있습니다.