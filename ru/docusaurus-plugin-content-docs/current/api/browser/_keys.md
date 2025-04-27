---
id: keys
title: клавиши
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
description: клавиши
---

Отправьте последовательность нажатий клавиш к «активному» элементу. Вы можете сделать элемент ввода активным, просто нажав
на него. Чтобы использовать символы, такие как «Стрелка влево» или «Backspace», импортируйте объект `Key` из пакета WebdriverIO.

Модификаторы, такие как `Control`, `Shift`, `Alt` и `Command`, остаются нажатыми, поэтому вам нужно нажать их снова, чтобы
освободить их. Однако для модификации клика требуется использовать WebDriver Actions API через
метод [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

Клавиши управления различаются в зависимости от операционной системы, на которой работает браузер, например, MacOS: `Command` и Windows: `Control`.
WebdriverIO предоставляет кроссбраузерную клавишу-модификатор управления, называемую `Ctrl` (см. пример ниже).

:::

##### Использование

```js
browser.keys(value)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Подробности</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>Последовательность клавиш для ввода. Должен быть предоставлен массив или строка.</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```