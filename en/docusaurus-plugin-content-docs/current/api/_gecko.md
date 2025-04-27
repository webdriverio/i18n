---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---
## fullPageScreenshot
Captures a screenshot of the entire page.<br /><br />Firefox command. More details can be found in the [official protocol docs](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).



##### Usage

```js
browser.fullPageScreenshot()
```




##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** The base64-encoded PNG image data comprising the screenshot of the full page.    


---
## getMozContext
Get the context that is currently in effect, e.g. `CHROME` or `CONTENT`.<br /><br />Firefox command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).



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
            **<code><var>Context</var></code>:** The browser context, either `CHROME` or `CONTENT`    


---
## setMozContext
Changes target context for commands between chrome- and content.<br /><br />Changing the current context has a stateful impact on all subsequent commands. The `CONTENT` context has normal web platform document permissions, as if you would evaluate arbitrary JavaScript. The `CHROME` context gets elevated permissions that lets you manipulate the browser chrome itself, with full access to the XUL toolkit.<br /><br />Firefox command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).



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
      <td>The browser context, either `CHROME` or `CONTENT`</td>
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
Installs a new addon with the current session. This function will return an ID that may later be used to uninstall the addon using `uninstallAddon`.<br /><br />Firefox command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).



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
      <td>base64 string of the add on file</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>temporary Flag indicating whether the extension should be installed temporarily - gets removed on restart</td>
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
            **<code><var>id</var></code>:** A promise that will resolve to an ID for the newly installed addon.    


---
## uninstallAddOn
Uninstalls an addon from the current browser session's profile.<br /><br />Firefox command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).



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
      <td>id ID of the addon to uninstall.</td>
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




