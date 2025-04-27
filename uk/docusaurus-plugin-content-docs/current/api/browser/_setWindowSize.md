---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Змінює зовнішній розмір вікна браузера відповідно до вказаної ширини та висоти. Залежно від вашої
операційної системи деякі вікна браузера можуть не дозволяти вам мати ширину меншу за `500px`. Якщо ви хочете
імітувати область перегляду, наприклад, iPhone, вам слід розглянути використання команди `setViewport`.

##### Usage

```js
browser.setWindowSize(width, height)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>браузер буде змінено до вказаної ширини</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>браузер буде змінено до вказаної висоти</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null для браузерів без підтримки W3C та Об'єкт `{x, y, width, height}` для браузерів з підтримкою W3C    