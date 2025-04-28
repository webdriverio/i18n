---
id: emulate
title: emulate
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO ti permette di emulare le API Web utilizzando il comando `emulate`. Queste API Web possono poi comportarsi esattamente come specifichi. Sono supportati i seguenti ambiti:

- `geolocation`: Emula l'API di geolocalizzazione
- `userAgent`: Emula l'user agent
- `colorScheme`: Emula lo schema di colori
- `onLine`: Emula lo stato online
- `device`: Emula un dispositivo mobile o desktop specifico
- `clock`: Emula l'orologio di sistema

Il comando `emulate` restituisce una funzione che può essere chiamata per reimpostare l'emulazione. Questo è utile quando vuoi reimpostare l'emulazione dopo un test o una serie di test.

Leggi di più su questo nelle linee guida [Emulation](/docs/emulation).

:::info

Ad eccezione dell'ambito `clock`, non è possibile modificare il valore emulato senza ricaricare la pagina.

:::

:::info

Questa funzionalità richiede il supporto WebDriver Bidi per il browser. Mentre le versioni recenti di Chrome, Edge e Firefox hanno tale supporto, Safari __non ce l'ha__. Per gli aggiornamenti, segui [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
Inoltre, se utilizzi un fornitore cloud per avviare i browser, assicurati che il tuo fornitore supporti anche WebDriver Bidi.

:::

L'oggetto `EmulationOptions` può avere le seguenti proprietà in base all'ambito:

| Ambito        | Opzioni                                          |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### Utilizzo

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>funzionalità del browser che desideri emulare, può essere `clock`, `geolocation`, `userAgent`, `colorScheme` o `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>opzioni di emulazione per l'ambito specifico</td>
    </tr>
  </tbody>
</table>

##### Esempi

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### Restituisce

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   una funzione per reimpostare l'emulazione