---
id: browsingContext
title: BrowsingContext オブジェクト
description: タブ、ウィンドウ、フレームをオブジェクトとして保持し、セッションを切り替えることなく、その中で直接コマンドを実行します。
---

ブラウジングコンテキストとは、オブジェクトとして保持するタブ、ウィンドウ、またはフレームのことです。ブラウジングコンテキストに対して呼び出したコマンドはそのタブまたはフレーム内で実行され、セッションや他のすべてのコンテキストはそのままの状態に保たれます。v10 以降、WebdriverIO は WebDriver BiDi セッションにおいてこの方法でタブ、ウィンドウ、フレームを扱い、そこでは `switchWindow()` と `switchFrame()` を置き換えます。

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## ブラウジングコンテキストを取得する

| 呼び出し | 戻り値 |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | ナビゲーション後の、セッションの最初のトップレベルコンテキスト。`browser.url()` は常にこのコンテキストをナビゲートします。 |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | ページの読み込みが完了した後の、新しいタブ（`type: 'tab'`）またはウィンドウ。セッションはそこへ切り替わりません。 |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | 開いているすべてのトップレベルコンテキスト（タブとウィンドウ。フレームは含まない）。例えば、ページ自身が開いたタブなど。 |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | コンテキストのフレーム。クロスオリジンやネストされたフレームも含みます。 |

オブジェクトを保持し、それに対してコマンドを呼び出してください。切り替える対象となる「現在の」タブやフレームは存在しないため、コンテキストを並列に使用することもできます：

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## WebDriver BiDi セッションと Classic セッション

ブラウジングコンテキストには WebDriver BiDi セッションが必要です。これは v10 以降、Chrome、Edge、Firefox でのデフォルトです。Appium や Safari などの WebDriver Classic セッションでは、セッションの現在のコンテキストしか存在しません。その場合：

- `browser.url()` はブラウザの代替オブジェクトを返します。`$`、`execute`、`getTitle` などのコマンドはブラウザ上で実行され、`url`、`isFrame`、`parent` は現在のページを表し、`contextId` は `undefined` になります。
- `frame()`、`navigate()`、`activate()` はリジェクトされ、代わりに使用すべき Classic コマンドを示します：[`browser.switchFrame()`](/docs/api/browser/switchFrame)、[`browser.url()`](/docs/api/browser/url)、または [`browser.switchWindow()`](/docs/api/browser/switchWindow)。

同じコードを両方の種類のセッションで実行する場合は、`browser.isBidi` を確認してください。

## プロパティ

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| `contextId` | `String` | WebDriver BiDi のブラウジングコンテキスト ID。Classic セッションでは `undefined`。 |
| `url` | `String` | `browser.url()`、`navigate()`、または `newWindow()` によってコンテキストが最後にナビゲートされた URL。ページ自身が行うナビゲーション（リンク、`location`、`history.pushState`）は、[`getUrl()`](/docs/api/browsingContext/getUrl) の後にのみ反映されます。 |
| `isFrame` | `Boolean` | フレームの場合は `true`、タブまたはウィンドウの場合は `false`。 |
| `parent` | `BrowsingContext \| undefined` | フレームの場合、`frame()` が呼び出されたコンテキスト（より深くネストされたフレームの場合は、その間にあるフレーム）。タブまたはウィンドウの場合は `undefined`。 |
| `browser` | `Browser` | セッションの [ブラウザオブジェクト](/docs/api/browser)。 |
| `request` | `Request \| undefined` | `browser.url()` または `navigate()` による最後のナビゲーションの読み込み情報：URL、ヘッダー、レスポンス、リダイレクト、およびページが行ったリクエスト。 |
| `sessionId` | `String` | セッション ID。`browser.sessionId` と同じ。 |
| `capabilities` | `Object` | セッションのケイパビリティ。`browser.capabilities` と同じ。 |
| `options` | `Object` | WebdriverIO のオプション。`browser.options` と同じ。 |
| `isBidi` | `Boolean` | セッションが WebDriver BiDi を使用しているかどうか。 |
| `isMobile` | `Boolean` | セッションがモバイルデバイスを自動化しているかどうか。 |

## メソッド

### ブラウジングコンテキストのコマンド

これらのコマンドは、呼び出されたコンテキストに対して作用します。それぞれに専用のリファレンスページがあります。

| コマンド | 詳細 |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | このコンテキストのフレームを、独立したブラウジングコンテキストとして取得します。 |
| [`navigate`](/docs/api/browsingContext/navigate) | `browser.url()` と同じオプションで、このコンテキストをナビゲートします。 |
| [`refresh`](/docs/api/browsingContext/refresh) | このコンテキストを再読み込みします。フレームは自身のドキュメントのみを再読み込みします。 |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | このタブまたはウィンドウの履歴を移動します。 |
| [`activate`](/docs/api/browsingContext/activate) | このタブまたはウィンドウを前面に表示します。 |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | このタブまたはウィンドウを閉じます。 |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | このコンテキストに表示されているドキュメントのタイトルまたは URL を読み取ります。 |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | このコンテキストで開いているユーザープロンプトに応答するか、その内容を読み取ります。 |

