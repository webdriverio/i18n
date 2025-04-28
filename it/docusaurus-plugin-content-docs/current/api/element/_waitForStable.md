---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

Attendi che un elemento sia stabile (non in animazione) per il numero di millisecondi fornito. Restituisce true se il selettore corrisponde ad almeno un elemento stabile nel DOM, altrimenti genera un errore. Se il flag reverse è true, il comando restituirà invece true se il selettore non corrisponde a nessun elemento stabile.

__Nota:__ è meglio disabilitare le animazioni invece di utilizzare questo comando

##### Utilizzo

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`WaitForOptions`</td>
      <td>opzioni waitForStable (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>tempo in ms (predefinito basato sul valore di configurazione [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>se true attende l'opposto (predefinito: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>se esiste sovrascrive il messaggio di errore predefinito</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>intervallo tra i controlli (predefinito: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Esempi

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

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true se l'elemento è stabile