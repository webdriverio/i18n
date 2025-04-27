---
id: restore
title: restaurar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

Restaura todas as funções nativas substituídas. Isso é chamado automaticamente entre os testes, então geralmente não é necessário.

##### Uso

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### Exemplo

```js title="restore.js"
console.log(new Date()) // returns e.g. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
```

##### Retorna

- **&lt; `Promise<void>` &gt;**