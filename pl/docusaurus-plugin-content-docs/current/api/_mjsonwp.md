---
id: mjsonwp
title: Protokół Mobile JSON Wire
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Komenda protokołu Mobile JSON Wire. Więcej informacji można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Ta komenda protokołu jest przestarzała<br />W Appium 2.0 ta metoda jest oznaczona jako przestarzała i obecnie nie ma dostępnych alternatyw.
:::

##### Usage

```js
driver.getPageIndex()
```


##### Returns

- **&lt;string&gt;**



---

## getNetworkConnection
Komenda protokołu Mobile JSON Wire. Więcej informacji można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
driver.getNetworkConnection()
```


##### Returns

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** zobacz https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
Komenda protokołu Mobile JSON Wire. Więcej informacji można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
driver.setNetworkConnection(type)
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
      <td><code><var>type</var></code></td>
      <td>number</td>
      <td>maska bitowa, która powinna być przetłumaczona na wartość całkowitą podczas serializacji</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
Komenda protokołu Mobile JSON Wire. Więcej informacji można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### Usage

```js
driver.touchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>lista obiektów, z których każdy reprezentuje źródło wejściowe i powiązane z nim akcje</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
Komenda protokołu Mobile JSON Wire. Więcej informacji można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### Usage

```js
driver.multiTouchPerform(actions, elementId)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>lista obiektów, z których każdy reprezentuje źródło wejściowe i powiązane z nim akcje</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
Komenda protokołu Mobile JSON Wire. Więcej informacji można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

##### Usage

```js
driver.receiveAsyncResponse(status, value)
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
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>oczekiwany status odpowiedzi</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>oczekiwana wartość odpowiedzi</td>
    </tr>
  </tbody>
</table>