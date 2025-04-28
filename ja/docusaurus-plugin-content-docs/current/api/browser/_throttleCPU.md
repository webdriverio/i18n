---
id: throttleCPU
title: CPUスロットル
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

CPUをスロットルして遅いプロセッサをエミュレートします。

:::info

`throttleCPU`コマンドを使用するには、Chrome DevTools プロトコルのサポートが必要であり、
クラウドで自動テストを実行する場合などには使用できないことに注意してください。Chrome DevTools プロトコルはデフォルトではインストールされていません。
`npm install puppeteer-core`を使用してインストールしてください。
詳細は[自動化プロトコル](/docs/automationProtocols)セクションで確認できます。

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
      <td>遅延係数（1はスロットルなし、2は2倍の遅さ、など）</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```