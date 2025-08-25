---
id: headless-and-xvfb
title: テストランナーでのヘッドレス＆Xvfb
description: WebdriverIOがLinux上でのヘッドレステストにXvfbをどのように使用するか、設定オプション、CIレシピ、およびトラブルシューティング。
---

このページでは、WebdriverIOのテストランナーがXvfb（X仮想フレームバッファ）を使用してLinux上でヘッドレス実行をサポートする方法について説明します。Xvfbが役立つ場面、設定方法、およびCIやDockerでの動作について説明します。

## ネイティブヘッドレスとXvfbのどちらを使うべきか

- 可能な限りネイティブヘッドレス（例：Chrome `--headless=...`）を使用してオーバーヘッドを最小限に抑えます。
- 以下の場合はXvfbを使用します：
  - Electronやウィンドウマネージャーやデスクトップ環境を必要とするアプリをテストする場合
  - GLXやウィンドウマネージャーに依存する動作に依存している場合
  - ツールがディスプレイサーバー（`DISPLAY`）を期待している場合
  - 次のようなChromiumエラーが発生する場合：
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    ユーザーデータディレクトリの衝突エラーは誤解を招くことがありますが、これは多くの場合、ブラウザのクラッシュと即時再起動が原因で、前回のインスタンスと同じプロファイルディレクトリが再利用されることが原因です。安定したディスプレイ（Xvfbなど）を確保することでよく解決します - 解決しない場合は、ワーカーごとに一意の `--user-data-dir` を渡す必要があります。

## 設定

Xvfbの動作を制御する4つのランナーオプションがあります：

- `autoXvfb` (ブール値、デフォルト: true)
  - 使用の決定的なトグル。`false`の場合、ランナーは決してXvfbを使用しません。
  - `true`の場合、ランナーは必要に応じてXvfbを使用することがあります。

- `xvfbAutoInstall` (ブール値、デフォルト: false)
  - `xvfb-run`が存在しない場合の自動インストールを有効にします
  - falseの場合、ランナーは警告を表示し、インストールせずに続行します

- `xvfbAutoInstallMode` ('root' | 'sudo', デフォルト: 'sudo')
  - 'root': rootとして実行している場合のみインストール（sudoなし）
  - 'sudo': rootでない場合、非対話型sudo（`sudo -n`）を許可。sudoがない場合はスキップ

- `xvfbAutoInstallCommand` (文字列 | 文字列[], オプション)
  - ビルトインのパッケージマネージャー検出の代わりに使用するカスタムインストールコマンド
  - 提供された場合、このコマンドはそのまま実行され、ビルトインのインストールロジックを上書きします

- `xvfbMaxRetries` (数値, デフォルト: 3)
  - xvfbプロセスの失敗に対する再試行回数。
  - Xvfbの起動が時々失敗する可能性がある不安定なCI環境で役立ちます。

- `xvfbRetryDelay` (数値, デフォルト: 1000)
  - xvfbプロセスの失敗に対する再試行間の基本遅延（ミリ秒単位）。
  - 進行的な遅延を使用：遅延 × 試行回数（例：1000ms、2000ms、3000msなど）。

例：

