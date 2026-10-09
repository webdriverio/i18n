---
id: emulation
title: エミュレーション
description: "emulate コマンドを使用して、位置情報、メディア機能、ユーザーエージェント、ネットワーク、ロケール、タイムゾーン、画面、デバイスをエミュレートします。"
---

WebdriverIO では、[`emulate`](/docs/api/browser/emulate) コマンドを使用してブラウザの動作をエミュレートできます。このコマンドは、現在のトップレベルのブラウジングコンテキストに対して [WebDriver BiDi エミュレーションモジュール](https://w3c.github.io/webdriver-bidi/#module-emulation) を操作します。オーバーライドは即座に適用されます。ページをリロードする必要はありません。ただし `clock` は例外です。BiDi には clock コマンドがないため、このスコープでは引き続きフェイクタイマーをインストールします。

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

この機能を使用するには、ブラウザが WebDriver Bidi をサポートしている必要があります。最近のバージョンの Chrome、Edge、Firefox はサポートしていますが、Safari は __サポートしていません__。最新情報については [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned) をご確認ください。また、ブラウザの起動にクラウドベンダーを使用している場合は、そのベンダーも WebDriver Bidi をサポートしていることを確認してください。

テストで WebDriver Bidi を有効にするには、capabilities に `webSocketUrl: true` が設定されていることを確認してください。

コマンドを実装していないブラウザは、`unknown command` や `unsupported operation` といった独自のエラーで呼び出しを拒否します。WebdriverIO はそのエラーを返します。プリロードスクリプトや CDP へのフォールバックは行いません。

:::

`emulate` は、そのスコープをクリアする関数を返します。[`browser.restore()`](/docs/api/browser/restore) は、アクティブなすべてのスコープ、または指定したスコープをクリアします。

## 位置情報

ブラウザの位置情報を特定の地域に変更します。例：

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // 出力: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

これは `getCurrentPosition` や `watchPosition` を含む、ブラウザの位置情報スタックを使用します。例のように、ページによっては位置情報の権限を付与する必要があります。オプションのフィールドは `accuracy`、`altitude`、`altitudeAccuracy`、`heading`、`speed` です。

ページが位置情報の読み取りに失敗するようにするには：

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## カラースキームとその他のメディア機能

`prefers-color-scheme` メディア機能を変更します：

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // 出力: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // 出力: "#000000"
```

これにより、CSS の `@media (prefers-color-scheme)` と [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) の両方が更新されます。リロードは不要です。

`media` は、その他のメディア機能のマップを設定します。例えば、モーションの軽減：

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` と `media` は 1 つのマップを共有します。BiDi コマンドはマップ全体を置き換えるため、後の呼び出しが優先されます。どちらかのスコープを復元すると、マップがクリアされます。

`forcedColors` は別のコマンドです。これは `forced-colors` メディア機能ではなく、強制カラーテーマ（`'light'` または `'dark'`）を設定します。そのメディア機能は `media` 上で `forcedColors: 'none' | 'active'` として指定します。

## ユーザーエージェント

ブラウザのユーザーエージェントを次のように変更します：

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

これはブラウザのユーザーエージェントのオーバーライドです。`navigator.userAgent` プロパティをパッチするものではありません。ブラウザベンダーはユーザーエージェントを段階的に非推奨にしています。

## オンライン状態

ブラウジングコンテキストをオフラインにします：

```ts
await browser.emulate('onLine', false)
```

`false` は `{ type: 'offline' }` を指定して `emulation.setNetworkConditions` を送信します。Fetch、WebSocket、WebTransport は失敗し、[`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) もそれに従います。`true` を指定するか、スコープを復元すると、この状態がクリアされます。スループットとレイテンシは引き続き [`throttleNetwork`](/docs/api/browser/throttleNetwork) で設定します。BiDi のネットワーク条件はオフラインのみをサポートしています。

## ロケール、タイムゾーン、タッチ

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` は BCP 47 タグです。`timezone` は IANA 名、または `+02:00` のようなオフセットです。`touch` は `maxTouchPoints` であり、`>= 1` の整数である必要があります。`touch` を復元するとオーバーライドがクリアされます。`0` を設定することはできません。

## 画面、向き、レイアウト

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` は Web に公開される画面領域であり、ビューポートではありません。`orientation.natural` は `'portrait'` または `'landscape'` です。`orientation.type` は `'portrait-primary'`、`'portrait-secondary'`、`'landscape-primary'`、`'landscape-secondary'` のいずれかです。

`viewportMeta` は `true` のみを受け付けます。仕様上の値は `true | null` であるため、`false` はありません。復元するとクリアされます。`textLayout` は `'mobile'` のみを受け付けます。`scripting` は無効化のみ可能です。仕様ではスクリプトを強制的に有効にすることはできません。`scrollbar` は `'classic'` または `'overlay'` です。

## クロック

[`emulate`](/docs/emulation) コマンドを使用して、ブラウザのシステムクロックを変更できます。これは時間に関連するネイティブのグローバル関数をオーバーライドし、`clock.tick()` または生成されたクロックオブジェクトを介してそれらを同期的に制御できるようにします。制御対象には以下が含まれます：

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

クロックは Unix エポック（タイムスタンプ 0）から開始します。つまり、`emulate` コマンドに他のオプションを渡さない場合、アプリケーション内で new Date をインスタンス化すると、その時刻は 1970 年 1 月 1 日になります。

##### 例

`browser.emulate('clock', { ... })` を呼び出すと、現在のページおよびそれ以降のすべてのページのグローバル関数が即座に上書きされます。例：

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

[`setSystemTime`](/docs/api/clock/setSystemTime) または [`tick`](/docs/api/clock/tick) を呼び出すことで、システム時刻を変更できます。

`FakeTimerInstallOpts` オブジェクトには以下のプロパティを指定できます：

 ```ts
interface FakeTimerInstallOpts {
    // 指定された Unix エポックでフェイクタイマーをインストールします
    // @default: 0
    now?: number | Date | undefined;

    // フェイクにするグローバルメソッドと API の名前の配列。デフォルトでは、WebdriverIO は
    // `nextTick()` と `queueMicrotask()` を置き換えません。例えば、
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` は
    // `setTimeout()` と `nextTick()` のみをフェイクにします
    toFake?: FakeMethod[] | undefined;

    // runAll() を呼び出したときに実行されるタイマーの最大数（デフォルト: 1000）
    loopLimit?: number | undefined;

    // 実際のシステム時刻の変化に基づいて、モック時刻を自動的に進めるよう WebdriverIO に指示します
    // （例: 実際のシステム時刻が 20ms 変化するごとに、モック時刻が 20ms 進みます）
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // shouldAdvanceTime: true と併用する場合にのみ関係します。実際のシステム時刻が
    // advanceTimeDelta ms 変化するごとに、モック時刻を advanceTimeDelta ms 進めます
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // 'ネイティブ'（つまりフェイクではない）タイマーを、それぞれのハンドラーに委譲して
    // クリアするよう FakeTimers に指示します。これらはデフォルトではクリアされないため、
    // FakeTimers のインストール前にタイマーが存在していた場合、予期しない動作を引き起こす可能性があります。
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## デバイス

`emulate` コマンドは、特定のモバイルデバイスやデスクトップデバイスのエミュレートもサポートしています。デスクトップのブラウザエンジンはモバイルのものとは異なるため、これをモバイルテストに使用することは決して推奨されません。アプリケーションが小さいビューポートサイズに対して特定の動作を提供する場合にのみ使用してください。

デバイスに対して、WebdriverIO は以下を行います：

- ディスクリプタからユーザーエージェントを設定する
- ビューポートとデバイススケールファクターを設定する
- ディスクリプタがタッチを持つ場合は `maxTouchPoints` を `1` に設定し、それ以外の場合はタッチをクリアする
- ディスクリプタがモバイルの場合はモバイルテキストレイアウトとビューポートメタタグを設定し、それ以外の場合はそれらをクリアする

デバイス名から画面サイズや向きを推測することはありません。ビューポートは `screen.width` ではありません。それらには `screen` および `orientation` スコープを使用してください。

ビューポートの変更は、`emulate` が呼び出された時点で現在のトップレベルコンテキストに送信されます。デバイスを復元すると、別のウィンドウに切り替えた後でも、そのコンテキストのサイズが変更されます。

ブラウザがこれらのコマンドのいずれかを拒否した場合、以前のユーザーエージェント、ビューポート、タッチ、テキストレイアウト、ビューポートメタが元に戻され、エラーが返されます。カスタムのユーザーエージェントや `setViewport` のサイズがデフォルトに置き換えられることはありません。

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// アプリケーションをテストする ...

// ユーザーエージェント、ビューポート、タッチ、テキストレイアウト、ビューポートメタをリセットする
await restore()
```

WebdriverIO は [定義済みのすべてのデバイス](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts) の固定リストを管理しています。