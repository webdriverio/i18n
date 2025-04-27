---
id: getSize
title: отримати розмір
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Отримати ширину і висоту DOM-елемента.

##### Використання

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`String`</td>
      <td>розмір для отримання [необов'язковий] ("width" або "height")</td>
    </tr>
  </tbody>
</table>

##### Приклад

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

##### Повертає

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     запитаний розмір елемента (`{ width: <Number>, height: <Number> }`) або фактичну ширину/висоту як число, якщо вказано параметр prop