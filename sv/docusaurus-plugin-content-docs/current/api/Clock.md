---
id: clock
title: Klockobjektet
---

Du kan modifiera webbläsarens systemklocka med kommandot [`emulate`](/docs/emulation). Det åsidosätter inbyggda globala funktioner relaterade till tid, vilket gör att de kan kontrolleras synkront via `clock.tick()` eller det genererade klockobjektet. Detta inkluderar kontroll av:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Klockan startar vid unix-epoken (tidsstämpel 0). Detta innebär att när du skapar ett nytt Date-objekt i din applikation kommer det att ha tiden 1 januari 1970 om du inte skickar några andra alternativ till kommandot `emulate`.

## Exempel

När du anropar `browser.emulate('clock', { ... })` kommer det omedelbart att skriva över de globala funktionerna för den aktuella sidan samt alla följande sidor, t.ex.:

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

Du kan ändra systemtiden genom att anropa [`setSystemTime`](/docs/api/clock/setSystemTime) eller [`tick`](/docs/api/clock/tick).