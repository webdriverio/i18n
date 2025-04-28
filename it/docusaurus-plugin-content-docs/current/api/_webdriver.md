---
id: webdriver
title: Protocollo WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
Il comando New Session crea una nuova sessione WebDriver con il nodo endpoint. Se la creazione fallisce, viene restituito un errore di sessione non creata.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-new-sessions).

##### Utilizzo

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>un oggetto JSON, l'insieme di capabilities che è stato ultimamente unito e abbinato nell'algoritmo di elaborazione delle capabilities</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** Oggetto contenente sessionId e capabilities della sessione WebDriver creata.


---

## deleteSession
Il comando Delete Session chiude qualsiasi contesto di navigazione di livello superiore associato alla sessione corrente, termina la connessione e infine chiude la sessione corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-delete-session).

##### Utilizzo

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>object</td>
      <td>Oggetto contenente opzioni per il comando deleteSession, ad es. `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
Il comando Status restituisce informazioni sul fatto che un endpoint remoto sia in uno stato in cui può creare nuove sessioni e può inoltre includere meta-informazioni arbitrarie specifiche dell'implementazione.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-status).

##### Utilizzo

```js
browser.status()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** Oggetto contenente lo stato del driver.


---

## getTimeouts
Il comando Get Timeouts ottiene le durate di timeout associate alla sessione corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-timeouts).

##### Utilizzo

```js
browser.getTimeouts()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** Oggetto contenente la durata dei timeout per `script`, `pageLoad` e timeout `implicit`.


---

## setTimeouts
Il comando Set Timeouts imposta le durate di timeout associate alla sessione corrente. I timeout che possono essere controllati sono elencati nella tabella dei timeout di sessione qui sotto.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-set-timeouts).

##### Utilizzo

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>intero in ms per il timeout implicito della sessione</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>intero in ms per il timeout di caricamento della pagina della sessione</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>intero in ms per il timeout di script della sessione</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
Il comando Get Current URL restituisce l'URL del contesto di navigazione di livello superiore corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-current-url).

##### Utilizzo

```js
browser.getUrl()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>url</var></code>:** URL del documento attivo del contesto di navigazione di livello superiore corrente


---

## navigateTo
Il comando navigateTo (go) viene utilizzato per far navigare l'agente utente nel contesto di navigazione di livello superiore corrente verso una nuova posizione.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [url](/docs/api/browser/url). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>stringa che rappresenta un URL assoluto (che inizia con http(s)), possibilmente incluso un frammento (#...), potrebbe anche essere uno schema locale (about: ecc.)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
Il comando Back fa sì che il browser si sposti di un passo indietro nella cronologia della sessione congiunta del contesto di navigazione di livello superiore corrente. Questo è equivalente a premere il pulsante indietro nel chrome del browser o a chiamare `window.history.back`.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-back).

##### Utilizzo

```js
browser.back()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
Il comando Forward fa sì che il browser si sposti di un passo avanti nella cronologia della sessione congiunta del contesto di navigazione di livello superiore corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-forward).

##### Utilizzo

```js
browser.forward()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
Il comando Refresh fa sì che il browser ricarichi la pagina nel contesto di navigazione di livello superiore corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-refresh).

##### Utilizzo

```js
browser.refresh()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
Il comando Get Title restituisce il titolo del documento del contesto di navigazione di livello superiore corrente, equivalente a chiamare `document.title`.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-title).

##### Utilizzo

```js
browser.getTitle()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>title</var></code>:** Restituisce una stringa uguale a `document.title` del contesto di navigazione di livello superiore corrente.


---

## getWindowHandle
Il comando Get Window Handle restituisce l'handle della finestra per il contesto di navigazione di livello superiore corrente. Può essere utilizzato come argomento per Switch To Window.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-window-handle).

##### Utilizzo

