---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---
## fullPageScreenshot
Capture une capture d'écran de la page entière.<br /><br />Commande Firefox. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).



##### Usage

```js
browser.fullPageScreenshot()
```




##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Les données d'image PNG encodées en base64 comprenant la capture d'écran de la page complète.    


---
## getMozContext
Obtient le contexte qui est actuellement en vigueur, par exemple `CHROME` ou `CONTENT`.<br /><br />Commande Firefox. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).



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
            **<code><var>Context</var></code>:** Le contexte du navigateur, soit `CHROME` soit `CONTENT`    


---
## setMozContext
Change le contexte cible pour les commandes entre chrome et content.<br /><br />Changer le contexte actuel a un impact statique sur toutes les commandes suivantes. Le contexte `CONTENT` a des permissions normales de document de plateforme web, comme si vous évaluiez du JavaScript arbitraire. Le contexte `CHROME` obtient des permissions élevées qui vous permettent de manipuler le chrome du navigateur lui-même, avec un accès complet à la boîte à outils XUL.<br /><br />Commande Firefox. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).



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
      <td>Le contexte du navigateur, soit `CHROME` soit `CONTENT`</td>
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
Installe un nouvel addon pour la session courante. Cette fonction retournera un ID qui pourra être utilisé ultérieurement pour désinstaller l'addon en utilisant `uninstallAddon`.<br /><br />Commande Firefox. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).



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
      <td>chaîne en base64 du fichier de l'extension</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>Indicateur temporaire indiquant si l'extension doit être installée temporairement - sera supprimée au redémarrage</td>
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
            **<code><var>id</var></code>:** Une promesse qui se résoudra en un ID pour l'addon nouvellement installé.    


---
## uninstallAddOn
Désinstalle un addon du profil de la session de navigateur actuelle.<br /><br />Commande Firefox. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).



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
      <td>ID de l'addon à désinstaller.</td>
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


