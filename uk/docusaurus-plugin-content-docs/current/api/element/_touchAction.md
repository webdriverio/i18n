---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Попередження про застарілість

Команда `touchAction` __застаріла__ і буде видалена в майбутній версії.
Ми рекомендуємо натомість використовувати команду [`action`](/docs/api/browser/action) з 
типом вказівника `touch`, наприклад:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

API сенсорних дій (Touch Action) надає основу для всіх жестів, які можна автоматизувати в Appium.
На даний момент воно доступне лише для нативних додатків і не може бути використане для взаємодії з веб-додатками.
В його основі лежить можливість об'єднувати разом _ad hoc_ окремі дії, які потім будуть
застосовані до елемента в додатку на пристрої. Основні дії, які можна використовувати:

- press (передати елемент або (x,y) або обидва)
- longPress (передати елемент або (x,y) або обидва)
- tap (передати елемент або (x,y) або обидва)
- moveTo (передати абсолютні координати x,y)
- wait (передати мс (у мілісекундах))
- release (без аргументів)

##### Використання

```js
$(selector).touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>дія для виконання</td>
    </tr>
  </tbody>
</table>

##### Приклад

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