```js
browser.getWindowHandle()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** Restituisce una stringa che è l'handle della finestra per il contesto di navigazione di livello superiore corrente.


---

## closeWindow
Il comando Close Window chiude il contesto di navigazione di livello superiore corrente. Una volta fatto, se non ci sono più contesti di navigazione di livello superiore aperti, la sessione WebDriver stessa viene chiusa.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-close-window).

##### Utilizzo

```js
browser.closeWindow()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
Il comando Switch To Window viene utilizzato per selezionare il contesto di navigazione di livello superiore corrente per la sessione corrente, cioè quello che verrà utilizzato per l'elaborazione dei comandi.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [switchWindow](/docs/api/browser/switchWindow). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>una stringa che rappresenta un handle di finestra, dovrebbe essere una delle stringhe restituite in una chiamata a getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
Crea un nuovo contesto di navigazione di livello superiore.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#new-window).

##### Utilizzo

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>Impostato a 'tab' se la finestra appena creata condivide una finestra a livello di sistema operativo con il contesto di navigazione corrente, o 'window' altrimenti.</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** Nuovo oggetto finestra contenente 'handle' con il valore dell'handle e 'type' con il valore del tipo di finestra creata


---

## getWindowHandles
Il comando Get Window Handles restituisce un elenco di handle di finestra per ogni contesto di navigazione di livello superiore aperto. L'ordine in cui vengono restituiti gli handle delle finestre è arbitrario.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-window-handles).

##### Utilizzo

```js
browser.getWindowHandles()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### Restituisce

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** Un array che è un elenco di handle di finestre.


---

## printPage
Il comando Print Page rende il documento in un documento PDF impaginato. __Nota:__ Chrome attualmente supporta questo solo in [modalità headless](https://webdriver.io/docs/capabilities/#run-browser-headless), vedi [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#print-page).

##### Utilizzo

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>orientamento della pagina. Predefinito: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>scala della pagina. Predefinito: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>sfondo della pagina. Predefinito: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>larghezza della pagina in cm. Predefinito: `21.59` dalla pagina</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>altezza della pagina in cm. Predefinito: `27.94` dalla pagina</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>margine della pagina in cm dal margine superiore. Predefinito: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>margine della pagina in cm dal margine inferiore. Predefinito: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>margine della pagina in cm dal margine sinistro. Predefinito: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>margine della pagina in cm dal margine destro. Predefinito: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>ridurre il pdf per adattarlo alla pagina. Predefinito: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>object[]</td>
      <td>intervalli di pagine. Predefinito `[]`</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** La rappresentazione PDF codificata in base64 del documento impaginato.


---

## switchToFrame
Il comando Switch To Frame viene utilizzato per selezionare il contesto di navigazione di livello superiore corrente o un contesto di navigazione figlio del contesto di navigazione corrente da utilizzare come contesto di navigazione corrente per i comandi successivi.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

Questo comando di protocollo è deprecato<br />Questo comando è deprecato e incoraggiamo tutti a utilizzare `switchFrame` per passare ai frame. Maggiori informazioni su questo comando sono disponibili su https://webdriver.io/docs/api/browser/switchFrame.
:::

##### Utilizzo

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>uno di tre possibili tipi: null: rappresenta il contesto di navigazione di livello superiore (cioè, non un iframe), un Numero, che rappresenta l'indice dell'oggetto finestra corrispondente a un frame, un oggetto Element ricevuto usando `findElement`.</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
Il comando Switch to Parent Frame imposta il contesto di navigazione corrente per i comandi futuri al genitore del contesto di navigazione corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).

##### Utilizzo

```js
browser.switchToParentFrame()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
Il comando Get Window Rect restituisce la dimensione e la posizione sullo schermo della finestra del sistema operativo corrispondente al contesto di navigazione di livello superiore corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [getWindowSize](/docs/api/browser/getWindowSize). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.getWindowRect()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una rappresentazione JSON di un oggetto "window rect". Ha 4 proprietà: `x`, `y`, `width` e `height`.


---

