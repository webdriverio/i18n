---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Изменяет внешний размер окна браузера в соответствии с указанной шириной и высотой. В зависимости от вашей операционной системы некоторые окна браузера могут не позволять иметь ширину меньше `500px`. Если вы хотите имитировать область просмотра, например, iPhone, вам следует рассмотреть возможность использования команды `setViewport`.

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
      <td>браузер будет изменен до указанной ширины</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>браузер будет изменен до указанной высоты</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null для браузеров без поддержки W3C и объект `{x, y, width, height}` для браузеров с поддержкой W3C