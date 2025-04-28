---
id: emulation
title: エミュレーション
---

WebdriverIOでは、[`emulate`](/docs/api/browser/emulate)コマンドを使用してWeb APIをエミュレートし、特定のブラウザの動作をエミュレートするためのカスタム値を返すことができます。これにはアプリケーションが明示的にこれらのAPIを使用する必要があることに注意してください。

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

この機能にはブラウザのWebDriver Bidiサポートが必要です。ChromeやEdge、Firefoxの最新バージョンではサポートされていますが、Safariは**サポートしていません**。更新情報は[wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned)でフォローしてください。さらに、クラウドベンダーを使用してブラウザを起動する場合は、そのベンダーもWebDriver Bidiをサポートしていることを確認してください。

テストでWebDriver Bidiを有効にするには、capabilities設定で`webSocketUrl: true`が設定されていることを確認してください。

:::

## ジオロケーション

ブラウザのジオロケーションを特定の地域に変更します。例：

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

これにより[`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)の動作がモンキーパッチされ、指定した位置情報が返されます。

## カラースキーム

ブラウザのデフォルトのカラースキーム設定を変更します：

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

これにより、`(prefers-color-scheme: dark)`でカラースキームを照会する際の[`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)の動作がモンキーパッチされます。

## ユーザーエージェント

ブラウザのユーザーエージェントを別の文字列に変更します：

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

これにより[`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)の値が変更されます。ブラウザベンダーは徐々にユーザーエージェントを廃止していることに注意してください。

## onLineプロパティ

ブラウザのオンラインステータスを変更します：

```ts
await browser.emulate('onLine', false)
```

これはブラウザとインターネット間のネットワークトラフィックを**オフにするわけではなく**、[`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)の戻り値のみを変更します。ブラウザのネットワーク機能を変更することに興味がある場合は、[`throttleNetwork`](/docs/api/browser/throttleNetwork)コマンドを確認してください。

## クロック

[`emulate`](/docs/emulation)コマンドを使用してブラウザのシステムクロックを変更できます。これにより、時間に関連するネイティブのグローバル関数が上書きされ、`clock.tick()`または生成されたクロックオブジェクトを介して同期的に制御できるようになります。これには以下の制御が含まれます：

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

クロックはUnixエポック（タイムスタンプ0）から始まります。つまり、`emulate`コマンドに他のオプションを渡さない場合、アプリケーションで新しいDateをインスタンス化すると、1970年1月1日の時間になります。

##### 例

`browser.emulate('clock', { ... })`を呼び出すと、現在のページと以降のすべてのページのグローバル関数がすぐに上書きされます。例：

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

[`setSystemTime`](/docs/api/clock/setSystemTime)または[`tick`](/docs/api/clock/tick)を呼び出してシステム時間を変更できます。

`FakeTimerInstallOpts`オブジェクトは次のプロパティを持つことができます：

```ts
interface FakeTimerInstallOpts {
    // 指定されたUnixエポックで偽のタイマーをインストールします
    // @default: 0
    now?: number | Date | undefined;

    // 偽装するグローバルメソッドとAPIの名前の配列。デフォルトでは、WebdriverIO
    // は`nextTick()`と`queueMicrotask()`を置き換えません。例えば、
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })`は
    // `setTimeout()`と`nextTick()`のみを偽装します
    toFake?: FakeMethod[] | undefined;

    // runAll()を呼び出すときに実行されるタイマーの最大数（デフォルト：1000）
    loopLimit?: number | undefined;

    // 実際のシステム時間のシフトに基づいてモックされた時間を自動的に増加させるよう
    // WebdriverIOに指示します（例：実際のシステム時間が20ms変化するごとに、
    // モックされた時間も20ms増加します）
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // shouldAdvanceTime: trueを使用する場合にのみ関連します。実際のシステム時間が
    // advanceTimeDelta ms変化するごとに、モックされた時間をadvanceTimeDelta ms増加させます
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // それぞれのハンドラーに委任することで「ネイティブ」（つまり偽ではない）タイマーを
    // クリアするようFakeTimersに指示します。これらはデフォルトではクリアされないため、
    // FakeTimersをインストールする前にタイマーが存在していた場合、予期しない動作が
    // 発生する可能性があります。
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## デバイス

`emulate`コマンドは、ビューポート、デバイススケールファクター、ユーザーエージェントを変更することで、特定のモバイルまたはデスクトップデバイスをエミュレートすることもサポートしています。これは、決してモバイルテスト用に使用されるべきではありません。なぜなら、デスクトップブラウザエンジンはモバイルのものとは異なるからです。これは、アプリケーションが小さなビューポートサイズに特化した動作を提供している場合にのみ使用すべきです。

例えば、ユーザーエージェントとビューポートをiPhone 15に切り替えるには、次のように実行します：

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// アプリケーションをテスト...

// 元のビューポートとユーザーエージェントにリセット
await restore()
```

WebdriverIOは[定義されたすべてのデバイス](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts)の固定リストを維持しています。