## setWindowRect
Il comando Set Window Rect modifica la dimensione e la posizione della finestra del sistema operativo corrispondente al contesto di navigazione di livello superiore corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [setWindowSize](/docs/api/browser/setWindowSize). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>l'attributo screenX dell'oggetto finestra</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>l'attributo screenY dell'oggetto finestra</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>la larghezza delle dimensioni esterne del contesto di navigazione di livello superiore, incluso chrome del browser ecc...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>l'altezza delle dimensioni esterne del contesto di navigazione di livello superiore, incluso chrome del browser ecc...</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una rappresentazione JSON di un oggetto "window rect" basata sul nuovo stato della finestra.


---

## maximizeWindow
Il comando Maximize Window invoca l'operazione specifica del gestore finestre "massimizza", se presente, sulla finestra che contiene il contesto di navigazione di livello superiore corrente. Questo tipicamente aumenta la finestra alla dimensione massima disponibile senza andare a schermo intero.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-maximize-window).

##### Utilizzo

```js
browser.maximizeWindow()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una rappresentazione JSON di un oggetto "window rect" basata sul nuovo stato della finestra.


---

## minimizeWindow
Il comando Minimize Window invoca l'operazione specifica del gestore finestre "minimizza", se presente, sulla finestra che contiene il contesto di navigazione di livello superiore corrente. Questo tipicamente nasconde la finestra nella barra delle applicazioni di sistema.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-minimize-window).

##### Utilizzo

```js
browser.minimizeWindow()
```


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una rappresentazione JSON di un oggetto "window rect" del (nuovo) contesto di navigazione di livello superiore corrente.


---

## fullscreenWindow
Il comando Fullscreen Window invoca l'operazione specifica del gestore finestre "schermo intero", se presente, sulla finestra che contiene il contesto di navigazione di livello superiore corrente. Questo tipicamente aumenta la finestra alla dimensione del display fisico e può nascondere elementi del chrome del browser come le barre degli strumenti.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-fullscreen-window).

##### Utilizzo

```js
browser.fullscreenWindow()
```


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una rappresentazione JSON di un oggetto "window rect" del (nuovo) contesto di navigazione di livello superiore corrente.


---

## findElement
Il comando Find Element viene utilizzato per trovare un elemento nel contesto di navigazione corrente che può essere utilizzato per comandi futuri. Questo comando restituisce una rappresentazione JSON dell'elemento che può essere passata al comando $ per trasformare il riferimento in un elemento WebdriverIO esteso.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [$](/docs/api/browser/$). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una strategia di localizzazione di elementi valida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>il selettore effettivo che verrà utilizzato per trovare un elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### Restituisce

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Una rappresentazione JSON di un oggetto elemento, ad es. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
Il comando Find Element From Shadow Root viene utilizzato per trovare un elemento all'interno dello shadow root di un elemento che può essere utilizzato per comandi futuri. Questo comando restituisce una rappresentazione JSON dell'elemento che può essere passata al comando $ per trasformare il riferimento in un elemento WebdriverIO esteso.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [shadow$](/docs/api/element/shadow$). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>id dell'elemento di un elemento shadow root</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una strategia di localizzazione di elementi valida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>il selettore effettivo che verrà utilizzato per trovare un elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### Restituisce

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Una rappresentazione JSON di un oggetto shadow elemento, ad es. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
Il comando Find Elements viene utilizzato per trovare elementi nel contesto di navigazione corrente che possono essere utilizzati per comandi futuri. Questo comando restituisce un array di rappresentazioni JSON degli elementi che possono essere passati al comando $ per trasformare il riferimento in un elemento WebdriverIO esteso (Vedi findElement).<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [$$](/docs/api/browser/$$). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una strategia di localizzazione di elementi valida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>il selettore effettivo che verrà utilizzato per trovare un elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### Restituisce

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Un elenco JSON (possibilmente vuoto) di rappresentazioni di un oggetto elemento, ad es. `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
Il comando Find Elements viene utilizzato per trovare elementi all'interno dello shadow root di un elemento che possono essere utilizzati per comandi futuri. Questo comando restituisce un array di rappresentazioni JSON degli elementi che possono essere passati al comando $ per trasformare il riferimento in un elemento WebdriverIO esteso (Vedi findElement).<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [shadow$$](/docs/api/element/shadow$$). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>id dell'elemento di un elemento shadow root</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una strategia di localizzazione di elementi valida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>il selettore effettivo che verrà utilizzato per trovare un elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### Restituisce

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Un elenco JSON (possibilmente vuoto) di rappresentazioni di un oggetto elemento, ad es. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
Il comando Find Element From Element viene utilizzato per trovare un elemento da un elemento web nel contesto di navigazione corrente che può essere utilizzato per comandi futuri. Questo comando restituisce una rappresentazione JSON dell'elemento che può essere passata al comando $ per trasformare il riferimento in un elemento WebdriverIO esteso (Vedi findElement).<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [$](/docs/api/element/$). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una strategia di localizzazione di elementi valida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>il selettore effettivo che verrà utilizzato per trovare un elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### Restituisce

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Una rappresentazione JSON di un oggetto elemento, ad es. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
Il comando Find Elements From Element viene utilizzato per trovare elementi da un elemento web nel contesto di navigazione corrente che possono essere utilizzati per comandi futuri. Questo comando restituisce un array di rappresentazioni JSON degli elementi che possono essere passati al comando $ per trasformare il riferimento in un elemento WebdriverIO esteso (Vedi findElement).<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [$$](/docs/api/element/$$). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una strategia di localizzazione di elementi valida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>il selettore effettivo che verrà utilizzato per trovare un elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### Restituisce

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Un elenco JSON (possibilmente vuoto) di rappresentazioni di un oggetto elemento, ad es. `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
Ottiene l'oggetto shadow root di un elemento. L'oggetto risultante può essere utilizzato per recuperare elementi all'interno di questo shadow root utilizzando ad esempio findElementFromShadowRoots o findElementsFromShadowRoots.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [shadow$](/docs/api/element/shadow$). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** Una rappresentazione JSON di uno shadow root elemento, ad es. `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
Get Active Element restituisce l'elemento attivo del documento elemento del contesto di navigazione corrente. Questo comando restituisce una rappresentazione JSON dell'elemento che può essere passata al comando $ per trasformare il riferimento in un elemento WebdriverIO esteso (Vedi findElement).<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-active-element).

