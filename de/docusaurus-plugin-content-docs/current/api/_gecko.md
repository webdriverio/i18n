---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---
## fullPageScreenshot
Erstellt einen Screenshot der gesamten Seite.<br /><br />Firefox-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).



##### Usage

```js
browser.fullPageScreenshot()
```




##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Die Base64-codierten PNG-Bilddaten, die den Screenshot der gesamten Seite umfassen.    


---
## getMozContext
Ruft den aktuell gültigen Kontext ab, z.B. `CHROME` oder `CONTENT`.<br /><br />Firefox-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).



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
            **<code><var>Context</var></code>:** Der Browser-Kontext, entweder `CHROME` oder `CONTENT`    


---
## setMozContext
Ändert den Zielkontext für Befehle zwischen Chrome und Content.<br /><br />Das Ändern des aktuellen Kontexts hat einen zustandsbehafteten Einfluss auf alle nachfolgenden Befehle. Der `CONTENT`-Kontext hat normale Webplattform-Dokumentberechtigungen, als ob Sie beliebiges JavaScript auswerten würden. Der `CHROME`-Kontext erhält erweiterte Berechtigungen, mit denen Sie die Browser-Chrome selbst manipulieren können, mit vollem Zugriff auf das XUL-Toolkit.<br /><br />Firefox-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).



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
      <td>Der Browser-Kontext, entweder `CHROME` oder `CONTENT`</td>
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
Installiert ein neues Add-on in der aktuellen Sitzung. Diese Funktion gibt eine ID zurück, die später verwendet werden kann, um das Add-on mit `uninstallAddon` zu deinstallieren.<br /><br />Firefox-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).



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
      <td>Base64-String der Add-on-Datei</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>Temporäres Flag, das angibt, ob die Erweiterung temporär installiert werden soll - wird beim Neustart entfernt</td>
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
            **<code><var>id</var></code>:** Ein Promise, das zu einer ID für das neu installierte Add-on aufgelöst wird.    


---
## uninstallAddOn
Deinstalliert ein Add-on aus dem Profil der aktuellen Browser-Sitzung.<br /><br />Firefox-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).



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
      <td>ID des zu deinstallierenden Add-ons.</td>
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




