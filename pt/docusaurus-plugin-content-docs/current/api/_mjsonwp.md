---
id: mjsonwp
title: Protocolo Mobile JSON Wire
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Comando do Protocolo Mobile JSON Wire. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Este comando de protocolo está obsoleto<br />No Appium 2.0, este método está marcado como obsoleto e atualmente não possui alternativas disponíveis.
:::

##### Uso

```js
driver.getPageIndex()
```


##### Retorna

- **&lt;string&gt;**



---

## getNetworkConnection
Comando do Protocolo Mobile JSON Wire. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Uso

```js
driver.getNetworkConnection()
```


##### Retorna

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** veja https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
Comando do Protocolo Mobile JSON Wire. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Uso

```js
driver.setNetworkConnection(type)
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
      <td><code><var>type</var></code></td>
      <td>number</td>
      <td>uma máscara de bits que deve ser traduzida para um valor inteiro quando serializada</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
Comando do Protocolo Mobile JSON Wire. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### Uso

```js
driver.touchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>uma lista de objetos, cada um representando uma fonte de entrada e suas ações associadas</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
Comando do Protocolo Mobile JSON Wire. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### Uso

```js
driver.multiTouchPerform(actions, elementId)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>uma lista de objetos, cada um representando uma fonte de entrada e suas ações associadas</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object[]</td>
      <td>o id de um elemento retornado em uma chamada anterior para Find Element(s)</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
Comando do Protocolo Mobile JSON Wire. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

##### Uso

```js
driver.receiveAsyncResponse(status, value)
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
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>o status esperado da resposta</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>o valor esperado da resposta</td>
    </tr>
  </tbody>
</table>