##### Utilizzo

```js
browser.getActiveElement()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>element</var></code>:** Una rappresentazione JSON di un oggetto elemento, ad es. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
Is Element Selected determina se l'elemento referenziato è selezionato o meno. Questa operazione ha senso solo su elementi di input degli stati Checkbox e Radio Button, o elementi option.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [isSelected](/docs/api/element/isSelected). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` o `false` in base allo stato selezionato.


---

## isElementDisplayed
Is Element Displayed determina la visibilità di un elemento che è guidata da ciò che è percettivamente visibile all'occhio umano. In questo contesto, la visualizzazione di un elemento non è correlata alle proprietà di stile `visibility` o `display`.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#element-displayedness).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [isDisplayed](/docs/api/element/isDisplayed). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` o `false` in base allo stato visibile.


---

## getElementAttribute
Il comando Get Element Attribute restituirà l'attributo di un elemento web.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [getAttribute](/docs/api/element/getAttribute). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nome del valore dell'attributo da recuperare</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** L'attributo nominato dell'elemento.


---

## getElementProperty
Il comando Get Element Property restituirà il risultato dell'ottenimento di una proprietà di un elemento.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [getProperty](/docs/api/element/getProperty). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nome della proprietà dell'attributo da recuperare</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>property</var></code>:** La proprietà nominata dell'elemento, accessibile chiamando GetOwnProperty sull'oggetto elemento.


---

