---
id: setSystemTime
title: встановитиСистемнийЧас
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

Змінити системний час на новий. Новий час може бути часовою міткою, об'єктом дати або не вказаним, що за замовчуванням дорівнює 0. Жодні таймери не будуть викликані, а час, що залишився до їх спрацювання, не зміниться.

##### Використання

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>Нова дата для встановлення системного часу.</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### Повертає

- **&lt; `Promise<void>` &gt;**