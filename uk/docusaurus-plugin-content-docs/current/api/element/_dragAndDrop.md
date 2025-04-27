---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

Перетягнути елемент до цільового елемента або позиції.

:::info

Функціональність цієї команди сильно залежить від способу реалізації перетягування у вашому додатку. Якщо у вас виникають проблеми, будь ласка, опублікуйте ваш приклад 
в [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

:::

##### Використання

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>цільовий елемент або об'єкт з властивостями x та y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`DragAndDropOptions`</td>
      <td>параметри команди dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`Number`</td>
      <td>як довго має тривати перетягування</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```