## getElementCSSValue
Il comando Get Element CSS Value recupera il valore calcolato della proprietà CSS data dell'elemento web dato.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [getCSSProperty](/docs/api/element/getCSSProperty). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>nome della proprietà CSS da recuperare</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** Il valore calcolato del parametro corrispondente al nome della proprietà dalle dichiarazioni di stile dell'elemento (a meno che il tipo di documento non sia xml, nel qual caso il valore restituito è semplicemente la stringa vuota).


---

## getElementText
Il comando Get Element Text intende restituire il testo di un elemento "come reso". Il testo reso di un elemento viene anche utilizzato per localizzare elementi tramite il loro testo di link e testo parziale di link.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-element-text).

##### Utilizzo

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>text</var></code>:** Il testo visibile dell'elemento (inclusi elementi figli), seguendo l'algoritmo definito negli Atomi Selenium per [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).


---

## getElementTagName
Il comando Get Element Tag Name restituisce il nome qualificato dell'elemento dato.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [getTagName](/docs/api/element/getTagName). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>text</var></code>:** L'attributo tagName dell'elemento.


---

## getElementRect
Il comando Get Element Rect restituisce le dimensioni e le coordinate dell'elemento web dato.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

Questo comando di protocollo è incorporato nei seguenti metodi convenienti: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). Si consiglia di utilizzare questi comandi.

:::


##### Utilizzo

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** Un oggetto JSON che rappresenta la posizione e il rettangolo di delimitazione dell'elemento.


---

## isElementEnabled
Is Element Enabled determina se l'elemento referenziato è abilitato o meno. Questa operazione ha senso solo sui controlli del modulo.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [isEnabled](/docs/api/element/isEnabled). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** Se l'elemento è in un documento xml, o è un controllo del modulo disabilitato: `false`, altrimenti, `true`.


---

## elementClick
Il comando Element Click scorre in vista l'elemento se non è già interagibile con il puntatore, e fa clic sul suo punto centrale in vista. Se il punto centrale dell'elemento è oscurato da un altro elemento, viene restituito un errore di clic intercettato dell'elemento. Se l'elemento è fuori dal viewport, viene restituito un errore di elemento non interagibile.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [click](/docs/api/element/click). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
Il comando Element Clear scorre in vista un elemento modificabile o resettabile e poi tenta di cancellare i suoi file selezionati o il contenuto di testo.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [clearValue](/docs/api/element/clearValue). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
Il comando Element Send Keys scorre in vista l'elemento del controllo del modulo e poi invia i tasti forniti all'elemento. Nel caso in cui l'elemento non sia interagibile con la tastiera, viene restituito un errore di elemento non interagibile.<br /><br />Lo stato di input chiave utilizzato per l'input può essere cancellato a metà della "digitazione" inviando il tasto null, che è U+E000 (NULL).<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

Questo comando di protocollo è incorporato nei seguenti metodi convenienti: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). Si consiglia di utilizzare questi comandi.

:::


##### Utilizzo

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>stringa da inviare come battute di tasti all'elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
Il comando Get Page Source restituisce una serializzazione di stringa del DOM del documento attivo del contesto di navigazione corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-page-source).

##### Utilizzo

