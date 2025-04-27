---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution Попередження про застарілість

Команда `touchAction` є __застарілою__ і буде видалена в майбутніх версіях.
Ми рекомендуємо натомість використовувати команду [`action`](/docs/api/browser/action) з 
типом вказівника `touch`, наприклад:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

Touch Action API забезпечує основу всіх жестів, які можна автоматизувати в Appium.
Наразі вона доступна лише для нативних додатків і не може використовуватися для взаємодії з веб-додатками.
Її основою є можливість об'єднувати в ланцюжок _ad hoc_ окремі дії, які потім будуть
застосовані до елемента в додатку на пристрої. Основні дії, які можна використовувати:

- press (передати елемент або (`x`, `y`) або обидва)
- longPress (передати елемент або (`x`, `y`) або обидва)
- tap (передати елемент або (`x`, `y`) або обидва)
- moveTo (передати абсолютні координати `x`, `y`)
- wait (передати `ms` (як мілісекунди))
- release (без аргументів)

##### Використання

```js
browser.touchAction(action)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Ім'я</th><th>Тип</th><th>Деталі</th>
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