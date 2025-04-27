---
id: getSize
title: получитьРазмер
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Получить ширину и высоту для DOM-элемента.

##### Использование

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`String`</td>
      <td>размер для получения [опционально] ("width" или "height")</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="getSize.js"
it('should demonstrate the getSize command', async () => {
    await browser.url('http://github.com')
    const logo = await $('.octicon-mark-github')

    const size = await logo.getSize()
    console.log(size) // outputs: { width: 32, height: 32 }

    const width = await logo.getSize('width')
    console.log(width) // outputs: 32

    const height = await logo.getSize('height')
    console.log(height) // outputs: 32
})
```

##### Возвращает

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     запрошенный размер элемента (`{ width: <Number>, height: <Number> }`) или фактическую ширину/высоту как число, если задан параметр prop