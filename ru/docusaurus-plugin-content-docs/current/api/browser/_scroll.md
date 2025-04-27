---
id: scroll
title: прокрутка
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Прокрутка в области просмотра браузера. Обратите внимание, что координаты `x` и `y` относительны текущей
позиции прокрутки, поэтому `browser.scroll(0, 0)` не выполняет никаких действий.

##### Использование

```js
browser.scroll(x, y)
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
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>горизонтальная позиция прокрутки (по умолчанию: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>вертикальная позиция прокрутки (по умолчанию: `0`)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```