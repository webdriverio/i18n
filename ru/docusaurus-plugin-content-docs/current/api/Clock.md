---
id: clock
title: Объект Clock (Часы)
---

Вы можете изменять системные часы браузера, используя команду [`emulate`](/docs/emulation). Она переопределяет нативные глобальные функции, связанные со временем, позволяя управлять ими синхронно через `clock.tick()` или объект часов. Это включает контроль над:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Часы начинаются с эпохи Unix (метка времени 0). Это означает, что когда вы создаете новый объект Date в вашем приложении, он будет иметь время 1 января 1970 года, если вы не передадите другие параметры в команду `emulate`.

## Пример

При вызове `browser.emulate('clock', { ... })` глобальные функции текущей страницы и всех последующих страниц будут немедленно переопределены, например:

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

Вы можете изменять системное время, вызывая [`setSystemTime`](/docs/api/clock/setSystemTime) или [`tick`](/docs/api/clock/tick).