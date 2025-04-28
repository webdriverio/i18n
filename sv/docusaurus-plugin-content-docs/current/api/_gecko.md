---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
Tar en skärmdump av hela sidan.<br /><br />Firefox-kommando. Mer information finns i [officiell protokolldokumentation](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).

##### Usage

```js
browser.fullPageScreenshot()
```


##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Den base64-kodade PNG-bilddatan som utgör skärmdumpen av hela sidan.


---

## getMozContext
Hämtar kontexten som för närvarande är aktiv, t.ex. `CHROME` eller `CONTENT`.<br /><br />Firefox-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).

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
            **<code><var>Context</var></code>:** Webbläsarkontexten, antingen `CHROME` eller `CONTENT`


---

## setMozContext
Ändrar målkontexten för kommandon mellan chrome och content.<br /><br />Att ändra den aktuella kontexten har en varaktig påverkan på alla efterföljande kommandon. `CONTENT`-kontexten har normala webbplattformsdokumenträttigheter, som om du skulle utvärdera godtycklig JavaScript. `CHROME`-kontexten får förhöjda behörigheter som låter dig manipulera webbläsarens chrome själv, med full tillgång till XUL-verktygslådan.<br /><br />Firefox-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).

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
      <td>Webbläsarkontexten, antingen `CHROME` eller `CONTENT`</td>
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
Installerar ett nytt tillägg i den aktuella sessionen. Denna funktion returnerar ett ID som senare kan användas för att avinstallera tillägget med `uninstallAddon`.<br /><br />Firefox-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).

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
      <td>base64-sträng av tilläggsfilen</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>temporary Flagga som anger om tillägget ska installeras tillfälligt - tas bort vid omstart</td>
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
            **<code><var>id</var></code>:** Ett löfte som kommer att ge ett ID för det nyligen installerade tillägget.


---

## uninstallAddOn
Avinstallerar ett tillägg från den aktuella webbläsarsessionens profil.<br /><br />Firefox-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).

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
      <td>id ID för tillägget som ska avinstalleras.</td>
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