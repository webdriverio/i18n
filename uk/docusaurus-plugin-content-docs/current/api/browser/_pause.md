---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Призупиняє виконання на певний проміжок часу. Рекомендується не використовувати цю команду, щоб чекати появи елементу. Щоб уникнути ненадійних результатів тестів, краще використовувати команди типу
[`waitForExist`](/docs/api/element/waitForExist) або інші команди waitFor*.

##### Використання

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>час у мс</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```