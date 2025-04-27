---
id: emulate
title: 模拟
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO 允许您使用 `emulate` 命令模拟 Web API。这些 Web API 可以完全按照您指定的方式运行。支持以下作用域：

- `geolocation`：模拟地理位置 API
- `userAgent`：模拟用户代理
- `colorScheme`：模拟颜色方案
- `onLine`：模拟在线状态
- `device`：模拟特定的移动或桌面设备
- `clock`：模拟系统时钟

`emulate` 命令返回一个可以调用以重置模拟的函数。当您想在测试或一系列测试后重置模拟时，这非常有用。

在[模拟](/docs/emulation)指南中阅读更多相关信息。

:::info

除了 `clock` 作用域外，无法在不重新加载页面的情况下更改模拟值。

:::

:::info

此功能需要浏览器支持 WebDriver Bidi。虽然最新版本的 Chrome、Edge 和 Firefox 都支持此功能，但 Safari __不支持__。有关更新，请关注 [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned)。
此外，如果您使用云供应商来启动浏览器，请确保您的供应商也支持 WebDriver Bidi。

:::

`EmulationOptions` 对象可以根据作用域具有以下属性：

| 作用域 | 选项 |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }` |
| `userAgent` | `string` |
| `colorScheme` | `'light' \| 'dark'` |
| `onLine` | `boolean` |
| `clock` | `FakeTimerInstallOpts` |

##### 用法

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>您想要模拟的浏览器功能，可以是 `clock`、`geolocation`、`userAgent`、`colorScheme` 或 `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>特定作用域的模拟选项</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### 返回值

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   一个重置模拟的函数