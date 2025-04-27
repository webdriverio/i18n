---
id: keys
title: keys
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Send a sequence of key strokes to the "active" element. You can make an input element active by just clicking
on it. To use characters like "Left arrow" or "Back space", import the `Key` object from the WebdriverIO package.

Modifier like `Control`, `Shift`, `Alt` and `Command` will stay pressed so you need to trigger them again to release
them. Modifying a click however requires you to use the WebDriver Actions API through the
[performActions](https://webdriver.io/docs/api/webdriver#performactions) method.

:::info

Control keys differ based on the operating system the browser is running on, e.g. MacOS: `Command` and Windows: `Control`.
WebdriverIO provides a cross browser modifier control key called `Ctrl` (see example below).

:::

##### Usage

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>The sequence of keys to type. An array or string must be provided.</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```

