---
id: dragAndDrop
title: перетягування
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

Перетягнути елемент до цільового елемента або позиції.

:::info

Функціональність цієї команди сильно залежить від способу реалізації перетягування у вашому додатку. Якщо у вас виникають проблеми, будь ласка, опублікуйте ваш приклад у [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

Також переконайтесь, що елемент, який ви перетягуєте, та ціль, куди ви перетягуєте, обидва видимі на екрані.

Ця команда працює лише з наступними актуальними компонентами:
 - Appium server (версія 2.0.0 або вище)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Переконайтеся, що ваше локальне або хмарне середовище Appium регулярно оновлюється, щоб уникнути проблем із сумісністю.

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`DragAndDropOptions`</td>
      <td>опції команди dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>тривалість перетягування</td>
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