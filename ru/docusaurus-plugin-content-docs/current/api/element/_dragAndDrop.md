---
id: dragAndDrop
title: dragAndDrop (перетаскивание)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

Перетаскивание элемента к целевому элементу или позиции.

:::info

Функциональность этой команды сильно зависит от того, как реализовано перетаскивание в вашем приложении. Если у вас возникают проблемы, пожалуйста, опубликуйте свой пример в [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

:::

##### Использование

```js
$(selector).dragAndDrop(target, { duration })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>целевой элемент или объект со свойствами x и y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`DragAndDropOptions`</td>
      <td>параметры команды dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Number`</td>
      <td>продолжительность перетаскивания</td>
    </tr>
  </tbody>
</table>

##### Пример

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