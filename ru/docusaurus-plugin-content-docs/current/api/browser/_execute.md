---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Внедряет фрагмент JavaScript в страницу для выполнения в контексте текущего выбранного фрейма.
Выполняемый скрипт считается синхронным, и результат выполнения скрипта возвращается
клиенту.

Аргумент скрипта определяет скрипт для выполнения в форме тела функции. Значение, возвращаемое 
этой функцией, будет возвращено клиенту. Функция будет вызвана с предоставленным массивом args, 
и значения можно получить через объект arguments в указанном порядке.

Аргументы могут быть любыми JSON-примитивами, массивами или JSON-объектами. JSON-объекты, которые определяют 
ссылку WebElement, будут преобразованы в соответствующий DOM-элемент. Аналогично, любые WebElements в результате 
скрипта будут возвращены клиенту как JSON-объекты WebElement.

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
      <td>Скрипт для выполнения.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`*`</td>
      <td>аргументы скрипта</td>
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
            **<code><var>return</var></code>:**              Результат выполнения скрипта.