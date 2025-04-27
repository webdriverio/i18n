---
id: setSystemTime
title: установитьСистемноеВремя
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Изменить системное время на новое. Новое время может быть временной меткой, объектом даты или не быть переданным, что по умолчанию равно 0. Никакие таймеры не будут вызваны, и время до их срабатывания не изменится.

##### Использование

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>Новая дата для установки системного времени.</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### Возвращает

- **&lt; `Promise<void>` &gt;**