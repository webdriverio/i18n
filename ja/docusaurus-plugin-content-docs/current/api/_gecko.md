---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
ページ全体のスクリーンショットを撮影します。<br /><br />Firefoxコマンドです。詳細は[公式プロトコルドキュメント](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46)で確認できます。

##### 使用方法

```js
browser.fullPageScreenshot()
```


##### 戻り値

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** ページ全体のスクリーンショットを含むbase64エンコードされたPNG画像データ。


---

## getMozContext
現在有効なコンテキスト（例：`CHROME`または`CONTENT`）を取得します。<br /><br />Firefoxコマンドです。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622)で確認できます。

##### 使用方法

```js
browser.getMozContext()
```

##### 例


```js
console.log(await browser.getMozContext()); // 出力: 'CHROME'
```


##### 戻り値

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** ブラウザコンテキスト、`CHROME`または`CONTENT`のいずれか


---

## setMozContext
コマンドのターゲットコンテキストをchromeとcontent間で切り替えます。<br /><br />現在のコンテキストを変更すると、後続のすべてのコマンドに影響を与えます。`CONTENT`コンテキストは通常のウェブプラットフォームの文書権限を持ち、任意のJavaScriptを評価するのと同様です。`CHROME`コンテキストは権限が昇格され、XULツールキットへの完全なアクセスを持つブラウザのクロム自体を操作できます。<br /><br />Firefoxコマンドです。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645)で確認できます。

##### 使用方法

```js
browser.setMozContext(context)
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
      <td><code><var>context</var></code></td>
      <td>string</td>
      <td>ブラウザコンテキスト、`CHROME`または`CONTENT`のいずれか</td>
    </tr>
  </tbody>
</table>

##### 例


```js
console.log(await browser.getMozContext()); // 出力: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // 出力: 'CONTENT'
```



---

## installAddOn
現在のセッションに新しいアドオンをインストールします。この関数は後で`uninstallAddon`を使用してアドオンをアンインストールするために使用できるIDを返します。<br /><br />Firefoxコマンドです。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668)で確認できます。

##### 使用方法

```js
browser.installAddOn(addon, temporary)
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
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>アドオンファイルのbase64文字列</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>拡張機能を一時的にインストールするかどうかを示すフラグ - 再起動時に削除されます</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// アドオンのzipファイルのバッファを作成
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Firefoxで拡張機能を読み込む
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### 戻り値

- **&lt;String&gt;**
            **<code><var>id</var></code>:** 新しくインストールされたアドオンのIDを解決するプロミス。


---

## uninstallAddOn
現在のブラウザセッションのプロファイルからアドオンをアンインストールします。<br /><br />Firefoxコマンドです。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687)で確認できます。

##### 使用方法

```js
browser.uninstallAddOn(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>アンインストールするアドオンのID</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// アドオンのzipファイルのバッファを作成
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Firefoxで拡張機能を読み込む
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```