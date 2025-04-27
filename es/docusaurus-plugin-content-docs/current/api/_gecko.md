---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---
## fullPageScreenshot
Captura una captura de pantalla de toda la página.<br /><br />Comando de Firefox. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).



##### Usage

```js
browser.fullPageScreenshot()
```




##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Los datos de imagen PNG codificados en base64 que componen la captura de pantalla de la página completa.    


---
## getMozContext
Obtiene el contexto que está actualmente en efecto, por ejemplo `CHROME` o `CONTENT`.<br /><br />Comando de Firefox. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).



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
            **<code><var>Context</var></code>:** El contexto del navegador, ya sea `CHROME` o `CONTENT`    


---
## setMozContext
Cambia el contexto objetivo para comandos entre chrome y content.<br /><br />Cambiar el contexto actual tiene un impacto de estado en todos los comandos subsiguientes. El contexto `CONTENT` tiene permisos normales de documento de plataforma web, como si evaluaras JavaScript arbitrario. El contexto `CHROME` obtiene permisos elevados que te permiten manipular el chrome del navegador en sí, con acceso completo al toolkit XUL.<br /><br />Comando de Firefox. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).



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
      <td>El contexto del navegador, ya sea `CHROME` o `CONTENT`</td>
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
Instala un nuevo complemento en la sesión actual. Esta función devolverá un ID que puede usarse posteriormente para desinstalar el complemento usando `uninstallAddon`.<br /><br />Comando de Firefox. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).



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
      <td>cadena en base64 del archivo del complemento</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>Bandera temporal que indica si la extensión debe instalarse temporalmente - se elimina al reiniciar</td>
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
            **<code><var>id</var></code>:** Una promesa que se resolverá en un ID para el complemento recién instalado.    


---
## uninstallAddOn
Desinstala un complemento del perfil de la sesión actual del navegador.<br /><br />Comando de Firefox. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).



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
      <td>ID del complemento a desinstalar.</td>
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


