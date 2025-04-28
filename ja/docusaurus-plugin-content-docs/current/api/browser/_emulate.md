---
id: emulate
title: エミュレート
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIOでは、`emulate`コマンドを使用してWeb APIをエミュレートすることができます。これらのWeb APIは、
指定したとおりに動作させることができます。以下のスコープがサポートされています：

- `geolocation`: 位置情報APIをエミュレート
- `userAgent`: ユーザーエージェントをエミュレート
- `colorScheme`: カラースキームをエミュレート
- `onLine`: オンラインステータスをエミュレート
- `device`: 特定のモバイルまたはデスクトップデバイスをエミュレート
- `clock`: システムクロックをエミュレート

`emulate`コマンドは、エミュレーションをリセットするために呼び出すことができる関数を返します。これは
テストやテストスイートの後にエミュレーションをリセットしたい場合に便利です。

詳細については、[エミュレーション](/docs/emulation)ガイドラインをご覧ください。

:::info

`clock`スコープを除いて、ページをリロードせずにエミュレートされた値を変更することはできません。

:::

:::info

この機能にはブラウザのWebDriver Bidiサポートが必要です。Chrome、Edge、
Firefoxの最新バージョンではサポートされていますが、Safari __ではサポートされていません__。更新情報は[wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned)でフォローしてください。
さらに、クラウドベンダーを使用してブラウザを起動する場合は、そのベンダーがWebDriver Bidiをサポートしていることを確認してください。

:::

`EmulationOptions`オブジェクトは、スコープに基づいて以下のプロパティを持つことができます：

| スコープ      | オプション                                     |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### 使用方法

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>エミュレートしたいブラウザの機能。`clock`、`geolocation`、`userAgent`、`colorScheme`、`onLine`のいずれか</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>特定のスコープに対するエミュレーションオプション</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### 戻り値

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   エミュレーションをリセットするための関数