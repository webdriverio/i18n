Here's the translated version of the Markdown content from English to German:

---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

Wartet auf ein Element für die angegebene Anzahl von
Millisekunden, bis es stabil ist (sich nicht bewegt). Gibt true zurück, wenn der Selektor
mindestens ein Element im DOM findet, das stabil ist, andernfalls wird ein
Fehler ausgegeben. Wenn das reverse-Flag auf true gesetzt ist, gibt der Befehl stattdessen true zurück,
wenn der Selektor keine stabilen Elemente findet.

__Hinweis:__ Es ist besser, Animationen zu deaktivieren, anstatt diesen Befehl zu verwenden

##### Verwendung

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForStable Optionen (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Zeit in ms (Standardwert basiert auf dem [`waitforTimeout`](/docs/configuration#waitfortimeout) Konfigurationswert)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>wenn true, wartet es auf das Gegenteil (Standard: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>wenn vorhanden, überschreibt es die Standard-Fehlermeldung</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Intervall zwischen den Prüfungen (Standard: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Beispiele

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

##### Rückgabewert

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true wenn Element stabil ist