---
id: mjsonwp
title: Мобільний JSON Wire протокол
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Команда Mobile JSON Wire Protocol. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Ця команда протоколу застаріла<br />В Appium 2.0 цей метод позначено як застарілий і наразі не має доступних альтернатив.
:::

##### Usage

```js
driver.getPageIndex()
```


##### Returns

- **&lt;string&gt;**



---

## getNetworkConnection
Команда Mobile JSON Wire Protocol. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
driver.getNetworkConnection()
```


##### Returns

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** див. https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
Команда Mobile JSON Wire Protocol. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

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
      <td>бітова маска, яка повинна бути перетворена в ціле число при серіалізації</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
Команда Mobile JSON Wire Protocol. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

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
      <td>список об'єктів, кожен з яких представляє джерело введення та пов'язані з ним дії</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
Команда Mobile JSON Wire Protocol. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

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
      <td>список об'єктів, кожен з яких представляє джерело введення та пов'язані з ним дії</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>ідентифікатор елемента, повернутий у попередньому виклику Find Element(s)</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
Команда Mobile JSON Wire Protocol. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

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
      <td>очікуваний статус відповіді</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>очікуване значення відповіді</td>
    </tr>
  </tbody>
</table>