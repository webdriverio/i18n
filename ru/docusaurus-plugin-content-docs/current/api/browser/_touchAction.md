---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution Предупреждение об устаревании

Команда `touchAction` является __устаревшей__ и будет удалена в будущей версии.
Мы рекомендуем использовать вместо нее команду [`action`](/docs/api/browser/action) с
типом указателя `touch`, например:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

API сенсорных действий предоставляет основу для всех жестов, которые можно автоматизировать в Appium.
В настоящее время он доступен только для нативных приложений и не может использоваться для взаимодействия с веб-приложениями.
В его основе лежит возможность объединять в цепочку _специальные_ отдельные действия, которые затем будут
применены к элементу в приложении на устройстве. Основные действия, которые можно использовать:

- press (передайте элемент или (`x`, `y`) или оба)
- longPress (передайте элемент или (`x`, `y`) или оба)
- tap (передайте элемент или (`x`, `y`) или оба)
- moveTo (передайте абсолютные координаты `x`, `y`)
- wait (передайте `ms` (в миллисекундах))
- release (без аргументов)

##### Использование

```js
browser.touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>действие для выполнения</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await browser.touchAction({
        action: 'tap',
        element: screen
    });

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the viewport
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20
    })

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20,
        element: screen
    })

    // multi action on an element
    // drag&drop from position 200x200 down 100px on the screen
    await browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])
});
```