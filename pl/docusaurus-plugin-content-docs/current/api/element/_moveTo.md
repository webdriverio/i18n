---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Przesuń kursor myszy o podany offset względem określonego elementu. Jeśli żaden element nie jest określony,
ruch jest względny do aktualnej pozycji kursora myszy. Jeśli element jest podany, ale
nie określono offsetu, kursor myszy zostanie przesunięty na środek elementu. Jeśli element
nie jest widoczny, zostanie przewinięty do widoku.

##### Użycie

```js
$(selector).moveTo({ xOffset, yOffset })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`MoveToOptions`</td>
      <td>opcje komendy moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number`</td>
      <td>Offset X, do którego należy się przesunąć, względem środka elementu. Jeśli nie jest określony, kursor myszy przesunie się na środek elementu.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number`</td>
      <td>Offset Y, do którego należy się przesunąć, względem środka elementu. Jeśli nie jest określony, kursor myszy przesunie się na środek elementu.</td>
    </tr>
  </tbody>
</table>