---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

デスクトップ/モバイルWebページ<strong>および</strong>モバイルネイティブアプリのために要素をビューポートにスクロールします。

:::info

モバイルネイティブアプリでのスクロールはモバイルの`swipe`コマンドに基づいて行われます。

:::

##### 使用方法

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`object, boolean`</td>
      <td>`Element.scrollIntoView()`のオプション。デスクトップ/モバイルWebのデフォルト: <br/> `{ block: 'start', inline: 'nearest' }` <br /> モバイルネイティブアプリのデフォルト <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>デスクトップ/モバイルWebのみ</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string`</td>
      <td>[MDNリファレンス](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)を参照してください。<br /><strong>WEBのみ</strong> (デスクトップ/モバイル)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string`</td>
      <td>[MDNリファレンス](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)を参照してください。<br /><strong>WEBのみ</strong> (デスクトップ/モバイル)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string`</td>
      <td>[MDNリファレンス](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)を参照してください。<br /><strong>WEBのみ</strong> (デスクトップ/モバイル)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>モバイルネイティブアプリのみ</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string`</td>
      <td>`down`、`up`、`left`または`right`のいずれか、デフォルトは`up`です。<br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>要素を検索するまでの最大スクロール回数、デフォルトは`10`です。<br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>スワイプのミリ秒単位の所要時間。デフォルトは`1500`ミリ秒です。値が低いほど、スワイプが速くなります。<br /><strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Element`</td>
      <td>内部でスクロールするために使用される要素。要素が提供されない場合、iOSでは `-ios predicate string:type == "XCUIElementTypeApplication"`、Androidでは `//android.widget.ScrollView'` というセレクターを使用します。デフォルトのセレクターに複数の要素が一致する場合、デフォルトでは最初に一致する要素が選択されます。<br /> <strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>スワイプする（デフォルトの）スクロール可能要素の割合。これは0から1の間の値です。デフォルトは`0.95`です。<br /><strong>決して</strong>画面の正確な上部|下部|左|右からスワイプしないでください。通知バーなどのOS/アプリ機能がトリガーされ、予期しない結果につながることがあります。<br /> <strong>モバイルネイティブアプリのみ</strong></td>
    </tr>
  </tbody>
</table>

##### 例

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```