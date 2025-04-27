---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

Ця команда очікування є вашою універсальною зброєю, якщо ви хочете на щось почекати. Вона очікує умову і чекає, поки ця умова не буде виконана, повертаючи істинне значення.

Поширеним прикладом є очікування, доки певний елемент не міститиме певний текст (див. приклад).

##### Використання

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>умова, на яку чекати, поки не повернеться істинне значення</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`WaitUntilOptions`</td>
      <td>опції команди</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>час у мс (за замовчуванням встановлюється на основі значення конфігурації [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`String`</td>
      <td>повідомлення про помилку, яке видається, коли waitUntil перевищує час очікування</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>інтервал між перевірками умови (за замовчуванням встановлюється на основі значення конфігурації [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Приклади

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** true, якщо умова виконана