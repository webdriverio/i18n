---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Перемещение мыши на указанное смещение относительно указанного элемента. Если элемент не указан,
перемещение выполняется относительно текущего положения курсора мыши. Если элемент указан, но
смещение не задано, мышь будет перемещена в центр элемента. Если элемент
не виден, он будет прокручен в зону видимости.

##### Usage

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MoveToOptions`</td>
      <td>Опции команды moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Смещение по оси X, относительно центра элемента. Если не указано, мышь будет перемещена в центр элемента.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Смещение по оси Y, относительно центра элемента. Если не указано, мышь будет перемещена в центр элемента.</td>
    </tr>
  </tbody>
</table>