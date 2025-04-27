---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

Команда Get Element Property вернет результат получения свойства элемента.

##### Использование

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>имя свойства элемента</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Возвращает

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** значение свойства выбранного элемента