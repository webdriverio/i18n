---
id: clock
title: El Objeto Clock
---

Puedes modificar el reloj del sistema del navegador usando el comando [`emulate`](/docs/emulation). Este comando sobrescribe las funciones globales nativas relacionadas con el tiempo, permitiendo controlarlas de forma sincrónica mediante `clock.tick()` o el objeto clock generado. Esto incluye el control de:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

El reloj comienza en la época unix (marca de tiempo 0). Esto significa que cuando instancias un nuevo Date en tu aplicación, tendrá una hora del 1 de enero de 1970 si no pasas otras opciones al comando `emulate`.

## Ejemplo

Al llamar a `browser.emulate('clock', { ... })` sobrescribirá inmediatamente las funciones globales para la página actual y todas las páginas siguientes, por ejemplo:

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

Puedes modificar la hora del sistema llamando a [`setSystemTime`](/docs/api/clock/setSystemTime) o [`tick`](/docs/api/clock/tick).