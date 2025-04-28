---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Flytta musen med en förskjutning av det angivna elementet. Om inget element anges
är förflyttningen relativ till den aktuella muspekaren. Om ett element tillhandahålls men
ingen förskjutning anges, kommer musen att flyttas till elementets mitt. Om elementet
inte är synligt kommer det att rullas fram så att det blir synligt.

##### Användning

```js
$(selector).moveTo({ xOffset, yOffset })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`MoveToOptions`</td>
      <td>moveTo-kommandalternativ</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>X-förskjutning att flytta till, relativt till elementets mitt. Om det inte anges kommer musen att flyttas till elementets mitt.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>Y-förskjutning att flytta till, relativt till elementets mitt. Om det inte anges kommer musen att flyttas till elementets mitt.</td>
    </tr>
  </tbody>
</table>