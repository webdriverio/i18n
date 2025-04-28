---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
Cattura uno screenshot dell'intera pagina.<br /><br />Comando Firefox. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).

##### Usage

```js
browser.fullPageScreenshot()
```


##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** I dati dell'immagine PNG codificati in base64 che compongono lo screenshot dell'intera pagina.


---

## getMozContext
Ottiene il contesto attualmente in uso, ad esempio `CHROME` o `CONTENT`.<br /><br />Comando Firefox. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).

##### Usage

```js
browser.getMozContext()
```

##### Example


```js
console.log(await browser.getMozContext()); // outputs: 'CHROME'
```


##### Returns

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** Il contesto del browser, o `CHROME` o `CONTENT`


---

## setMozContext
Cambia il contesto target per i comandi tra chrome e content.<br /><br />Modificare il contesto corrente ha un impatto stateful su tutti i comandi successivi. Il contesto `CONTENT` ha normali permessi di documento della piattaforma web, come se stessi valutando JavaScript arbitrario. Il contesto `CHROME` ottiene permessi elevati che ti permettono di manipolare la chrome del browser stesso, con pieno accesso al toolkit XUL.<br /><br />Comando Firefox. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).

##### Usage

```js
browser.setMozContext(context)
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
      <td><code><var>context</var></code></td>
      <td>string</td>
      <td>Il contesto del browser, o `CHROME` o `CONTENT`</td>
    </tr>
  </tbody>
</table>

##### Example


```js
console.log(await browser.getMozContext()); // outputs: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // outputs: 'CONTENT'
```



---

## installAddOn
Installa un nuovo addon nella sessione corrente. Questa funzione restituirà un ID che potrà essere utilizzato successivamente per disinstallare l'addon utilizzando `uninstallAddon`.<br /><br />Comando Firefox. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).

##### Usage

```js
browser.installAddOn(addon, temporary)
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
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>stringa base64 del file add on</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>Flag temporary che indica se l'estensione deve essere installata temporaneamente - viene rimossa al riavvio</td>
    </tr>
  </tbody>
</table>

##### Example


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### Returns

- **&lt;String&gt;**
            **<code><var>id</var></code>:** Una promessa che si risolverà in un ID per l'addon appena installato.


---

## uninstallAddOn
Disinstalla un addon dal profilo della sessione del browser corrente.<br /><br />Comando Firefox. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).

##### Usage

```js
browser.uninstallAddOn(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>id ID dell'addon da disinstallare.</td>
    </tr>
  </tbody>
</table>

##### Example


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```