---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
Команда `executeAsync` устарела и будет удалена в будущих версиях.
Пожалуйста, используйте команду `execute`, так как она обеспечивает лучшую поддержку
обработки ошибок через `async`/`await`.
:::

Внедряет фрагмент JavaScript в страницу для выполнения в контексте текущего выбранного
фрейма, используя данный элемент как область видимости. Поскольку это происходит в области видимости элемента, это означает, что WebdriverIO 
автоматически будет ждать, пока элемент не появится, прежде чем выполнить скрипт.
Предполагается, что выполняемый скрипт асинхронный и должен сигнализировать о завершении путем вызова
предоставленного обратного вызова, который всегда предоставляется как последний аргумент функции. Значение,
переданное этому обратному вызову, будет возвращено клиенту.

Команды асинхронного скрипта не могут охватывать загрузки страниц. Если событие выгрузки срабатывает во время ожидания
результата скрипта, клиенту должна быть возвращена ошибка.

Аргумент script определяет скрипт для выполнения в форме тела функции. Функция будет
вызвана с предоставленным массивом args, и значения могут быть доступны через объект arguments
в указанном порядке. Последним аргументом всегда будет функция обратного вызова, которая должна быть вызвана
для сигнализации о завершении скрипта.

Аргументы могут быть любыми JSON-примитивами, массивами или JSON-объектами. JSON-объекты, определяющие ссылку WebElement,
будут преобразованы в соответствующий DOM-элемент. Точно так же любые WebElements в результате
скрипта будут возвращены клиенту как JSON-объекты WebElement.

:::caution

Пожалуйста, используйте вместо этого `execute`
:::

##### Использование

```js
$(selector).executeAsync(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Скрипт для выполнения.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`*`</td>
      <td>аргументы скрипта</td>
    </tr>
  </tbody>
</table>

##### Пример

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

##### Возвращает

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Результат скрипта.