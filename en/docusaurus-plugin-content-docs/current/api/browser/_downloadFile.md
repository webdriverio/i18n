---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Download a file from the remote computer running Selenium node to local file system
by using the [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile) command.

:::info
Note that this command is only supported if you use a
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) with Chrome, Edge or Firefox
and have the `se:downloadsEnabled` flag set in the capabilities.
:::

##### Usage

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>remote path to file</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>target location on local computer</td>
    </tr>
  </tbody>
</table>

