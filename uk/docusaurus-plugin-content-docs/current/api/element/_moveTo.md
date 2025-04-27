---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Переміщення миші на вказаний відступ відносно вказаного елемента. Якщо елемент не вказано,
рух відбувається відносно поточного положення курсора миші. Якщо елемент вказано, але
відступ не вказано, миша буде переміщена до центру елемента. Якщо елемент
не видимий, він буде прокручений у видиму область.

##### Використання

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`MoveToOptions`</td>
      <td>параметри команди moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>Відступ X для переміщення відносно центру елемента. Якщо не вказано, миша переміститься в центр елемента.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>Відступ Y для переміщення відносно центру елемента. Якщо не вказано, миша переміститься в центр елемента.</td>
    </tr>
  </tbody>
</table>