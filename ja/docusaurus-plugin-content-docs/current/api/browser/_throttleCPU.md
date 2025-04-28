---
id: throttleCPU
title: CPUスロットル
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

CPUをスロットルして遅いプロセッサをエミュレートします。

:::info

`throttleCPU`コマンドを使用するには、Chrome DevToolsプロトコルのサポートが必要であり、クラウドで自動テストを実行する場合などには使用できません。Chrome DevToolsプロトコルはデフォルトではインストールされていないため、`npm install puppeteer-core`を使用してインストールしてください。
詳細は[自動化プロトコル](/docs/automationProtocols)セクションで確認してください。

:::

##### 使用方法

```js
browser.throttleCPU(factor)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>遅延係数（1はスロットルなし、2は2倍の遅延など）</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2倍の遅延
});
```