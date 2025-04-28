---
id: clock
title: L'Oggetto Clock
---

Puoi modificare l'orologio di sistema del browser utilizzando il comando [`emulate`](/docs/emulation). Questo sostituisce le funzioni globali native relative al tempo, permettendo di controllarle in modo sincrono tramite `clock.tick()` o l'oggetto clock generato. Questo include il controllo di:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

L'orologio inizia dall'epoca unix (timestamp 0). Ciò significa che quando istanzi un nuovo oggetto Date nella tua applicazione, avrà un orario corrispondente al 1° gennaio 1970 se non passi altre opzioni al comando `emulate`.

## Example

Quando chiami `browser.emulate('clock', { ... })`, questo sovrascriverà immediatamente le funzioni globali per la pagina corrente e tutte le pagine successive, ad esempio:

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

Puoi modificare l'orario di sistema chiamando [`setSystemTime`](/docs/api/clock/setSystemTime) o [`tick`](/docs/api/clock/tick).