### コンテキスト内で実行されるブラウザコマンド

これらは同名の [ブラウザコマンド](/docs/api/browser) であり、セッションの最初のコンテキストではなく、このコンテキストに対して適用されます。引数も同じです。

| コマンド | ブラウジングコンテキストでの動作 |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | このコンテキストのドキュメント内で要素を検索します。 |
| [`execute`](/docs/api/browser/execute) | このコンテキストのドキュメント内でスクリプトを実行します。 |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | このコンテキストに入力を送信します。バックグラウンドのタブであっても送信されます。 |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | このコンテキストをキャプチャします。 |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | このコンテキストのストレージパーティションの Cookie を読み取り、変更します。 |
| [`setViewport`](/docs/api/browser/setViewport) | このタブまたはウィンドウのビューポートのサイズを変更します。 |
| [`addInitScript`](/docs/api/browser/addInitScript) | このタブまたはウィンドウでのみ、ページスクリプトより前にスクリプトを実行します。 |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | このタブまたはウィンドウのリクエストのみをモックします。モックはそのタブが閉じられると終了します。 |
| [`emulate`](/docs/api/browser/emulate) | このタブまたはウィンドウでのみ、位置情報や時計などのデバイスプロパティをエミュレートします。 |
| [`restore`](/docs/api/browser/restore) | エミュレーションを元に戻します。`browser.restore()` と同じです。 |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | ブラウザ上での動作と同じです。 |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // `tab` のリクエストはモックされたレスポンスを受け取り、`page` のリクエストはサーバーに到達する
})
```

### トップレベルのみ

フレームはタブの履歴、ビューポート、ネットワーク、エミュレーションを共有するため、これらのコマンドはフレーム上では `` `<command>` is only available on a top-level browsing context `` というエラーでリジェクトされます。タブに対して呼び出してください：`parent` が `undefined` になるまで `frame.parent` をたどるか、`frame()` を呼び出したコンテキストを使用します。

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### ブラウジングコンテキストでは利用できないもの

`deleteSession`、`newWindow`、`browsingContexts` などのセッションコマンドは、[ブラウザオブジェクト](/docs/api/browser) でのみ利用できます。カスタムコマンドも同様です：[`addCommand`](/docs/customcommands) と `overwriteCommand` はコンテキスト上ではリジェクトされるため、`browser` に登録してください。

### イベント

`on`、`once`、`off`、`emit`、`removeListener`、`removeAllListeners` はブラウザにリスナーを登録するため、イベントはセッション全体のものになります。例えば、[`dialog`](/docs/api/dialog) イベントは、どのタブやフレームのプロンプトに対しても発火します。

## ブラウジングコンテキストの要素

コンテキストを通じて取得した要素は、そのコンテキストに属します。`click`、`setValue`、`getText` などの要素コマンドは、そのコンテキストのドキュメント内で実行されます。バックグラウンドのタブやフレームであっても同様です。これらはドライバーと同様に WebDriver 仕様に従うため、前面のページの要素と同じ結果と同じエラー（例：`element click intercepted`）を返します。`getComputedRole` と `getComputedLabel` は、セッションの最初のコンテキスト以外のコンテキストの要素に対してはリジェクトされます。

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // 出力: "BOTTOM"
```

## トラブルシューティング

| エラー | 原因と対処法 |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | `browser.url()` または `browser.newWindow()` が返したコンテキストに対して [`frame()`](/docs/api/browsingContext/frame) を呼び出してください。 |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | `browser.url()` または `browser.newWindow()` が返したコンテキストを保持するか、`browser.browsingContexts()` でコンテキストを検索してください。 |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | セッションが Classic セッション（例：Appium や Safari）です。メッセージで示されている Classic コマンドを使用してください。 |
| `` `<command>` is only available on a top-level browsing context `` | コマンドがフレーム上で呼び出されました。フレームのタブに対して呼び出してください。[トップレベルのみ](#top-level-only) を参照してください。 |
| `` `addCommand` is only available on the browser, not on a browsing context `` | カスタムコマンドは `browser` に登録してください。 |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | フレームを含んでいたページがナビゲートされました。新しいページで `frame()` を使用してフレームを再取得してください。 |

## 関連

- [ブラウザオブジェクト](/docs/api/browser)
- [v10 への移行: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [ダイアログ](/docs/api/dialog)