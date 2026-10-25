---
id: headless-and-display-servers
title: ヘッドレスとディスプレイサーバー
description: テストランナーが起動する Weston または Xvfb の仮想ディスプレイを使用して、Linux の CI やコンテナ内でヘッド付きブラウザやデスクトップアプリを実行する方法について、オプション、CI レシピ、トラブルシューティングを含めて説明します。
---

Linux でディスプレイが利用できない場合、テストランナーは実行用に仮想ディスプレイサーバーを起動します。ヘッドレスモードの [Weston](https://gitlab.freedesktop.org/wayland/weston)、またはフォールバックとして [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml)（X Virtual Framebuffer）です。このページでは、どのような場合に起動されるのか、その設定方法、そして CI や Docker での動作について説明します。ほとんどの環境では、イメージに Weston または Xvfb をインストールするか、設定で `displayServerAutoInstall: true` を指定するだけで済みます。

## 仮想ディスプレイとネイティブヘッドレスの使い分け

仮想ディスプレイは、CI ランナーやコンテナなど画面が存在しない環境で、ブラウザやアプリに画面を提供します。次の場合は仮想ディスプレイを使い続けてください。

- 実際のウィンドウを必要とするデスクトップアプリをテストする場合。
- テストでヘッド付きブラウザが必要な場合。たとえば、表示されたブラウザで撮影したスクリーンショットのベースラインと一致させる場合など。
- [トラブルシューティング](#troubleshooting)で説明しているように、Chrome が `DevToolsActivePort file doesn't exist` や `user data directory is already in use` で起動に失敗する場合。

表示されるウィンドウを必要としないブラウザテストでは、Chrome の `--headless=new` などのネイティブヘッドレスモードの方がオーバーヘッドが少なくなります。その場合は `displayServerEnabled: false` を設定してください。設定しないと、テストランナーはディスプレイサーバーを起動したままになります。すべてのブラウザをクラウドサービスやリモートグリッドで実行する場合も、ローカルでディスプレイを必要とするものがないため、同様に設定してください。

## 仕組み

テストランナーは、いずれかのサービスの `onPrepare` フックが実行される前にディスプレイサーバーを 1 つ起動し、その環境変数を `process.env` に設定します。

| 変数 | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | 設定されない |
| `DISPLAY` | 設定されない | `:0` などの最初の空きディスプレイ |
| `XDG_RUNTIME_DIR` | 実行用の `/tmp` 配下のプライベートディレクトリ | 変更なし |
| `XDG_SESSION_TYPE`、`GDK_BACKEND`、`ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

ワーカーはこれらの変数を継承し、サービスが `onPrepare` で起動するドライバーやアプリも同様に継承します。ブラウザや GUI ツールキットは、これらの変数をもとに Wayland か X11 を選択します。Weston の場合、プライベートな `XDG_RUNTIME_DIR` が実行中は既存の値を置き換えます。

ディスプレイサーバーは `onComplete` フックが完了するまで動作し続けるため、サービスは終了処理中もディスプレイを使用できます。その後、テストランナーはディスプレイサーバーを停止し、以前の値を復元します。Ctrl+C を含め、プロセスがそれより前に終了した場合は、ディスプレイサーバーも一緒に終了されます。

テストランナーがディスプレイサーバーを起動するのは、次のすべての条件を満たす場合のみです。

- Linux 上で実行されている。
- `DISPLAY` と `WAYLAND_DISPLAY` のどちらも設定されていない。
- `displayServerEnabled` が `false` ではない。

ディスプレイがすでに存在する場合、テストランナーはそれを使用し、何も起動しません。CI が起動した Weston などによって `WAYLAND_DISPLAY` のみが設定されている場合でも、テストランナーは実行中 `XDG_SESSION_TYPE`、`GDK_BACKEND`、`ELECTRON_OZONE_PLATFORM_HINT` を `wayland` に設定します。これにより、SSH ログインから継承された `XDG_SESSION_TYPE=tty` のように、サーバーが存在しない X11 へブラウザを向かわせてしまう値を上書きし、ブラウザが正しいディスプレイを使用するようにします。この処理は `displayServerEnabled: false` の場合でも行われます。このオプションはディスプレイサーバーを起動するかどうかのみを制御するためです。

### 使用されるディスプレイサーバー

デフォルトの `displayServer: 'auto'` では、テストランナーはまず Weston を試し、次に Xvfb を試します。インストールを行う前にインストール済みのサーバーが試されるため、Weston をインストールする代わりに既存の Xvfb が使用されます。Weston の起動に失敗した場合、テストランナーは Xvfb にフォールバックします。どのディスプレイサーバーも起動しなかった場合、テストランナーは警告をログに出力し、ディスプレイサーバーなしで実行を続行します。`displayServer: 'wayland'` または `displayServer: 'xvfb'` を指定した場合、テストランナーはそのサーバーのみを試します。

Weston 10 以降がサポートされています。Ubuntu 22.04 と Debian 11 には Weston 9 が含まれており、EPEL を有効にした Enterprise Linux 9 では Weston 8 が提供されるため、これらの環境では `displayServer: 'xvfb'` を設定してください。Weston は Xwayland なしで起動するため、`DISPLAY` は提供されません。`xdotool`、`xclip`、Java アプリなど、テストやツールで X11 が必要な場合は `displayServer: 'xvfb'` を設定してください。

### ウィンドウのフォーカス

すべてのワーカーは同じディスプレイを使用します。WebdriverIO v9 では、各ワーカーが `xvfb-run` でラップされ、それぞれ専用のディスプレイを持っていたため、ブラウザは常にフォーカスを持っていました。現在は、Chrome や Edge などの Chromium ベースのブラウザがフォーカスを持たない場合があります。Weston ではどのウィンドウもフォーカスを得られず、Xvfb では最後に開いたウィンドウのみがフォーカスを持ちます。WebDriver の入力はページに届きますが、`document.hasFocus()` は `false` を返し、`focus` イベントは発火せず、`:focus` スタイルも適用されません。テストがフォーカスに依存している場合は、フォーカスエミュレーションを有効にしてください。これはページの読み込み後も維持される、実験的な Chrome DevTools Protocol（CDP）コマンドです。

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Firefox は WebDriver 下ではページをフォーカスされているものとして扱うため、影響を受けません。

### スタンドアロンスクリプト

テストランナーはディスプレイサーバーを自動的に起動します。`remote()` を呼び出すスタンドアロンスクリプトでは、`@wdio/display-server` の `startDisplayDaemonFromConfig` を使ってディスプレイサーバーを起動できます。この関数は同じ `displayServer*` オプションを受け取り、ブラウザが継承できるようにディスプレイの変数を `process.env` に設定し、`stop()` 時にそれらを復元します。

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// Linux 以外、X11 ディスプレイがすでに存在する場合、または何も起動しなかった場合は null を返します。
// 既存の Wayland ディスプレイがある場合は、stop() で設定したセッション変数を復元するハンドルを返します。
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

[既存のディスプレイを使用する](#using-an-existing-display)で説明しているように、スクリプトを `xvfb-run` の下で実行することもできます。

## ブラウザのセットアップ

### WebdriverIO が起動するブラウザ

以下のブラウザは設定不要です。

- Chrome および Edge 140 以降、Chrome for Testing 135 以降は、ディスプレイサーバーが設定する `XDG_SESSION_TYPE=wayland` に従います。
- それより古い Chrome と Edge は `XDG_SESSION_TYPE` を無視します。これらに対しては、X サーバーなしで Wayland が動作している間、WebdriverIO が起動するすべての Chrome と Edge の引数に `--ozone-platform=wayland` を追加します。ただし、引数ですでに `--ozone-platform` または `--headless` が設定されている場合は除きます。
- Electron アプリ: Electron 38 以降は `XDG_SESSION_TYPE` に従い、Electron 28 から 37 はディスプレイサーバーが同じく設定する `ELECTRON_OZONE_PLATFORM_HINT` に従います。Electron 27 以前は `--ozone-platform=wayland` フラグに依存しており、WebdriverIO は Chromedriver を通じてアプリを起動する際にこのフラグを追加します。
- Firefox および Tauri アプリなどの GTK アプリは、`WAYLAND_DISPLAY` と `GDK_BACKEND` から Wayland を選択します。Firefox 120 より前のバージョンはテストされていません。

### WebdriverIO が起動しないブラウザ

グリッドやクラウドサービス上のブラウザは、リモートホストのディスプレイで動作するため、設定は不要です。

自分で起動したドライバー、Appium サーバー、サービス独自のランチャーなど、WebdriverIO 以外が起動するローカルブラウザには、WebdriverIO の `--ozone-platform=wayland` フラグが付与されません。Chrome および Edge 140 以降、Electron 28 以降はセッション変数に従うためこのフラグは不要ですが、古い Chrome と Edge では必要です。対応方法はブラウザがいつ起動するかによって異なります。

- **実行中**、たとえばサービスの `onPrepare` から起動する場合、新しいブラウザはディスプレイとセッション変数を継承するため、何も必要ありません。古い Chrome と Edge の場合は、次のいずれかを行います。
  - Xvfb を使用するために `displayServer: 'xvfb'` を設定する。
  - Weston を使用するために `displayServer: 'wayland'` を設定し、引数に `--ozone-platform=wayland` を追加する。
- **WebdriverIO より前**、たとえば前の CI ステップや別のシェルから起動する場合、WebdriverIO が起動したディスプレイサーバーの変数を継承しないため、それを使用できません。[既存のディスプレイを使用する](#using-an-existing-display)で説明しているように自分でディスプレイを起動し、次のいずれかを行います。
  - Xvfb を使用する。この場合、追加の作業は不要です。
  - Weston を使用し、`XDG_SESSION_TYPE=wayland`（Chrome および Edge 140 以降、Electron 38 以降）または `ELECTRON_OZONE_PLATFORM_HINT=wayland`（Electron 28 から 37）をエクスポートし、古い Chrome と Edge の引数に `--ozone-platform=wayland` を追加する。

## 設定

すべてのオプションは[設定リファレンス](/docs/configuration#displayserverenabled)に記載されています。例:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // ディスプレイサーバーがインストールされていない場合はインストールする
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // 常に小さいサイズの Xvfb を使用し、root コンテナを前提としたカスタムコマンドでインストールする
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

カスタムコマンドは両方のサーバーで共通です。`displayServer: 'auto'` の場合、まず Weston 用に実行され、Weston がまだ利用できないか起動に失敗し、かつ Xvfb がまだ存在しない場合にのみ、Xvfb 用に再度実行されます。この例のように、`displayServer` をコマンドがインストールするサーバーに設定してください。

v9 のオプション `autoXvfb` と `xvfb*` は非推奨となり、v11 で削除される予定です。代替オプションについては [v10 移行ガイド](/docs/v10-migration#virtual-displays-on-linux)を参照してください。

## CI と Docker

イメージにディスプレイサーバーをあらかじめインストールするか、`displayServerAutoInstall: true` を設定して実行開始時にインストールしてください。

### ディスプレイサーバーの事前インストール

#### Weston

Ubuntu 24.04 または Debian 12 以降の場合:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

RHEL 10 および Oracle Linux 10 では、[EPEL のドキュメント](https://docs.fedoraproject.org/en-US/epel/getting-started/)に従って EPEL と CodeReady Builder を自分で有効にしてから、`weston` をインストールしてください。

[既存のディスプレイを使用する](#using-an-existing-display)のように、テストランナーを独自の Weston でラップする場合は、`xwayland-run` もインストールしてください。これは Debian 13、Ubuntu 24.04、Fedora、openSUSE Tumbleweed でパッケージ化されています。これがない場合は、独自の `XDG_RUNTIME_DIR` と `WAYLAND_DISPLAY` を指定して Weston をバックグラウンドで起動し、WebdriverIO を起動する前にそのソケットを待機する必要があります。あるいは、Xvfb を使用してください。

#### Xvfb

Ubuntu または Debian の場合:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 と Debian 11 に含まれる Weston は古すぎるため、これらの環境では Xvfb を使用してください。Xvfb のみがインストールされている場合、テストランナーは追加の設定なしでそれを使用します。

その他のディストリビューションについては、[自動インストールのサポート](#automatic-installation-support)のパッケージ名を使用してください。

### 既存のディスプレイを使用する

CI がすでにディスプレイを提供している場合、テストランナーはそれを使用し、何も起動しません。

Weston を使用するには、`xwayland-run` パッケージの `wlheadless-run` でテストランナーをラップします。これにより Weston にプライベートなランタイムディレクトリが与えられ、ソケットの準備が整うまで待機します。フラグはテストランナーが起動する Weston と同じです。

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Xvfb を使用するには、`xvfb-run` でテストランナーをラップします。

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## 自動インストールのサポート

`displayServerAutoInstall` は以下のパッケージマネージャーで動作します。インストールは非対話的に行われ、240 秒でタイムアウトします。その他のパッケージマネージャーを使用している場合は、ディスプレイサーバーを自分でインストールしてください。

| パッケージマネージャー | ディストリビューション | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu、Debian | `weston` | `xvfb` |
| `dnf` | Fedora、CentOS Stream、RHEL、Rocky Linux、AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE、SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux、Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- Arch Linux は部分的なアップグレードをサポートしていないため、インストール時にシステム全体のアップグレードである `pacman -Syu` が実行されます。古いイメージでは 240 秒の制限を超える可能性があるため、その場合はディスプレイサーバーを事前にインストールしてください。
- Enterprise Linux 10 には Xvfb がなく、Weston は CRB を必要とする EPEL でのみ提供されています。CentOS Stream、AlmaLinux、Rocky Linux では、インストール時に両方が有効化され、有効なままになります。RHEL と Oracle Linux では、[ディスプレイサーバーの事前インストール](#preinstalling-a-display-server)で説明しているように、自分でセットアップしてください。

## ログ

ディスプレイサーバーはランチャープロセス内で動作するため、そのメッセージはランチャーログに出力されます。`outputDir` 内の `wdio.log`、または `outputDir` が設定されていない場合はターミナルです。ログには、どのディスプレイサーバーが起動したか、およびそれが設定した変数が表示されます。より詳細な情報が必要な場合は、ログレベルを上げてください。

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## トラブルシューティング

### Chrome が `DevToolsActivePort file doesn't exist` で失敗する

完全なメッセージは `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)` です。よくある原因は、ヘッド付き Chrome がウィンドウを開くためのディスプレイがないことです。[ランチャーログ](#logs)で起動したディスプレイサーバーを確認してください。何も起動していない場合は、[ランチャーログに `No display server could be started` と表示される](#the-launcher-log-shows-no-display-server-could-be-started)を参照してください。テストで表示されるウィンドウが不要な場合は、[仮想ディスプレイとネイティブヘッドレスの使い分け](#when-to-use-a-virtual-display-vs-native-headless)で説明しているように、代わりにネイティブヘッドレスモードを使用してください。

### Chrome が `user data directory is already in use` で失敗する

完全なメッセージは `session not created: probably user data directory is already in use` で始まります。このメッセージは誤解を招くことが多く、通常はブラウザがクラッシュし、以前のインスタンスのプロファイルディレクトリで再起動したことを意味します。安定したディスプレイがあれば解決することが多いです。解決しない場合は、ワーカーごとに一意の `--user-data-dir` を渡してください。

### ランチャーログに `No display server could be started` と表示される

完全なメッセージは `No display server could be started; continuing without a virtual display` です。ディスプレイサーバーがインストールされていないか、何も起動しませんでした。その前のメッセージに理由が示されています。

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` または `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: 何もインストールされておらず、自動インストールも無効です。
- `wayland failed to start: ...` または `xvfb failed to start: ...`: その後にサーバーのエラー出力が続きます。
- `Failed to install Weston` または `Failed to install Xvfb`: インストールに失敗しました。
- `wayland still not found after installing` または `xvfb still not found after installing`: インストールは成功しましたが、そのサーバーが提供されませんでした。たとえば、カスタムの `displayServerAutoInstallCommand` がもう一方のサーバーのみをインストールする場合です。`displayServer` をコマンドがインストールするサーバーに設定してください。

イメージに Weston または Xvfb をインストールするか、`displayServerAutoInstall: true` を設定してください。

### Xvfb が `Failed to find a socket to listen on` で終了する

Xvfb は `/tmp/.X11-unix` にソケットを作成します。このディレクトリが存在する場合、モード `1777` のようにテストユーザーが書き込み可能である必要があります。

### Weston 上で Chrome または Electron が `Missing X server or $DISPLAY` で失敗する

ブラウザが Wayland ではなく X11 を使おうとしました。WebdriverIO が起動したものでない場合は、[WebdriverIO が起動しないブラウザ](#browsers-webdriverio-doesnt-launch)を参照してください。それ以外の場合は、引数から `--ozone-platform=x11` を削除してください。

### Chrome または Edge でフォーカスに依存するテストが失敗する

共有ディスプレイ上のページはフォーカスを持たない場合があるため、`document.hasFocus()` が `false` を返します。[ウィンドウのフォーカス](#window-focus)で説明しているように、フォーカスエミュレーションを有効にしてください。

### Weston 上で X11 ツールやアプリが `cannot open display` または `Can't open display` で失敗する

Weston は `DISPLAY` を提供しません。`displayServer: 'xvfb'` を設定して、テストランナーが代わりに Xvfb を起動するようにしてください。Weston を自分で起動した場合は、テストランナーは新たに起動せず既存のディスプレイを使用するため、実行を `xvfb-run` でラップしてください。

## 次のステップ

- すべての `displayServer*` オプションについては[設定](/docs/configuration#displayserverenabled)リファレンスを参照してください。
- v9 のオプション `autoXvfb` と `xvfb*` の代替については [v10 移行ガイド](/docs/v10-migration#virtual-displays-on-linux)を参照してください。
- CI でスイートを実行するには [Docker](/docs/docker) と [GitHub Actions](/docs/githubactions) を参照してください。
- Linux 上の Electron、Tauri、Dioxus については[デスクトップアプリ](/docs/platforms/desktop#linux)を参照してください。