---
id: targets
title: セッションターゲット
description: wdio session でブラウザ、モバイルアプリ、デスクトップアプリ、Electron アプリ、またはクラウドデバイスを開きます。
---

`wdio session open` はセッションを開始します。最初の引数はターゲットです。`default` セッションを再利用してください。`-s <name>` は、2 つのセッションを同時に必要とする場合にのみ指定します。ターゲットに Appium、デスクトップドライバー、またはクラウドの認証情報が必要な場合は、先に `npx wdio session doctor <target>` を実行してください。

Chrome、Android、Electron のプレーヤーは、同じ [WebdriverIO デモアプリ](https://github.com/webdriverio/native-demo-app)(Expo のモルモットアプリ、タグ `v2.2.0`)を操作します。Chrome と Electron は、通常のデスクトップウィンドウでローカルの Expo Web サーバーを使用します。Android は [v2.2.0 リリース apk](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk)(`com.wdiodemoapp`)をインストールします。iOS は v2.2.0 シミュレーターアプリ(`org.wdiodemoapp`)をインストールし、`touchId` を使用します。各プレーヤーはコマンドを入力し、その後ウィンドウに結果が表示されます。一時停止するか、前後のコマンドにステップ移動すると、ウィンドウを変化させた行を確認できます。

共通の流れは次のとおりです:アプリを開き、`alice@webdriver.io` / `supersecret` でログインし、ロボットのロゴ(「You found me!!!」)までたどり着き、最後に 9 ピースのパズルを完成させます。Chrome と Electron では、さらに Weather ビューで位置情報と夜の時刻を設定し、WebdriverIO トップページのアプリ内 WebView を開き、カルーセルをドラッグします。Android プレーヤーは、ネイティブのスワイプ画面をスクロールしてそのロボットまで移動します。`export` は、直前に操作したセッションの Mocha スペックを書き出します。

<a id="postcard"></a>

## ブラウザ

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome はヘッドレスで開きます。ウィンドウを表示するには `--headed` を追加してください。Chrome、Firefox、Edge は、インストールされていない場合、初回使用時にダウンロードされます。Safari には macOS が必要です。

### ヘッドレスモードでのユーザーエージェント

ヘッドレスの Chrome と Edge は、ユーザーエージェントで自身を `HeadlessChrome/<version>` と名乗ります。同じブラウザの表示ウィンドウは `Chrome/<version>` を送信します。多くのサイトはヘッドレスのトークンを含むリクエストを拒否します。Akamai は「Access Denied」と応答し、Cloudflare は「Just a moment...」を表示します。これらはページのスクリプトが実行される前に、リクエストから判断します。そのため、エージェントには、同じサイトを人が開いた場合には決して表示されないブロックページが表示されることになります。

そこで、ヘッドレスの Chrome または Edge のセッションは、同じブラウザの表示ウィンドウが送信するユーザーエージェントを送信します。これはトークンを変更するだけで、自動化を隠すものではありません:

- `navigator.webdriver` は `true` のままです。
- chromedriver 独自のマーカーは引き続きページ上に存在します。
- 自動化をチェックするサイトは、引き続きそれを検出します。

ユーザーエージェントが上書きされている間、Chrome はユーザーエージェントクライアントヒントを送信しないため、`navigator.userAgentData.brands` は空になります。この上書きには WebDriver BiDi が必要なため、`--no-bidi` で開いたセッションはヘッドレスのユーザーエージェントのままになります。

特定のユーザーエージェントを送信するには、ブラウザ引数として渡してください。その場合、セッションはユーザーエージェントを変更しません:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

それでもサイトにボットチェックが表示される場合は、`--headed` で表示ウィンドウを試してください。それもブロックされる場合、そのサイトは自動化されたブラウザを受け付けていません。チェックを突破しようとするのではなく、その旨を報告してください。

ヘッド付きの Chrome ウィンドウにはタブバーとアドレスバーが残るため、それで Electron ウィンドウと区別できます。`--viewport 1280x800` は通常のブラウザページです。Web では、アプリは左サイドバーを使用します。WebdriverIO のロゴはそのサイドバーの上部にあります。項目は Home、Weather、Web、Login、Forms、Swipe、Drag、Perms、Data です。ホーム画面には、iOS と Android と並んでブラウザとデスクトップが表示されます。

Weather は `navigator.geolocation` と `Date` を読み取ります。`geolocation 35.6762 139.6503` は東京です。これは次回の読み込み時に適用されるため、`click "aria/Weather"` の前に `reload` を実行してください。するとウィジェットに東京、21°、雨が表示されます。`emulate clock 2026-06-21T23:30:00Z` は、同じカードを昼の空から夜の空に切り替え、時刻を午後 11:30 に設定します。2 回目の `emulate clock` は 1 回目を置き換えます。

WebView タブは、アプリ内で `https://webdriver.io/` を読み込みます。ログインは約 1.5 秒待機した後、テキストが `Success` と `You are logged in!` のダイアログを開きます。その待機が画面に表示されている間、LOGIN ボタンは 200×50 のオレンジ色のコントロールのままです。`dialog accept` でダイアログを閉じます。`swipe` はモバイル専用です。カルーセルをページ送りするには、`[data-testid=Carousel]` を `aria/Next card` に 2 回ドラッグします。記録された Web ビルドは `document` 上で `pointerup` を監視しているため、ドラッグはカルーセル上で開始し、カルーセルの外にある `Next card` でポインターを離すことができます。`scroll down --px 560` で WebdriverIO のロボットが表示されます。その下のキャプションは「You found me!!!」です。パズルのピースは `aria/drag-l2` から `aria/drag-l3` までで、対応する `aria/drop-…` ターゲットにドロップします。トレイの順序は `l2`、`r3`、`r1`、`c1`、`c3`、`r2`、`c2`、`l1`、`l3` です。

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

`r3`、`r1`、`c1`、`c3`、`r2`、`c2`、`l1`、`l3` についても `drag` を繰り返してください。

<SessionTarget id="browser" />

`--viewport 1280x720` は初期サイズを設定します。`--arg` はブラウザ引数を追加し、複数回指定できます。`--profile <dir>` は、開くたびにプロファイルを保持します。

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android と iOS

Android と iOS は Appium 3 を介して実行されます。`doctor android` は、サーバーやドライバーが不足している場合、インストールコマンドとともに報告します。

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`。インストール済みの Android パッケージには `--package` と `--activity` を使用します。モバイル Web では、アプリの代わりに `--browser chrome` または `--browser safari` を使用します。`--appium-url http://127.0.0.1:4723/` は、すでに実行中のサーバーに接続します。`bs://…` のようなクラウドアプリの URL は `--app` としてそのまま渡され、ローカルファイルとしては扱われません。

<a id="native-boarding-pass"></a>

### ネイティブデモアプリ

エミュレーターまたはデバイスでは、同じモルモットアプリは v2.2.0 の apk です:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` は最大 8 分間待機します。UiAutomator2 はアプリが使用可能になる前にサーバーをインストールしてインストルメンテーションを開始するため、ブラウザの起動より時間がかかります。最初のリクエストは再試行されません。再試行すると、最初のセッションがまだインストール中の同じデバイス上で 2 つ目の Appium セッションが開始されてしまうためです。`tap "~Login"`、`fill`、そして `tap "~button-LOGIN"` で、同じメールアドレスとパスワードでログインします。画面が短い場合、LOGIN ボタンは画面外の下にあるため、そのタップの前に `~Login-screen` をスクロールしてください。`dialog accept` は成功アラートを閉じますが、そのアラートが画面に表示された後に実行する必要があります。アラートのテキストは `Success` / `You are logged in!` です。

指紋ボタンは `~button-biometric` です。指紋が登録されている場合にのみログインフォームに表示されるため、このプレーヤーではタップしません。`exec -e "await browser.fingerPrint(1)"` でシステムプロンプトに応答します(`fingerPrint` は Android 専用で、これに対応する `wdio session` サブコマンドはありません)。

`tap "~Webview"` は `https://webdriver.io/` のアプリ内 WebView です。CPU が 1 つのソフトウェアエミュレーターでは、LOADING ラベルの後に WebView レンダラーが `libmonochrome` 内で `SIGTRAP` によって終了し、ページは描画されません。プレーヤーはそのタブには触れません。

`tap "~Swipe"` でカルーセルが開きます。`swipe left` ではページ送りされません。このカルーセルは `react-native-reanimated-carousel` で、UIAutomator のスワイプでは最初のカードに跳ね戻ってしまいます。スクロールビューに対して `mobile: swipeGesture` の `exec` を繰り返すことで、ロボットとキャプション「You found me!!!」が表示されます。下端からの全画面の `swipe up` は、代わりに Android のスクリーンショット UI を開いてしまいます。`drag "~drag-l2" "~drop-l2"`(および残りの 8 組をトレイの順序で)でパズルが完成します。最後のフレームは、組み立てられたロボットとリトライのコントロールです。

`-s android` は、このセッションをブラウザのセッションと並べて保持します。それが唯一のセッションの場合は `-s android` を省略してください。`open` は apk によってすでにインストールされたパッケージとアクティビティを使用し、登録済みの指紋が保持されるよう `--no-reset` を指定します。`"~Login"` はタブのアクセシビリティラベルです。`wait` はネイティブセッションには適用されません。

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

`r3`、`r1`、`c1`、`c3`、`r2`、`c2`、`l1`、`l3` についても `drag` を繰り返してください。

<SessionTarget id="android" />

### iOS シミュレーター

同じ画面が v2.2.0 のシミュレータービルド [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip) にもあります。これを解凍し、起動済みのシミュレーターに `wdiodemoapp.app` をインストールしてください(`xcrun simctl install booted`)。バンドル ID は `org.wdiodemoapp` です。このバイナリは iPhone シミュレーター用アプリ(arm64、iOS 15.1 以降)で、macOS と Xcode が必要です。このページには iOS のプレーヤーはありません。

ログイン、スワイプ、ドラッグは Android と同じアクセシビリティラベルを使用します。`swipe left` はシミュレーターでは実行していません。Android の apk では、このカルーセルのページ送りはできません。生体認証の呼び出しは `fingerPrint` ではなく `browser.touchId(true)` です。`touchId` には、ケイパビリティ `appium:allowTouchIdEnroll` を `true` に設定する必要があります(`--capabilities` で渡します)。ログインフォームを開く前にシミュレーターで Touch ID を登録してください。そうしないと生体認証ボタンは非表示のままです。

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

残りの 8 ピースについても、Android と同じトレイの順序で `drag` を繰り返してください。

## デスクトップアプリ

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` には macOS が必要です。`windows` には Windows が必要です。`--app Root` はデスクトップに接続します。インストール済みの Windows アプリは、`--app Microsoft.WindowsCalculator` のようにアプリケーション ID で指定します。パスまたは `.exe` はファイルとして解決されます。

<a id="launch-console"></a>

## Electron、Tauri、Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` と `open dioxus ./my-app` は、サービスパッケージ自体がセッションを開始しない限り、それぞれのドライバーが `PATH` 上にある必要があります。`DISPLAY` または `WAYLAND_DISPLAY` のない Linux では、Xvfb または weston をインストールしてください。Electron はクラシックな WebDriver プロトコルのままです。アプリにフラグを転送するには `--app-arg` を渡します。環境が必要とする場合は `--app-arg=--no-sandbox` も含めます。`-` で始まる値は `=` を使う必要があります。そうしないと、厳密なパーサーがそれを独立したオプションとして扱ってしまうためです。

開くディレクトリに `electron` と `@wdio/electron-service` をインストールしてください。`main.js` は `import` を使用するため、そのディレクトリの `package.json` には `"type": "module"` が必要です(またはファイル名を `main.mjs` にしてください)。小さいディスプレイでタイトルバーが画面外に配置されないよう、ウィンドウを作業領域に合わせたサイズにします:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

以下の open コマンドはレンダラーのサンドボックスを無効にしません。一部の Linux コンテナーなど、環境がサンドボックス付きで Electron を起動できない場合にのみ `--app-arg=--no-sandbox` を追加してください。Electron プレーヤーは、アドレスバーのない 1280×800 のウィンドウで同じ Expo URL を読み込みます。ロゴ、サイドバー、天気カード、ログインカード、カルーセル、パズルはブラウザと同じです。`-s electron` は、ブラウザのデモと並べて使用するセッション名です。Electron はクラシックプロトコルのままなので、`geolocation` と `emulate clock` は BiDi ではなく Chromedriver を経由します。コマンドは Weather の前の `reload` も含めて Chrome と同じですが、成功ダイアログだけは異なります。Linux では、`dialog accept` がネイティブアラートを受け入れても、吹き出しが描画されたまま残ります。その吹き出しはページの一部ではないため、後のクリックでは届きません。この録画では `window.alert` をページ内ダイアログに置き換え、`click "aria/OK"` を実行しています。待機中、LOGIN ボタンは 200×50 のオレンジ色のコントロールのままです。カルーセル、スクロール、パズルは Chrome と同じコマンドを使用します。

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

`r3`、`r1`、`c1`、`c3`、`r2`、`c2`、`l1`、`l3` についても `drag` を繰り返してください。

<SessionTarget id="electron" />

## クラウドデバイス

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` には `browserstack`、`saucelabs`、`testingbot`、`testmu` のいずれかを指定します。プロバイダーのユーザー名とアクセスキーをエクスポートしてください。`doctor <provider>` はそれらが設定されているかを確認し、値は表示しません。`--tunnel` は、テスト対象のアプリが自分のマシン上にある場合にプロバイダーのトンネルを開始します。

## WebdriverIO の設定ファイル

`open` には、ターゲット名の代わりに設定ファイルとケイパビリティのインデックスを指定できます:

```sh
npx wdio session open ./wdio.conf.ts 0
```

TypeScript の設定ファイルは、プロジェクトに `tsx` がある場合はそれで読み込まれます。`tsx` は任意です。ない場合、設定ファイルは Node の型ストリッピングまたは jiti を通じて読み込まれ、読み込みに失敗した設定ファイルはインストール行とともに `MISSING_DEPENDENCY` を報告します。

`--hostname`、`--port`、`--path`、`--protocol` は、すでに実行中の WebDriver エンドポイントにセッションを向けます。セッションを閉じても、そのエンドポイントは停止しません。

## トラブルシューティング

| メッセージ | 対処法 |
| --- | --- |
| `MISSING_DEPENDENCY` | エラーに記載されたパッケージをインストールしてください。`doctor <target>` も同じインストール行を表示します。Electron には、開くディレクトリに `@wdio/electron-service` と `electron` が必要です。 |
| `MISSING_APPIUM_DRIVER` | エラーに記載された `npx appium driver install …` の行を実行してください。 |
| `MISSING_BINARY` | 指定されたドライバー(`tauri-driver` または `wdio-dioxus-driver`)を `PATH` 上に置いてください。 |
| `MISSING_CREDENTIALS` | エラーに記載された変数をエクスポートしてください。 |
| `NOT_SUPPORTED` | `macos` は macOS 専用、`windows` は Windows 専用です。`swipe` はモバイル専用です。Chrome と Electron では、`[data-testid=Carousel]` を `aria/Next card` にドラッグしてください。 |
| `No dialog open.` | アラートが開いていません。Android では、`dialog accept` の前に成功アラートが表示されるまで待ってください。Linux の Electron では、`acceptAlert` の後もネイティブの吹き出しが描画されたまま残り、ダイアログがないと報告されることがあります。プレーヤーは代わりにページ内ダイアログと `click "aria/OK"` を使用します。 |
| `The instrumentation process cannot be initialized` | UiAutomator2 が時間内にリッスンを開始しませんでした。セッションは、サーバーのインストールに最大 180 秒を費やした後、その起動に 240 秒を許容します。ソフトウェアエミュレーターでは、CPU 1 つと 720×1280 のスキンで v2.2.0 の apk がホーム画面まで到達します。CPU 2 つの 1080×2400 イメージでは `system_server` が ANR を起こし、サーバーがリッスンすることはありません。 |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | Appium がまだセッションを作成している間にクライアントが諦めました。Android と iOS は最初のリクエストに対して 480 秒待機し、再送信はしません。 |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` はブラウザセッション用です。 |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` は Android 用の呼び出しです。iOS では `browser.touchId` を使用します。 |
| `App not found:` | 存在する apk のパスを渡すか、すでにインストール済みのアプリには `--package` と `--activity` を使用してください。 |
| `Pass --package <id>.` | Android では、`deeplink` に `--package` が必要です。 |

## 次のステップ

- [スナップショットと参照](/docs/session/snapshots) — `open` の後に画面を読み取る
- [コマンド](/docs/session-commands) — すべての `open` フラグ
- [wdio session](/docs/session) — 基本のループ