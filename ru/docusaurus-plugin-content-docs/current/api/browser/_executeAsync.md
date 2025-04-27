---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
Команда `executeAsync` устарела и будет удалена в будущих версиях.
Пожалуйста, используйте команду `execute`, так как она обеспечивает лучшую поддержку
обработки ошибок через `async`/`await`.
:::

Вставляет фрагмент JavaScript на страницу для выполнения в контексте текущего выбранного
фрейма. Предполагается, что выполняемый скрипт является асинхронным и должен сигнализировать о завершении вызовом
предоставленного обратного вызова, который всегда предоставляется в качестве последнего аргумента функции. Значение
для этого обратного вызова будет возвращено клиенту.

Асинхронные команды скрипта не могут охватывать загрузки страниц. Если событие выгрузки запускается во время ожидания
результата скрипта, клиенту должна быть возвращена ошибка.

Аргумент script определяет скрипт для выполнения в форме тела функции. Функция будет
вызвана с предоставленным массивом args, и значения могут быть доступны через объект arguments
в указанном порядке. Последним аргументом всегда будет функция обратного вызова, которая должна быть вызвана
для сигнализации о том, что скрипт завершился.

Аргументы могут быть любыми JSON-примитивами, массивами или JSON-объектами. JSON-объекты, определяющие ссылку WebElement,
будут преобразованы в соответствующий DOM-элемент. Аналогично, любые WebElements в результате
скрипта будут возвращены клиенту как JSON-объекты WebElement.

:::caution

Пожалуйста, используйте вместо этого `execute`
:::

##### Использование

```js
browser.executeAsync(script, arguments)
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

##### Возвращает

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Результат скрипта.