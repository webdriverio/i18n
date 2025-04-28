---
id: throttleCPU
title: throttleCPU（CPUスロットル）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

CPUをスロットルして遅いプロセッサをエミュレートします。

:::info

`throttleCPU`コマンドを使用するには、Chrome DevToolsプロトコルのサポートが必要であり、例えば
クラウドで自動テストを実行する場合には使用できません。Chrome DevToolsプロトコルはデフォルトではインストールされていません。
`npm install puppeteer-core`を使用してインストールしてください。
詳細は[オートメーションプロトコル](/docs/automationProtocols)セクションをご覧ください。

:::

##### 使用法

```js
browser.throttleCPU(factor)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>減速係数（1はスロットルなし、2は2倍の減速、など）</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```