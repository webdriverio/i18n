---
id: scroll
title: прокрутка
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Прокрутка в межах вікна перегляду браузера. Зверніть увагу, що координати `x` та `y` відносяться до поточної
позиції прокрутки, тому `browser.scroll(0, 0)` не виконує жодної дії.

##### Використання

```js
browser.scroll(x, y)
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
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`number`</td>
      <td>горизонтальна позиція прокрутки (за замовчуванням: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`number`</td>
      <td>вертикальна позиція прокрутки (за замовчуванням: `0`)</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```