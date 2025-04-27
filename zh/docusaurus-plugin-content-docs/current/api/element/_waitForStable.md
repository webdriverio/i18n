---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

等待元素在提供的毫秒数内稳定（不再有动画）。如果选择器匹配至少一个在DOM中稳定的元素，则返回true，否则抛出错误。如果reverse标志为true，则当选择器不匹配任何稳定元素时，命令将返回true。

__注意：__ 最好禁用动画而不是使用此命令

##### 用法

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForStable选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>时间（毫秒）（默认基于[`waitforTimeout`](/docs/configuration#waitfortimeout)配置值设置）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>如果为true，则等待相反的情况（默认值：false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>如果存在，它将覆盖默认错误消息</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>检查之间的间隔（默认值：`waitforInterval`）</td>
    </tr>
  </tbody>
</table>

##### 示例

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  如果元素稳定则返回true