---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

Команда Get Element Property поверне результат отримання властивості елемента.

##### Використання

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>назва властивості елемента</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Повертає

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** значення властивості вибраного елемента