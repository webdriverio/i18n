---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Предупреждение об устаревании

Команда `touchAction` __устарела__ и будет удалена в будущих версиях.
Мы рекомендуем использовать вместо неё команду [`action`](/docs/api/browser/action) с
типом указателя `touch`, например:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

API Touch Action предоставляет основу для всех жестов, которые можно автоматизировать в Appium.
В настоящее время оно доступно только для нативных приложений и не может использоваться для взаимодействия с веб-приложениями.
В его основе лежит возможность объединять в цепочку _специальные_ отдельные действия, которые затем будут
применены к элементу приложения на устройстве. Основные действия, которые можно использовать:

- press (передать элемент или (x,y) или оба)
- longPress (передать элемент или (x,y) или оба)
- tap (передать элемент или (x,y) или оба)
- moveTo (передать абсолютные координаты x,y)
- wait (передать ms (в миллисекундах))
- release (без аргументов)

##### Использование

```js
$(selector).touchAction(action)
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
    await screen.touchAction('tap');

    // simple touch action using selector and x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await screen.touchAction({
        action: 'tap', x: 30, y:20
    })

    // multi action on an element (drag&drop)
    await screen.touchAction([
        'press',
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])

    // drag&drop to element
    const otherElement = await $('//UIAApplication[1]/UIAElement[2]')
    await screen.touchAction([
        'press',
        { action: 'moveTo', element: otherElement },
        'release'
    ])
});
```