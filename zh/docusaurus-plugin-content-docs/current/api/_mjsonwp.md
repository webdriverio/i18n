---
id: mjsonwp
title: 移动端 JSON Wire 协议
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
移动端 JSON Wire 协议命令。更多详情可以在[官方协议文档](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints)中找到。
:::caution

此协议命令已被弃用<br />在 Appium 2.0 中，此方法被标记为已弃用，目前没有可用的替代方法。
:::

##### 用法

```js
driver.getPageIndex()
```


##### 返回值

- **&lt;string&gt;**



---

## getNetworkConnection
移动端 JSON Wire 协议命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)中找到。

##### 用法

```js
driver.getNetworkConnection()
```


##### 返回值

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** 参见 https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
移动端 JSON Wire 协议命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)中找到。

##### 用法

```js
driver.setNetworkConnection(type)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>number</td>
      <td>一个位掩码，序列化时应转换为整数值</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
移动端 JSON Wire 协议命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures)中找到。

##### 用法

```js
driver.touchPerform(actions)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>对象列表，每个对象代表一个输入源及其相关操作</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
移动端 JSON Wire 协议命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures)中找到。

##### 用法

```js
driver.multiTouchPerform(actions, elementId)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>对象列表，每个对象代表一个输入源及其相关操作</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>在之前调用查找元素(s)时返回的元素 id</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
移动端 JSON Wire 协议命令。更多详情可以在[官方协议文档](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints)中找到。

##### 用法

```js
driver.receiveAsyncResponse(status, value)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>预期的响应状态</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>预期的响应值</td>
    </tr>
  </tbody>
</table>