```js
browser.getPageSource()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** il DOM del documento attivo del contesto di navigazione corrente


---

## executeScript
Il comando Execute Script esegue una funzione JavaScript nel contesto del contesto di navigazione corrente e restituisce il valore di ritorno della funzione.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [execute](/docs/api/browser/execute). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>una stringa, il corpo della funzione Javascript che vuoi eseguita</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>un array di valori JSON che saranno deserializzati e passati come argomenti alla tua funzione</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### Restituisce

- **&lt;*&gt;**
            **<code><var>result</var></code>:** O il valore di ritorno del tuo script, l'adempimento della Promise restituita dal tuo script, o l'errore che è stato il motivo del rifiuto della Promise restituita dal tuo script.


---

## executeAsyncScript
Il comando Execute Async Script fa eseguire JavaScript come una funzione anonima. A differenza del comando Execute Script, il risultato della funzione viene ignorato. Invece un argomento aggiuntivo viene fornito come argomento finale alla funzione. Questa è una funzione che, quando chiamata, restituisce il suo primo argomento come risposta.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

Questo comando di protocollo è incorporato nel seguente metodo conveniente: [executeAsync](/docs/api/browser/executeAsync). Si consiglia di utilizzare questo comando.

:::


##### Utilizzo

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>una stringa, il corpo della funzione Javascript che vuoi eseguita</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>un array di valori JSON che saranno deserializzati e passati come argomenti alla tua funzione</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### Restituisce

- **&lt;*&gt;**
            **<code><var>result</var></code>:** O il valore di ritorno del tuo script, l'adempimento della Promise restituita dal tuo script, o l'errore che è stato il motivo del rifiuto della Promise restituita dal tuo script.


---

## getAllCookies
Il comando Get All Cookies restituisce tutti i cookie associati all'indirizzo del documento attivo del contesto di navigazione corrente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-all-cookies).

##### Utilizzo

```js
browser.getAllCookies()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### Restituisce

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** Un elenco di cookie serializzati. Ogni cookie serializzato ha un numero di campi opzionali che possono essere restituiti o meno in aggiunta a `name` e `value`.


---

## addCookie
Il comando Add Cookie aggiunge un singolo cookie all'archivio dei cookie associato all'indirizzo del documento attivo.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).

##### Utilizzo

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>Un oggetto JSON che rappresenta un cookie. Deve avere almeno i campi name e value e potrebbe averne di più, inclusi expiry-time e così via</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
Il comando Delete All Cookies consente l'eliminazione di tutti i cookie associati all'indirizzo del documento attivo.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).

##### Utilizzo

```js
browser.deleteAllCookies()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
Il comando Get Named Cookie restituisce il cookie con il nome richiesto dai cookie associati nell'archivio dei cookie del documento attivo del contesto di navigazione corrente. Se non viene trovato alcun cookie, viene restituito un errore di cookie non presente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-named-cookie).

##### Utilizzo

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nome del cookie da recuperare</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** Un cookie serializzato, con campi name e value. Ci sono una serie di campi opzionali come `path`, `domain` e `expiry-time` che possono essere presenti.


---

## deleteCookie
Il comando Delete Cookie consente di eliminare un singolo cookie dal parametro name o tutti i cookie associati all'indirizzo del documento attivo se name è indefinito.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-delete-cookie).

##### Utilizzo

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nome del cookie da eliminare</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
Il comando Perform Actions viene utilizzato per eseguire azioni utente complesse. Vedi [spec](https://github.com/jlipps/simple-wd-spec#perform-actions) per maggiori dettagli.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-perform-actions).

##### Utilizzo

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>un elenco di oggetti, ciascuno dei quali rappresenta una fonte di input e le relative azioni</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
Il comando Release Actions viene utilizzato per rilasciare tutti i tasti e i pulsanti del puntatore che sono attualmente premuti. Ciò fa sì che vengano generati eventi come se lo stato fosse stato rilasciato da una serie esplicita di azioni. Cancella anche tutto lo stato interno dei dispositivi virtuali.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-release-actions).

##### Utilizzo

```js
browser.releaseActions()
```



---

## dismissAlert
Il comando Dismiss Alert respinge una finestra di dialogo semplice se presente, altrimenti errore. Una richiesta di respingere un prompt utente, che potrebbe non avere necessariamente un pulsante di rifiuto, ha lo stesso effetto dell'accettarlo.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-dismiss-alert).

##### Utilizzo

```js
browser.dismissAlert()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
Il comando Accept Alert accetta una finestra di dialogo semplice se presente, altrimenti errore.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-accept-alert).

##### Utilizzo

```js
browser.acceptAlert()
```



---

