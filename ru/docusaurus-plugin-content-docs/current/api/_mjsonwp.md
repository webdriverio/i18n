---
id: mjsonwp
title: Мобильный JSON Wire Протокол
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Команда мобильного JSON Wire Protocol. Более подробная информация в [официальной документации протокола](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Эта команда протокола устарела<br />В Appium 2.0 этот метод помечен как устаревший и в настоящее время не имеет доступных альтернатив.
:::

##### Usage

```js
driver.getPageIndex()
```


##### Returns

- **&lt;string&gt;**



---

## getNetworkConnection
Команда мобильного JSON Wire Protocol. Более подробная информация в [официальной документации протокола](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
driver.getNetworkConnection()
```


##### Returns

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** см. https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
Команда мобильного JSON Wire Protocol. Более подробная информация в [официальной документации протокола](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

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
      <td>битовая маска, которая должна быть преобразована в целочисленное значение при сериализации</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
Команда мобильного JSON Wire Protocol. Более подробная информация в [официальной документации протокола](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

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
      <td>список объектов, каждый из которых представляет источник ввода и связанные с ним действия</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
Команда мобильного JSON Wire Protocol. Более подробная информация в [официальной документации протокола](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

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
      <td>список объектов, каждый из которых представляет источник ввода и связанные с ним действия</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
Команда мобильного JSON Wire Protocol. Более подробная информация в [официальной документации протокола](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

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
      <td>ожидаемый статус ответа</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>ожидаемое значение ответа</td>
    </tr>
  </tbody>
</table>