---
id: arm64-chromedriver
title: ARM64 での Chromedriver
description: WebdriverIO が ARM64 の macOS、Windows、Linux で Chromedriver をどのようにセットアップするか、また対応する Linux ARM64 用ドライバーが存在しない場合の対処方法について説明します。
---

WebdriverIO は ARM64 上で Chromedriver を自動的にセットアップします。**macOS**（Apple シリコン）では、Chrome for Testing がすべてのバージョンに対してネイティブの `mac-arm64` Chromedriver を公開しているため、セットアップは不要です。**Windows 11 on Arm** でも設定なしで動作します。Chrome for Testing は `win-arm64` Chromedriver を公開していませんが、`win64`（x64）Chromedriver が Windows の透過的な [x64 エミュレーション](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation)上で動作し、インストール済みの ARM64 Chrome と、それ以外の場合に WebdriverIO がダウンロードする x64 の Chrome for Testing ブラウザーの両方を操作できます。**Linux ARM64** では、`153.0.8001.0` より古い Chrome バージョンについては注意が必要です。詳細は以下で説明します。

## Linux ARM64

Chrome for Testing は Chrome **`153.0.8001.0`** 以降の `linux-arm64` Chromedriver をビルドしており、WebdriverIO はそれを直接使用します。`goog:chromeOptions.binary` で指定したものなど、それより古い Chrome や Chromium の場合は、必要な Chromium のメジャーバージョンに一致する [Electron リリース](https://github.com/electron/electron/releases)に同梱されている Chromedriver をダウンロードします。Chrome for Testing には `153.0.8001.0` 未満の `linux-arm64` Chromedriver が存在せず、ミラーが提供できるものがないため、このダウンロードは `CHROMEDRIVER_CDNURL` が設定されている場合でも GitHub から行われます。オフライン環境では、[以下](#no-electron-release-ships-a-matching-chromedriver)に示すように、ディストリビューションの Chromium とドライバーを使用してください。

Chrome for Testing には `153.0.8001.0` より前の `linux-arm64` ブラウザービルドも存在しないため、`browserVersion` をそれより古いバージョンに固定する場合は、必ず ARM64 ブラウザーを指す `goog:chromeOptions.binary` と併せて指定してください。

## Electron アプリ

`wdio:electronVersion` は、すべての ARM64 プラットフォームで、指定した Electron リリースに同梱されている Chromedriver をダウンロードします。Electron アプリの場合、Electron サービスがアプリの Electron バージョンからこの値を設定します。詳細は [Capabilities](capabilities#wdioelectronversion) を参照してください。

## トラブルシューティング

### 一致する Chromedriver を同梱した Electron リリースが存在しない

145 など、一部の Chromium メジャーバージョンは Electron リリースとして出荷されたことがありません。その場合、WebdriverIO は不一致のドライバーをインストールせずにエラーで失敗します：

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

解決方法：

- **Chrome/Chromium `153.0.8001.0` 以降を使用する**ことで、Chrome for Testing がドライバーを直接提供します。
- **Debian では、Debian の Chromium とドライバーを使用します**。これらは対応する arm64 のペアです：
  ```bash
  sudo apt-get install -y chromium chromium-driver
  ```
  ```ts title="wdio.conf.ts"
  export const config: WebdriverIO.Config = {
      // ...
      capabilities: [{
          browserName: 'chrome',
          'goog:chromeOptions': { binary: '/usr/bin/chromium' },
          'wdio:chromedriverOptions': { binary: '/usr/bin/chromedriver' }
      }]
  }
  ```
- **独自の Chromedriver を用意する**には `wdio:chromedriverOptions.binary` を使用します。これによりダウンロードは完全に無効になります。

## 関連情報

- [Driver Binaries](driverbinaries)：WebdriverIO がブラウザードライバーをダウンロードおよびキャッシュする方法。Chrome for Testing が失敗した場合のフォールバックも含みます。
- [Capabilities](capabilities#wdioelectronversion)：`wdio:electronVersion` オプション。