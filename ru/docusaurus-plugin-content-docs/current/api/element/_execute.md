---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Вставляет фрагмент JavaScript в страницу для выполнения в контексте текущего выбранного
фрейма, используя данный элемент как область видимости. Поскольку это выполняется в области видимости элемента, WebdriverIO
автоматически дождется существования элемента перед выполнением скрипта.
Предполагается, что выполняемый скрипт синхронный, и результат выполнения скрипта возвращается
клиенту.

Аргумент script определяет скрипт для выполнения в форме тела функции. Значение, возвращаемое
этой функцией, будет возвращено клиенту. Функция будет вызвана с предоставленным массивом args,
и значения могут быть доступны через объект arguments в указанном порядке.

Аргументы могут быть любыми JSON-примитивами, массивами или JSON-объектами. JSON-объекты, которые определяют
ссылку на WebElement, будут преобразованы в соответствующий DOM-элемент. Аналогично, любые WebElements в результате
скрипта будут возвращены клиенту как JSON-объекты WebElement.

##### Usage

```js
$(selector).execute(script, arguments)
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
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Результат выполнения скрипта.