```ts
export const config: WebdriverIO.Config = {
  // 必要に応じてXvfbを使用
  autoXvfb: true,

  // sudoを使用してXvfbパッケージを自動インストール
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // 必要に応じてXvfbを使用
  autoXvfb: true,

  // カスタムコマンドとsudoを使用してXvfbパッケージを自動インストール
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // 必要に応じてXvfbを使用
  autoXvfb: true,

  // sudoを使用してXvfbパッケージを自動インストール
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // 不安定なCI環境向けに再試行動作を設定
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## 検出ロジック

- ランナーは以下の場合にXvfbを検討します：

  - Linux上で実行している
  - `DISPLAY`が設定されていない（ヘッドレス環境）、またはヘッドレスブラウザフラグが渡されている

- `DISPLAY`が設定されている場合、ランナーはデフォルトでXvfbを強制せず、既存のXサーバー/ウィンドウマネージャーを尊重します。

注意事項：
- `autoXvfb: false`はXvfbの使用を完全に無効にします（`xvfb-run`でのラッピングなし）。
- `xvfbAutoInstall`は`xvfb-run`が存在しない場合のインストールのみに影響します。使用のオン/オフには影響しません。
- `xvfbAutoInstallMode`はインストール方法を制御します：'root'はroot専用インストール用、'sudo'はsudoベースのインストール用（デフォルト：'sudo'）。
- ビルトインパッケージのインストールは常に非対話的です。'sudo'モードを選択しない限りroot専用です。
- 再試行メカニズムは進行的な遅延を使用します：`xvfbRetryDelay × 試行回数`（例：1000ms、2000ms、3000msなど）。

## CIでの既存のDISPLAYの使用

CIが独自のXサーバー/ウィンドウマネージャーをセットアップしている場合（例：`Xvfb :99`とWM）、以下のいずれかを行います：

- `autoXvfb: true`のままにして、`DISPLAY`がエクスポートされていることを確認します。ランナーはそれを尊重し、ラッピングを避けます。
- または`autoXvfb: false`を設定して、ランナーからのXvfb動作を明示的に無効にします。

## CIとDockerのレシピ

GitHub Actions（ネイティブヘッドレスを使用）：

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions（Xvfbが存在しない場合の仮想ディスプレイとオプトイン）：

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker（Ubuntu/Debianの例 - xvfbの事前インストール）：

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

他のディストリビューションについては、パッケージマネージャーとパッケージ名を適宜調整してください（例：Fedora/RHELベースでは`dnf install xorg-x11-server-Xvfb`、openSUSE/SLEでは`zypper install xvfb-run`）。

## 自動インストールサポート（xvfbAutoInstall）

`xvfbAutoInstall`が有効な場合、WebdriverIOはシステムパッケージマネージャーを使用して`xvfb`をインストールしようとします。以下のマネージャーとパッケージがサポートされています：

| パッケージマネージャー | コマンド         | ディストリビューション（例）                                   | パッケージ名                   |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt             | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin など      | `xvfb`                           |
| dnf             | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite など       | `xorg-x11-server-Xvfb`           |
| yum             | `yum`           | CentOS, RHEL (レガシー)                                       | `xorg-x11-server-Xvfb`           |
| zypper          | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman          | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS など             | `xorg-server-xvfb`               |
| apk             | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install    | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

注意：
- 環境が異なるパッケージマネージャーを使用している場合、インストールはエラーで失敗します。手動で`xvfb`をインストールしてください。
- パッケージ名はディストリビューション固有です。表はファミリーごとの一般的な名前を反映しています。

## トラブルシューティング

- "xvfb-runの起動に失敗しました"
  - ランナーはXvfb関連の失敗を進行的なバックオフで自動的に再試行します。失敗が続く場合は、不安定な環境向けに`xvfbMaxRetries`と`xvfbRetryDelay`を増やしてください。

- CIで予期せずXvfbがラップされた
  - カスタム`DISPLAY` / WMセットアップがある場合は、`autoXvfb: false`を設定するか、ランナー起動前に`DISPLAY`がエクスポートされていることを確認してください。

- `xvfb-run`がない
  - 環境を変更しないようにするには`xvfbAutoInstall: false`を維持するか、ベースイメージを介してインストールするか、`xvfbAutoInstall: true`を設定してオプトインしてください。

- CIでXvfbの起動が頻繁に失敗する
  - 不安定な環境でより回復力のある動作を得るために、`xvfbMaxRetries`（例：5-10に）と`xvfbRetryDelay`（例：2000msに）を増やしてください。

## 高度な内容

- ランナーは、Xvfbが必要で利用可能な場合に、Nodeワーカーを`xvfb-run`でラップするファクトリーを通じてプロセスを作成します。
- ヘッドレスブラウザフラグ（Chrome/Edge/Firefox）はヘッドレス使用を示し、`DISPLAY`のない環境でXvfbをトリガーすることがあります。