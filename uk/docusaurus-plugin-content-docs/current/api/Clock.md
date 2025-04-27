---
id: clock
title: Об'єкт Clock
---

Ви можете змінювати системний годинник браузера, використовуючи команду [`emulate`](/docs/emulation). Вона перевизначає нативні глобальні функції, пов'язані з часом, дозволяючи керувати ними синхронно через `clock.tick()` або через поверненний об'єкт clock. Це включає керування:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Годинник починається з початку епохи Unix (часова мітка 0). Це означає, що коли ви створюєте новий об'єкт Date у вашому додатку, він матиме час 1 січня 1970 року, якщо ви не передасте інші параметри до команди `emulate`.

## Приклад

Коли ви викликаєте `browser.emulate('clock', { ... })`, це негайно перевизначає глобальні функції для поточної сторінки, а також для всіх наступних сторінок, наприклад:

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

Ви можете змінювати системний час, викликаючи [`setSystemTime`](/docs/api/clock/setSystemTime) або [`tick`](/docs/api/clock/tick).