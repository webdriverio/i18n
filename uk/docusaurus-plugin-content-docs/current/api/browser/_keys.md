---
id: keys
title: keys
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Надсилає послідовність натискань клавіш до "активного" елемента. Ви можете зробити елемент вводу активним, просто клацнувши на ньому. Щоб використовувати символи, такі як "Стрілка вліво" або "Backspace", імпортуйте об'єкт `Key` з пакету WebdriverIO.

Модифікатори, такі як `Control`, `Shift`, `Alt` та `Command`, залишаються натиснутими, тому вам потрібно натиснути їх знову, щоб відпустити. Модифікація кліку, однак, вимагає використання WebDriver Actions API через метод [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

Клавіші-модифікатори відрізняються залежно від операційної системи, на якій працює браузер, наприклад, MacOS: `Command` та Windows: `Control`. WebdriverIO надає крос-браузерну клавішу-модифікатор під назвою `Ctrl` (див. приклад нижче).

:::

##### Використання

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>Послідовність клавіш для введення. Необхідно надати масив або рядок.</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```