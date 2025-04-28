---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

Vänta på att ett element ska vara stabilt (inte animerat) under den angivna tiden i millisekunder. Returnerar sant om väljaren matchar minst ett element som är stabilt i DOM:en, annars genereras ett fel. Om reverse-flaggan är satt till true, kommer kommandot istället att returnera sant om väljaren inte matchar några stabila element.

__Obs:__ det är bäst att inaktivera animationer istället för att använda detta kommando

##### Användning

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfritt</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForStable alternativ (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">valfritt</span></td>
      <td>`Number`</td>
      <td>tid i ms (standard baserat på [`waitforTimeout`](/docs/configuration#waitfortimeout) konfigurationsvärde)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">valfritt</span></td>
      <td>`Boolean`</td>
      <td>om true väntar den på motsatsen (standard: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">valfritt</span></td>
      <td>`String`</td>
      <td>om den finns åsidosätter den standardfelmeddelandet</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">valfritt</span></td>
      <td>`Number`</td>
      <td>intervall mellan kontroller (standard: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Exempel

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true om elementet är stabilt