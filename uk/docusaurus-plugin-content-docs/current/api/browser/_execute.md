---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Вставляє фрагмент JavaScript на сторінку для виконання в контексті поточного обраного фрейму.
Передбачається, що виконуваний скрипт є синхронним, і результат оцінки скрипта повертається 
клієнту.

Аргумент script визначає скрипт для виконання у формі тіла функції. Значення, яке повертається цією 
функцією, буде повернуто клієнту. Функція буде викликана з наданим масивом args, 
і до значень можна отримати доступ через об'єкт arguments у вказаному порядку.

Аргументи можуть бути будь-яким JSON-примітивом, масивом або JSON-об'єктом. JSON-об'єкти, які визначають 
посилання WebElement, будуть перетворені у відповідний DOM-елемент. Так само, будь-які WebElements у результаті 
скрипта будуть повернуті клієнту як JSON-об'єкти WebElement.

##### Usage

```js
browser.execute(script, arguments)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Скрипт для виконання.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`*`</td>
      <td>аргументи скрипта</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Результат скрипта.