---
id: clock
title: L'Objet Clock
---

Vous pouvez modifier l'horloge système du navigateur en utilisant la commande [`emulate`](/docs/emulation). Elle remplace les fonctions globales natives liées au temps, permettant de les contrôler de manière synchrone via `clock.tick()` ou l'objet clock généré. Cela inclut le contrôle de :

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

L'horloge démarre à l'époque unix (timestamp de 0). Cela signifie que lorsque vous instanciez un nouvel objet Date dans votre application, il aura une date du 1er janvier 1970 si vous ne passez pas d'autres options à la commande `emulate`.

## Exemple

Lorsque vous appelez `browser.emulate('clock', { ... })`, cela remplacera immédiatement les fonctions globales pour la page actuelle ainsi que toutes les pages suivantes, par exemple :

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

Vous pouvez modifier l'heure système en appelant [`setSystemTime`](/docs/api/clock/setSystemTime) ou [`tick`](/docs/api/clock/tick).