## getAlertText
Il comando Get Alert Text restituisce il messaggio del prompt utente corrente. Se non c'è alcun prompt utente corrente, restituisce un errore.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-get-alert-text).

##### Utilizzo

```js
browser.getAlertText()
```

##### Esempio

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** Il messaggio del prompt utente.


---

## sendAlertText
Il comando Send Alert Text imposta il campo di testo di un prompt utente window.prompt al valore dato.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-send-alert-text).

##### Utilizzo

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>stringa da impostare nel prompt</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
Il comando Take Screenshot scatta uno screenshot del viewport del contesto di navigazione di livello superiore.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-take-screenshot).

##### Utilizzo

```js
browser.takeScreenshot()
```


##### Restituisce

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** I dati dell'immagine PNG codificati in base64 che compongono lo screenshot del viewport iniziale.


---

## takeElementScreenshot
Il comando Take Element Screenshot scatta uno screenshot della regione visibile racchiusa dal rettangolo di delimitazione di un elemento.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### Utilizzo

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>scorrere in vista l'elemento. Predefinito: true</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** I dati dell'immagine PNG codificati in base64 che compongono lo screenshot della regione visibile del rettangolo di delimitazione di un elemento dopo che è stato scrollato in vista.


---

## getElementComputedRole
Ottiene il ruolo WAI-ARIA calcolato di un elemento.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#get-computed-role).

##### Utilizzo

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string&gt;**
            **<code><var>role</var></code>:** Il risultato del calcolo del ruolo WAI-ARIA dell'elemento.


---

## getElementComputedLabel
Ottiene il nome accessibile dell'elemento.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/webdriver/#get-computed-label).

##### Utilizzo

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string&gt;**
            **<code><var>label</var></code>:** Il risultato di un calcolo del nome e della descrizione accessibili per il nome accessibile dell'elemento.


---

## setPermissions
Simula la modifica da parte dell'utente dello stato di autorizzazione di un PermissionDescriptor. __Nota:__ questa funzionalità non è ancora disponibile in tutti i browser.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/permissions/#set-permission-command).

##### Utilizzo

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>Ogni funzionalità potente ha uno o più aspetti a cui i siti web possono richiedere il permesso di accedere. Per descrivere questi aspetti, ogni caratteristica definisce un sottotipo di PermissionDescriptor per essere il suo tipo di descrittore di autorizzazione. __Nota:__ questa funzionalità non è ancora disponibile in tutti i browser.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Determina se l'autorizzazione è concessa, negata o richiesta.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>Se applicare o meno le autorizzazioni a tutti i contesti di esecuzione.</td>
    </tr>
  </tbody>
</table>

##### Esempi


```js
// imposta le autorizzazioni midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // può essere anche "denied" o "prompt"
);
```


