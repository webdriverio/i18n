---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
Enviar um arquivo para a máquina remota na qual o navegador está sendo executado.<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.seleniumhq.org/).

##### Uso

```js
browser.file(file)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Arquivo zip codificado em base64 contendo __único__ arquivo para enviar. Caso os dados codificados em base64 não representem um arquivo zip ou o arquivo contenha mais de um arquivo, um erro desconhecido será lançado.</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Caminho absoluto do arquivo enviado na máquina remota.


---

## getDownloadableFiles
Listar arquivos da máquina remota disponíveis para download.<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.seleniumhq.org/).

##### Uso

```js
browser.getDownloadableFiles()
```


##### Retorna

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Objeto contendo uma lista de arquivos disponíveis para download na máquina remota.


---

## download
Baixar um arquivo da máquina remota na qual o navegador está sendo executado.<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.seleniumhq.org/).

##### Uso

```js
browser.download(name)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Nome do arquivo a ser baixado</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Objeto contendo o nome do arquivo baixado e seu conteúdo


---

## deleteDownloadableFiles
Remover todos os arquivos disponíveis para download da máquina remota na qual o navegador está sendo executado.<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.seleniumhq.org/).

##### Uso

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
Receber a configuração do hub remotamente.<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### Uso

```js
browser.getHubConfig()
```


##### Retorna

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Retorna a configuração do hub com slotCount, timeouts e outras informações.


---

## gridTestSession
Obter os detalhes do nó do Selenium Grid executando uma sessão.<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

##### Uso

```js
browser.gridTestSession(session)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>O id da sessão para receber detalhes do hub.</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objeto contendo informações sobre os detalhes da sessão.


---

## gridProxyDetails
Obter detalhes do proxy.<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

##### Uso

```js
browser.gridProxyDetails(id)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>o id do proxy (pode ser recebido usando o comando gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objeto contendo informações sobre o proxy.


---

## manageSeleniumHubLifecycle
Gerenciar o ciclo de vida do nó hub.<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

##### Uso

```js
browser.manageSeleniumHubLifecycle(action)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Comando para chamar no Selenium Hub. A única ação implementada é 'shutdown' do hub.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Enviar consultas GraphQL para o servidor Selenium (hub ou nó) para buscar dados. (Suportado apenas com Selenium v4 Server)<br /><br />Comando do Selenium Standalone. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

##### Uso

```js
browser.queryGrid(query)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>Uma consulta GraphQL a ser enviada para o servidor.</td>
    </tr>
  </tbody>
</table>

##### Exemplo


```js
const result = await browser.queryGrid('{ nodesInfo { nodes { status, uri } } }');
console.log(JSON.stringify(result, null, 4))
/**
 * outputs:
 * {
 *   "data": {
 *     "nodesInfo": {
 *       "nodes": [{
 *         "status": "UP",
 *         "uri": "http://192.168.0.39:4444"
 *       }]
 *     }
 *   }
 * }
 */
```


##### Retorna

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Resultado da consulta GraphQL.