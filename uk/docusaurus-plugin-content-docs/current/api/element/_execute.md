---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Вставляє фрагмент JavaScript на сторінку для виконання в контексті поточно вибраного 
фрейму, використовуючи заданий елемент як область видимості. Оскільки він знаходиться в області елемента, це означає, що WebdriverIO 
автоматично чекатиме існування елемента перед виконанням скрипта.
Виконуваний скрипт вважається синхронним, і результат оцінки скрипта повертається 
клієнту.

Аргумент скрипта визначає скрипт для виконання у формі тіла функції. Значення, повернуте 
цією функцією, буде повернуто клієнту. Функція буде викликана з наданим масивом args, 
і до значень можна отримати доступ через об'єкт arguments у вказаному порядку.

Аргументи можуть бути будь-яким JSON-примітивом, масивом або об'єктом JSON. Об'єкти JSON, які визначають 
посилання на WebElement, будуть перетворені у відповідний DOM-елемент. Так само, будь-які WebElements в результаті 
скрипта будуть повернуті клієнту як об'єкти JSON WebElement.

##### Використання

```js
$(selector).execute(script, arguments)
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
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`*`</td>
      <td>аргументи скрипта</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Повертає

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Результат скрипта.