---
id: dragAndDrop
title: перетаскивание
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

Перетаскивание элемента в целевой элемент или позицию.

:::info

Функциональность этой команды сильно зависит от способа реализации перетаскивания в вашем приложении. Если у вас возникают проблемы, пожалуйста, оставьте ваш пример в [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

Также убедитесь, что элемент, который вы перетаскиваете, и цель, куда вы его перетаскиваете, оба отображаются на экране.

Эта команда работает только со следующими актуальными компонентами:
 - Appium server (версия 2.0.0 или выше)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Убедитесь, что ваша локальная или облачная среда Appium регулярно обновляется, чтобы избежать проблем совместимости.

:::

##### Использование

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>целевой элемент или объект с координатами x и y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`DragAndDropOptions`</td>
      <td>параметры команды dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">опционально</span></td>
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