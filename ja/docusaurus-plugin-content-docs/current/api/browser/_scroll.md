---
id: scroll
title: スクロール
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

ブラウザのビューポート内でスクロールします。`x`と`y`の座標は現在のスクロール位置からの相対位置であることに注意してください。そのため、`browser.scroll(0, 0)`は何も動作しません。

##### 使用方法

```js
browser.scroll(x, y)
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
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>水平スクロール位置（デフォルト: `0`）</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>垂直スクロール位置（デフォルト: `0`）</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```