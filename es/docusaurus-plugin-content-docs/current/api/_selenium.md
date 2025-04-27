---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---
## file
Subir un archivo a la máquina remota en la que se ejecuta el navegador.<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://www.seleniumhq.org/).



##### Uso

```js
browser.file(file)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Archivo zip codificado en base64 que contiene __un solo__ archivo para subir. En caso de que los datos codificados en base64 no representen un archivo zip o el archivo contenga más de un archivo, se lanzará un error desconocido.</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Ruta absoluta del archivo subido en la máquina remota.    


---
## getDownloadableFiles
Lista de archivos de la máquina remota disponibles para descargar.<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://www.seleniumhq.org/).



##### Uso

```js
browser.getDownloadableFiles()
```




##### Devuelve

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Objeto que contiene una lista de archivos descargables en la máquina remota.    


---
## download
Descargar un archivo de la máquina remota en la que se ejecuta el navegador.<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://www.seleniumhq.org/).



##### Uso

```js
browser.download(name)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Nombre del archivo a descargar</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Objeto que contiene el nombre del archivo descargado y su contenido    


---
## deleteDownloadableFiles
Eliminar todos los archivos descargables de la máquina remota en la que se ejecuta el navegador.<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://www.seleniumhq.org/).



##### Uso

```js
browser.deleteDownloadableFiles()
```







---
## getHubConfig
Recibir la configuración del hub de forma remota.<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://github.com/nicegraham/selenium-grid2-api#gridapihub).



##### Uso

```js
browser.getHubConfig()
```




##### Devuelve

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Devuelve la configuración del hub con slotCount, tiempos de espera y otra información.    


---
## gridTestSession
Obtener los detalles del nodo de Selenium Grid que ejecuta una sesión.<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).



##### Uso

```js
browser.gridTestSession(session)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>El id de la sesión para la que se reciben los detalles del hub.</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objeto que contiene información sobre los detalles de la sesión.    


---
## gridProxyDetails
Obtener detalles del proxy.<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).



##### Uso

```js
browser.gridProxyDetails(id)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>el id del proxy (se puede recibir usando el comando gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objeto que contiene información sobre el proxy.    


---
## manageSeleniumHubLifecycle
Gestionar el ciclo de vida del nodo hub.<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).



##### Uso

```js
browser.manageSeleniumHubLifecycle(action)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Comando para llamar en Selenium Hub. La única acción implementada es 'shutdown' (apagar) el hub.</td>
    </tr>
  </tbody>
</table>





---
## queryGrid
Enviar consultas GraphQL al servidor Selenium (hub o nodo) para obtener datos. (Solo compatible con Selenium v4 Server)<br /><br />Comando de Selenium Standalone. Se pueden encontrar más detalles en la [documentación oficial del protocolo](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).



##### Uso

```js
browser.queryGrid(query)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>Una consulta GraphQL para enviar al servidor.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo


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


##### Devuelve

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Resultado de la consulta GraphQL.    