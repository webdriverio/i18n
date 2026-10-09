---
id: mobile
title: モバイルコマンド
---

# WebdriverIOにおけるカスタムおよび拡張モバイルコマンドの紹介

モバイルアプリやモバイルWebアプリケーションのテストには、特にAndroidとiOSのプラットフォーム固有の違いに対処する際に、独自の課題が伴います。Appiumはこれらの違いに対応する柔軟性を提供しますが、多くの場合、複雑でプラットフォームに依存したドキュメント（[Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md)、[iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)）やコマンドを深く調べる必要があります。そのため、テストスクリプトの作成に時間がかかり、エラーが発生しやすく、保守も困難になりがちです。

このプロセスを簡素化するために、WebdriverIOはモバイルWebおよびネイティブアプリのテストに特化した**カスタムおよび拡張モバイルコマンド**を導入しています。これらのコマンドは、基盤となるAppium APIの複雑さを抽象化し、簡潔で直感的、かつプラットフォームに依存しないテストスクリプトを書けるようにします。使いやすさを重視することで、Appiumスクリプト開発時の余分な負担を軽減し、モバイルアプリの自動化を容易に行えるようにすることを目指しています。

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## なぜカスタムモバイルコマンドなのか？

### 1. **複雑なAPIの簡素化**
ジェスチャーや要素の操作など、一部のAppiumコマンドは冗長で複雑な構文を伴います。例えば、ネイティブのAppium APIでロングプレス操作を実行するには、`action`チェーンを手動で構築する必要があります：

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

WebdriverIOのカスタムコマンドを使えば、同じ操作を表現力豊かな1行のコードで実行できます：

```ts
await $('~Contacts').longPress();
```

これによりボイラープレートコードが大幅に削減され、スクリプトがよりクリーンで理解しやすくなります。

### 2. **クロスプラットフォームの抽象化**
モバイルアプリでは、プラットフォーム固有の処理が必要になることがよくあります。例えば、ネイティブアプリでのスクロールは[Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture)と[iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll)で大きく異なります。WebdriverIOは、基盤となる実装に関係なくプラットフォーム間でシームレスに動作する`scrollIntoView()`のような統一されたコマンドを提供することで、このギャップを埋めます。

```ts
await $('~element').scrollIntoView();
```

この抽象化により、テストの移植性が確保され、OSの違いに対応するための分岐や条件ロジックを常に用意する必要がなくなります。

### 3. **生産性の向上**
低レベルのAppiumコマンドを理解して実装する必要性を減らすことで、WebdriverIOのモバイルコマンドは、プラットフォーム固有の細かな違いに悩まされることなく、アプリの機能のテストに集中できるようにします。これは、モバイル自動化の経験が限られているチームや、開発サイクルを加速させたいチームにとって特に有益です。

### 4. **一貫性と保守性**
カスタムコマンドはテストスクリプトに統一性をもたらします。類似した操作に対してさまざまな実装を持つ代わりに、チームは標準化された再利用可能なコマンドに頼ることができます。これにより、コードベースの保守性が向上するだけでなく、新しいチームメンバーのオンボーディングのハードルも下がります。

## なぜ特定のモバイルコマンドを拡張するのか？

### 1. 柔軟性の追加
特定のモバイルコマンドは、デフォルトのAppium APIでは利用できない追加のオプションやパラメータを提供するように拡張されています。例えば、WebdriverIOはリトライロジック、タイムアウト、特定の条件でWebviewをフィルタリングする機能を追加し、複雑なシナリオをより細かく制御できるようにしています。

```ts
// 例: Webview検出のためのリトライ間隔とタイムアウトのカスタマイズ
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // 1秒ごとにリトライ
  androidWebviewConnectTimeout: 10000,    // 10秒後にタイムアウト
});
```

これらのオプションにより、追加のボイラープレートコードなしで、自動化スクリプトをアプリの動的な振る舞いに適応させることができます。

### 2. 使いやすさの向上
拡張コマンドは、ネイティブAPIに見られる複雑さや繰り返しのパターンを抽象化します。より少ないコード行でより多くの操作を実行できるため、新しいユーザーの学習曲線が緩やかになり、スクリプトの読みやすさと保守性も向上します。

```ts
// 例: タイトルによってコンテキストを切り替える拡張コマンド
await driver.switchContext({
  title: 'My Webview Title',
});
```

デフォルトのAppiumメソッドと比較して、拡張コマンドでは利用可能なコンテキストを手動で取得してフィルタリングするといった追加の手順が不要になります。

### 3. 動作の標準化
WebdriverIOは、拡張コマンドがAndroidやiOSなどのプラットフォーム間で一貫して動作することを保証します。このクロスプラットフォームの抽象化により、オペレーティングシステムに基づいた条件分岐ロジックの必要性が最小限に抑えられ、より保守しやすいテストスクリプトにつながります。

```ts
// 例: 両プラットフォームで統一されたスクロールコマンド
await $('~element').scrollIntoView();
```

この標準化によりコードベースが簡素化され、特に複数のプラットフォームでテストを自動化しているチームにとって有益です。

### 4. 信頼性の向上
リトライメカニズム、スマートなデフォルト値、詳細なエラーメッセージを組み込むことで、拡張コマンドは不安定なテスト（flaky test）が発生する可能性を低減します。これらの改善により、Webviewの初期化の遅延やアプリの一時的な状態といった問題に対して、テストが強くなります。

