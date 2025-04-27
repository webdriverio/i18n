---
id: mjsonwp
title: Protocole Mobile JSON Wire
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Commande du Protocole Mobile JSON Wire. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Cette commande de protocole est dépréciée<br />Dans Appium 2.0, cette méthode est marquée comme dépréciée et n'a actuellement pas d'alternatives disponibles.
:::

##### Usage

```js
driver.getPageIndex()
```


##### Returns

- **&lt;string&gt;**



---

## getNetworkConnection
Commande du Protocole Mobile JSON Wire. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
driver.getNetworkConnection()
```


##### Returns

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** voir https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
Commande du Protocole Mobile JSON Wire. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

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
      <td>un masque de bits qui doit être traduit en valeur entière lors de la sérialisation</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
Commande du Protocole Mobile JSON Wire. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

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
      <td>une liste d'objets, chacun représentant une source d'entrée et ses actions associées</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
Commande du Protocole Mobile JSON Wire. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

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
      <td>une liste d'objets, chacun représentant une source d'entrée et ses actions associées</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>l'identifiant d'un élément retourné lors d'un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
Commande du Protocole Mobile JSON Wire. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

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
      <td>le statut attendu de la réponse</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>la valeur attendue de la réponse</td>
    </tr>
  </tbody>
</table>
