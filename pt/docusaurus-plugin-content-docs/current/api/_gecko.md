---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
Captura uma captura de tela da página inteira.<br /><br />Comando do Firefox. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).

##### Usage

```js
browser.fullPageScreenshot()
```


##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Os dados de imagem PNG codificados em base64 que compõem a captura de tela da página inteira.


---

## getMozContext
Obtenha o contexto que está atualmente em vigor, por exemplo, `CHROME` ou `CONTENT`.<br /><br />Comando do Firefox. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).

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
            **<code><var>Context</var></code>:** O contexto do navegador, seja `CHROME` ou `CONTENT`


---

## setMozContext
Altera o contexto de destino para comandos entre chrome e conteúdo.<br /><br />A alteração do contexto atual tem um impacto de estado em todos os comandos subsequentes. O contexto `CONTENT` tem permissões normais de documento da plataforma web, como se você estivesse avaliando JavaScript arbitrário. O contexto `CHROME` obtém permissões elevadas que permitem manipular o próprio chrome do navegador, com acesso total ao kit de ferramentas XUL.<br /><br />Comando do Firefox. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).

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
      <td>O contexto do navegador, seja `CHROME` ou `CONTENT`</td>
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
Instala um novo complemento na sessão atual. Esta função retornará um ID que pode ser usado posteriormente para desinstalar o complemento usando `uninstallAddon`.<br /><br />Comando do Firefox. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).

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
      <td>string base64 do arquivo do complemento</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>Indicador temporário se a extensão deve ser instalada temporariamente - é removida na reinicialização</td>
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
            **<code><var>id</var></code>:** Uma promessa que será resolvida em um ID para o complemento recém-instalado.


---

## uninstallAddOn
Desinstala um complemento do perfil da sessão do navegador atual.<br /><br />Comando do Firefox. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).

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
      <td>ID do complemento a ser desinstalado.</td>
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