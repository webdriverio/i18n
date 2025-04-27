---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Приостанавливает выполнение на определенное количество времени. Рекомендуется не использовать эту команду для ожидания появления элемента. Во избежание нестабильных результатов тестирования лучше использовать такие команды, как [`waitForExist`](/docs/api/element/waitForExist) или другие команды waitFor*.

##### Использование

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>время в мс</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // выводит: 3000
});
```