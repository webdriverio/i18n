---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
Команда `executeAsync` застаріла і буде видалена в майбутніх версіях.
Будь ласка, використовуйте команду `execute` замість неї, оскільки вона забезпечує кращу підтримку
обробки помилок через `async`/`await`.
:::

Вводить фрагмент JavaScript у сторінку для виконання в контексті поточно вибраного
фрейма, використовуючи даний елемент як область видимості. Оскільки це виконується в області елемента, це означає, що WebdriverIO 
автоматично чекатиме, поки елемент буде існувати, перш ніж виконувати скрипт.
Припускається, що виконаний скрипт є асинхронним і має сигналізувати про завершення, викликаючи
наданий зворотний виклик, який завжди надається як останній аргумент функції. Значення
цього зворотного виклику буде повернуто клієнту.

Команди асинхронних скриптів не можуть охоплювати завантаження сторінок. Якщо подія вивантаження викликається під час очікування
результату скрипта, клієнту повинна бути повернута помилка.

Аргумент скрипту визначає скрипт для виконання у формі тіла функції. Функція буде
викликана з наданим масивом аргументів, і значення можуть бути доступні через об'єкт arguments
у вказаному порядку. Останнім аргументом завжди буде функція зворотного виклику, яка має бути викликана
для сигналізації про завершення скрипта.

Аргументи можуть бути будь-яким JSON-примітивом, масивом або JSON-об'єктом. JSON-об'єкти, які визначають посилання WebElement,
будуть перетворені на відповідний DOM-елемент. Аналогічно, будь-які WebElements в результаті скрипта
будуть повернуті клієнту як JSON-об'єкти WebElement.

:::caution

Будь ласка, використовуйте `execute` замість цього
:::

##### Використання

```js
$(selector).executeAsync(script, arguments)
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
      <td>аргументи скрипта</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="executeAsync.js"
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Повертає

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Результат скрипта.