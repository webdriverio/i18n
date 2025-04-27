---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
Команда `executeAsync` застаріла і буде видалена в майбутніх версіях.
Будь ласка, використовуйте команду `execute`, оскільки вона забезпечує кращу підтримку
обробки помилок через `async`/`await`.
:::

Вставляє фрагмент JavaScript в сторінку для виконання в контексті поточно вибраного
фрейму. Виконаний скрипт вважається асинхронним і повинен сигналізувати про завершення шляхом виклику
наданого зворотного виклику, який завжди надається як останній аргумент функції. Значення
для цього зворотного виклику буде повернуто клієнту.

Команди асинхронного скрипту не можуть охоплювати завантаження сторінок. Якщо під час очікування
результату скрипту відбувається подія вивантаження, клієнту має бути повернута помилка.

Аргумент скрипту визначає скрипт для виконання у формі тіла функції. Функція буде
викликана з наданим масивом аргументів, і значення можна отримати через об'єкт arguments
у зазначеному порядку. Останнім аргументом завжди буде функція зворотного виклику, яку потрібно викликати,
щоб сигналізувати про завершення скрипту.

Аргументи можуть бути будь-яким JSON-примітивом, масивом або JSON-об'єктом. JSON-об'єкти, які визначають посилання WebElement,
будуть перетворені на відповідний DOM-елемент. Так само, будь-які WebElements у результаті скрипту
будуть повернуті клієнту як JSON-об'єкти WebElement.

:::caution

Будь ласка, використовуйте `execute` замість цього
:::

##### Використання

```js
browser.executeAsync(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Скрипт для виконання.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`*`</td>
      <td>аргументи скрипту</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Повертає

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Результат скрипту.