```ts
// 例: 堅牢なマッチングロジックを備えた拡張Webview切り替え
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

これにより、テストの実行がより予測可能になり、環境要因による失敗が起こりにくくなります。

### 5. デバッグ機能の強化
拡張コマンドは多くの場合、より豊富なメタデータを返すため、特にハイブリッドアプリにおける複雑なシナリオのデバッグが容易になります。例えば、getContextやgetContextsのようなコマンドは、タイトル、URL、表示状態など、Webviewに関する詳細な情報を返すことができます。

```ts
// 例: デバッグのための詳細なメタデータの取得
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

このメタデータは問題の特定と解決を迅速化し、デバッグ体験全体を向上させます。


モバイルコマンドを拡張することで、WebdriverIOは自動化を容易にするだけでなく、強力で信頼性が高く直感的に使えるツールを開発者に提供するという使命にも沿っています。

## ハイブリッドアプリ

ハイブリッドアプリはWebコンテンツとネイティブ機能を組み合わせたもので、自動化の際には特別な処理が必要です。これらのアプリは、ネイティブアプリケーション内でWebコンテンツをレンダリングするためにWebviewを使用します。WebdriverIOは、ハイブリッドアプリを効果的に扱うための拡張メソッドを提供しています。

### Webviewについて
Webviewは、ネイティブアプリに埋め込まれたブラウザのようなコンポーネントです：

- **Android:** WebviewはChrome/System Webviewをベースとしており、複数のページ（ブラウザのタブに似たもの）を含むことがあります。これらのWebviewの操作を自動化するにはChromeDriverが必要です。Appiumは、デバイスにインストールされているSystem WebViewまたはChromeのバージョンに基づいて必要なChromeDriverのバージョンを自動的に判断し、まだ利用できない場合は自動的にダウンロードできます。このアプローチにより、シームレスな互換性が確保され、手動でのセットアップが最小限に抑えられます。Appiumが正しいChromeDriverのバージョンを自動的にダウンロードする方法については、[Appium UIAutomator2のドキュメント](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver)を参照してください。
- **iOS:** WebviewはSafari（WebKit）によって動作し、`WEBVIEW_{id}`のような汎用IDで識別されます。

### ハイブリッドアプリの課題
1. 複数の選択肢の中から正しいWebviewを特定すること。
2. より適切なコンテキストのために、タイトル、URL、パッケージ名などの追加メタデータを取得すること。
3. AndroidとiOSのプラットフォーム固有の違いに対処すること。
4. ハイブリッドアプリで正しいコンテキストに確実に切り替えること。

### ハイブリッドアプリのための主要コマンド

#### 1. `getContext`
セッションの現在のコンテキストを取得します。デフォルトではAppiumのgetContextメソッドと同様に動作しますが、`returnDetailedContext`を有効にすると詳細なコンテキスト情報を提供できます。詳細については[`getContext`](/docs/api/mobile/getContext)を参照してください

#### 2. `getContexts`
利用可能なコンテキストの詳細なリストを返し、Appiumのcontextsメソッドを改善したものです。これにより、タイトル、URL、またはアクティブな`bundleId|packageName`を特定するための追加コマンドを呼び出すことなく、操作対象となる正しいWebviewを簡単に特定できます。詳細については[`getContexts`](/docs/api/mobile/getContexts)を参照してください

#### 3. `switchContext`
名前、タイトル、またはURLに基づいて特定のWebviewに切り替えます。マッチングに正規表現を使用するなど、追加の柔軟性を提供します。詳細については[`switchContext`](/docs/api/mobile/switchContext)を参照してください

### ハイブリッドアプリのための主な機能
1. 詳細なメタデータ：デバッグと確実なコンテキスト切り替えのための包括的な詳細情報を取得します。
2. クロスプラットフォームの一貫性：AndroidとiOSで統一された動作を提供し、プラットフォーム固有の癖をシームレスに処理します。
3. カスタムリトライロジック（Android）：Webview検出のためのリトライ間隔とタイムアウトを調整できます。


:::info 注意事項と制限
- Androidは`packageName`や`webviewPageId`などの追加メタデータを提供しますが、iOSは`bundleId`に重点を置いています。
- リトライロジックはAndroidではカスタマイズ可能ですが、iOSには適用されません。
- iOSがWebviewを見つけられないケースがいくつかあります。AppiumはWebviewを見つけるために、`appium-xcuitest-driver`向けにさまざまな追加のcapabilitiesを提供しています。Webviewが見つからないと思われる場合は、以下のいずれかのcapabilityを設定してみてください：
    - `appium:includeSafariInWebviews`：ネイティブ/Webviewアプリのテスト中に利用可能なコンテキストのリストにSafariのWebコンテキストを追加します。テストがSafariを開き、それを操作する必要がある場合に便利です。デフォルトは`false`です。
    - `appium:webviewConnectRetries`：Webviewページの検出を諦めるまでの最大リトライ回数です。各リトライ間の遅延は500msで、デフォルトは`10`回です。
    - `appium:webviewConnectTimeout`：Webviewページが検出されるまで待機する最大時間（ミリ秒）です。デフォルトは`5000`msです。

高度な例や詳細については、WebdriverIO Mobile APIのドキュメントを参照してください。
:::


---

拡充を続けるコマンド群は、モバイル自動化を身近でエレガントなものにするという私たちの取り組みを反映しています。複雑なジェスチャーを実行する場合でも、ネイティブアプリの要素を扱う場合でも、これらのコマンドはシームレスな自動化体験を生み出すというWebdriverIOの理念に沿っています。そして、私たちはここで止まるつもりはありません。追加してほしい機能があれば、ぜひフィードバックをお寄せください。リクエストは[こちらのリンク](https://github.com/webdriverio/webdriverio/issues/new/choose)からお気軽に送信してください。