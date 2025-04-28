---
id: clock
title: Obiekt Zegar
---

Możesz modyfikować zegar systemowy przeglądarki za pomocą polecenia [`emulate`](/docs/emulation). Nadpisuje ono natywne funkcje globalne związane z czasem, pozwalając na ich synchroniczne kontrolowanie za pomocą `clock.tick()` lub zwróconego obiektu zegara. Obejmuje to kontrolowanie:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Obiekty Date`

Zegar startuje od początku ery uniksowej (znacznik czasu 0). Oznacza to, że kiedy tworzysz nowy obiekt Date w swojej aplikacji, będzie on miał czas 1 stycznia 1970 roku, jeśli nie przekażesz żadnych innych opcji do polecenia `emulate`.

## Przykład

Gdy wywołujesz `browser.emulate('clock', { ... })`, natychmiast nadpisuje to globalne funkcje dla bieżącej strony, jak również dla wszystkich następnych stron, np.:

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

Możesz modyfikować czas systemowy, wywołując [`setSystemTime`](/docs/api/clock/setSystemTime) lub [`tick`](/docs/api/clock/tick).