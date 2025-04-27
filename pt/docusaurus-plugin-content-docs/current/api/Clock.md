---
id: clock
title: O Objeto Clock
---

Você pode modificar o relógio do sistema do navegador usando o comando [`emulate`](/docs/emulation). Ele substitui funções globais nativas relacionadas ao tempo, permitindo que sejam controladas de forma síncrona através de `clock.tick()` ou do objeto clock gerado. Isso inclui o controle de:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

O relógio começa na época unix (timestamp 0). Isso significa que quando você instancia um novo Date em sua aplicação, ele terá um horário de 1º de janeiro de 1970 se você não passar outras opções para o comando `emulate`.

## Exemplo

Ao chamar `browser.emulate('clock', { ... })`, ele irá imediatamente sobrescrever as funções globais para a página atual, bem como para todas as páginas seguintes, por exemplo:

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

Você pode modificar o horário do sistema chamando [`setSystemTime`](/docs/api/clock/setSystemTime) ou [`tick`](/docs/api/clock/tick).