```js
// imposta le autorizzazioni della clipboard
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// ora puoi leggere la clipboard tramite, ad esempio
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
Genera un rapporto per i test. Estensione per [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __Nota:__ questa funzionalità non è ancora disponibile in tutti i browser.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/reporting/#automation).

##### Utilizzo

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>Messaggio da visualizzare nel rapporto.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Specifica il gruppo di endpoint a cui consegnare il rapporto.</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
Crea un sensore simulato per emulare sensori come Ambient Light Sensor. __Nota:__ questa funzionalità non è ancora disponibile in tutti i browser.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Utilizzo

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Tipo di API del sensore da simulare, ad es. 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>Un doppio che rappresenta la frequenza in Hz utilizzata per impostare la frequenza massima di campionamento supportata per il sensore simulato associato.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>Un doppio che rappresenta la frequenza in Hz utilizzata per impostare la frequenza minima di campionamento supportata per il sensore simulato associato.</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
Recupera informazioni su un determinato tipo di sensore simulato. __Nota:__ questa funzionalità non è ancora disponibile in tutti i browser.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/sensors/#get-mock-sensor-command).

##### Utilizzo

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo di sensore simulato da cui recuperare le informazioni.</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** Valori della lettura del sensore simulato.


---

## updateMockSensor
Aggiorna il tipo di sensore simulato. __Nota:__ questa funzionalità non è ancora disponibile in tutti i browser.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).

##### Utilizzo

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo di sensore simulato per cui aggiornare le informazioni.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Tipo di API del sensore da simulare, ad es. 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>Un doppio che rappresenta la frequenza in Hz utilizzata per impostare la frequenza massima di campionamento supportata per il sensore simulato associato.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>Un doppio che rappresenta la frequenza in Hz utilizzata per impostare la frequenza minima di campionamento supportata per il sensore simulato associato.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
Il comando Delete Session chiude tutti i contesti di navigazione di livello superiore associati alla sessione corrente, termina la connessione e infine chiude la sessione corrente. __Nota:__ questa funzionalità non è ancora disponibile in tutti i browser.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/sensors/#delete-mock-sensor-command).

##### Utilizzo

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo di sensore simulato da eliminare.</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
Simula il cambio di un fuso orario ai fini del test. __Nota:__ questa funzionalità non è ancora disponibile in tutti i browser.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Utilizzo

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>Nome del fuso orario, ad es. Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
Crea un software [Virtual Authenticator](https://www.w3.org/TR/webauthn-2/#virtual-authenticators).<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).

##### Utilizzo

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Valori validi: 'ctap1/u2f', 'ctap2', 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Valori validi: 'usb', 'nfc', 'ble' o 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>Valori validi: true, false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>Valori validi: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>Valori validi: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>Valori validi: Un array contenente identificatori di estensione.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string[]</td>
      <td>Valori validi: Fino a 3 voci del metodo di verifica dell'utente.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** Restituisce l'ID stringa dell'autenticatore.


---

## removeVirtualAuthenticator
Rimuove un Virtual Authenticator creato in precedenza.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).

##### Utilizzo

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id dell'autenticatore</td>
    </tr>
  </tbody>
</table>



---

## addCredential
Inietta una fonte di credenziali di chiave pubblica in un Virtual Authenticator esistente.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).

##### Utilizzo

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ID dell'autenticatore</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>L'ID della credenziale codificato usando la codifica Base64url.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>Se impostato a true, viene creata una credenziale rilevabile lato client. Se impostato a false, viene invece creata una credenziale lato server.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>L'ID della Relying Party a cui è limitata la credenziale.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>Un pacchetto di chiave asimmetrica contenente una singola chiave privata secondo [RFC5958], codificato usando la codifica Base64url.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>L'userHandle associato alla credenziale codificato usando la codifica Base64url. Questa proprietà potrebbe non essere definita.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>Il valore iniziale per un contatore di firma associato alla fonte di credenziali di chiave pubblica.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Il grande blob per credenziale associato alla fonte di credenziali di chiave pubblica, codificato usando la codifica Base64url. Questa proprietà potrebbe non essere definita.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
Restituisce un oggetto Credential Parameters per ogni fonte di credenziale di chiave pubblica memorizzata in un Virtual Authenticator, indipendentemente dal fatto che siano stati archiviati utilizzando Add Credential o `navigator.credentials.create()`.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).

##### Utilizzo

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id dell'autenticatore</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** Restituisce un array di credenziali.


---

## removeAllCredentials
Rimuove tutte le fonti di credenziali di chiave pubblica memorizzate su un Virtual Authenticator.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).

##### Utilizzo

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id dell'autenticatore</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
Rimuove una fonte di credenziale di chiave pubblica memorizzata su un Virtual Authenticator.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).

##### Utilizzo

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id dell'autenticatore</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>id della credenziale</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
Il comando di estensione Set User Verified imposta la proprietà isUserVerified sul Virtual Authenticator.<br /><br />Comando del protocollo WebDriver. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).

##### Utilizzo

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id dell'autenticatore</td>
    </tr>
  </tbody>
</table>


