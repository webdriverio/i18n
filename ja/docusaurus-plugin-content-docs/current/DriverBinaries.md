---
id: driverbinaries
title: ドライバーバイナリ
description: "WebdriverIOにブラウザドライバーを自動的にダウンロード・管理させるか、Chromedriver、Geckodriver、Edgedriver、Safaridriverを手動でセットアップします。"
---

WebDriverプロトコルに基づいた自動化を実行するには、自動化コマンドを変換してブラウザ内で実行できるブラウザドライバーをセットアップする必要があります。

## 自動セットアップ

WebdriverIO `v8.14`以降では、ブラウザドライバーを手動でダウンロードしてセットアップする必要はなくなりました。これはWebdriverIOによって処理されます。テストしたいブラウザを指定するだけで、残りはWebdriverIOが行います。

ARM64では、macOS、Windows、Linuxでドライバーのセットアップがどのように機能するか、また自動的にセットアップできない場合の対処方法について、[ARM64でのChromedriver](arm64-chromedriver)を参照してください。

### 自動化レベルのカスタマイズ

WebdriverIOには3つの自動化レベルがあります：

**1. [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers)を使用してブラウザをダウンロードしてインストールする。**

[capabilities](configuration#capabilities-1)設定で`browserName`/`browserVersion`の組み合わせを指定すると、マシン上に既存のインストールがあるかどうかに関係なく、WebdriverIOは要求された組み合わせをダウンロードしてインストールします。`browserVersion`を省略した場合、WebdriverIOはまず[locate-app](https://www.npmjs.com/package/locate-app)を使用して既存のインストールを見つけて使用しようとし、見つからない場合は現在の安定版ブラウザリリースをダウンロードしてインストールします。`browserVersion`の詳細については、[こちら](capabilities#automate-different-browser-channels)を参照してください。

:::caution

自動ブラウザセットアップはMicrosoft Edgeをサポートしていません。現在、Chrome、Chromium、Firefoxのみがサポートされています。

:::

WebdriverIOが自動検出できない場所にブラウザがインストールされている場合は、ブラウザバイナリを指定できます。これにより自動ダウンロードとインストールが無効になります。

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // または 'firefox' または 'chromium'
            'goog:chromeOptions': { // または 'moz:firefoxOptions' または 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. ドライバーをダウンロードしてインストールする：Chromedriverは[Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/)から、EdgedriverとGeckodriverは[edgedriver](https://www.npmjs.com/package/edgedriver)および[geckodriver](https://www.npmjs.com/package/geckodriver)パッケージを使用します。**

設定でドライバーの[binary](capabilities#binary)が指定されていない限り、WebdriverIOは常にこれを行います：

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // または 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // または 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // または 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

WebdriverIOはデフォルトでChrome for TestingからChromedriverをダウンロードしますが、特定のケースでは[Electronリリース](https://github.com/electron/electron/releases)を使用します：

- Electronアプリで[`wdio:electronVersion`](capabilities#wdioelectronversion)が設定されている場合。`browserVersion`と`CHROMEDRIVER_CDNURL`の両方が設定されていない限り、そのリリースを使用します。
- Chrome for TestingにChromedriverビルドがないLinux ARM64で、Chromeが`153.0.8001.0`より古い場合（[ARM64でのChromedriver](arm64-chromedriver)を参照）。同じChromiumメジャーバージョンの最新リリースを使用します。
- 障害発生時など、Chrome for Testingからのダウンロードが失敗し、`CHROMEDRIVER_CDNURL`が設定されていない場合。同じChromiumメジャーバージョンの最新リリースを使用します。

:::info

SafariドライバーはmacOSにすでにインストールされているため、WebdriverIOは自動的にダウンロードしません。

:::

:::info Firefox / Geckodriver

Firefoxはブラウザに対して（例：`stable_151.0.1`）、[Geckodriver](https://github.com/mozilla/geckodriver/releases)（例：`0.36.0`）とは異なるバージョン体系を使用しているため、`browserVersion`はドライバーのバージョン選択には**使用されません**。デフォルトでは、WebdriverIOは最新のGeckodriverをダウンロードします。特定のドライバーバージョンに固定するには、`wdio:geckodriverOptions`で`geckoDriverVersion`を設定します：

```ts
{
    capabilities: [
        {
            browserName: 'firefox',
            browserVersion: 'stable_151.0.1',
            'wdio:geckodriverOptions': {
                geckoDriverVersion: '0.36.0'
            }
        }
    ]
}
```

:::

:::caution

ブラウザの`binary`を指定して対応するドライバーの`binary`を省略すること、またはその逆は避けてください。`binary`の値が1つだけ指定されている場合、WebdriverIOはそれと互換性のあるブラウザ/ドライバーを使用またはダウンロードしようとします。しかし、一部のシナリオでは互換性のない組み合わせになる可能性があります。そのため、バージョンの非互換性による問題を回避するために、常に両方を指定することをお勧めします。

:::

**3. ドライバーを起動/停止する。**

デフォルトでは、WebdriverIOは任意の未使用ポートを使用してドライバーを自動的に起動および停止します。以下のいずれかの設定を指定すると、この機能が無効になり、ドライバーを手動で起動および停止する必要があります：

- [port](configuration#port)に任意の値を指定した場合。
- [protocol](configuration#protocol)、[hostname](configuration#hostname)、[path](configuration#path)にデフォルトとは異なる値を指定した場合。
- [user](configuration#user)と[key](configuration#key)の両方に任意の値を指定した場合。

## 手動セットアップ

以下では、各ドライバーを個別にセットアップする方法について説明します。すべてのドライバーのリストは[`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver)のREADMEで確認できます。

:::tip

モバイルやその他のUIプラットフォームのセットアップをお探しの場合は、[Appiumセットアップ](appium)ガイドをご覧ください。

:::

### Chromedriver

Chromeを自動化するには、[プロジェクトのウェブサイト](http://chromedriver.chromium.org/downloads)から直接、またはNPMパッケージを通じてChromedriverをダウンロードできます：

```bash npm2yarn
npm install -g chromedriver
```

その後、次のように起動できます：

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Firefoxを自動化するには、お使いの環境に合った最新バージョンの`geckodriver`をダウンロードし、プロジェクトディレクトリに解凍します：

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Curl', value: 'curl'},
    {label: 'Brew', value: 'brew'},
    {label: 'Windows (64 bit / Chocolatey)', value: 'chocolatey'},
    {label: 'Windows (64 bit / Powershell) DevTools', value: 'powershell'},
  ]
}>
<TabItem value="npm">

```bash npm2yarn
npm install geckodriver
```

</TabItem>
<TabItem value="curl">

Linux：

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar xz
```

MacOS（64ビット）：

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-macos.tar.gz | tar xz
```

</TabItem>
<TabItem value="brew">

```sh
brew install geckodriver
```

</TabItem>
<TabItem value="chocolatey">

```sh
choco install selenium-gecko-driver
```

</TabItem>
<TabItem value="powershell">

```sh
# 特権セッションとして実行します。右クリックして「管理者として実行」を設定してください
# 32ビットWindowsの場合はgeckodriver-v0.24.0-win32.zipを使用してください
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # 別途定義しない限り、現在のディレクトリに配置されます
$unzipped_file = "geckodriver" # このフォルダ名に解凍されます

# デフォルトではPowershellはTLS 1.0を使用しますが、サイトのセキュリティはTLS 1.2を要求します
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Geckodriverをダウンロード
Invoke-WebRequest -Uri $url -OutFile $output

# Geckodriverを解凍
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# GeckodriverをグローバルにPATHに設定
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**注意：** その他の`geckodriver`リリースは[こちら](https://github.com/mozilla/geckodriver/releases)で入手できます。ダウンロード後、次のようにドライバーを起動できます：

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Microsoft Edge用のドライバーは、[プロジェクトのウェブサイト](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)から、または次のようにNPMパッケージとしてダウンロードできます：

```sh
npm install -g edgedriver
edgedriver --version # 出力: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

SafaridriverはMacOSにプリインストールされており、次のように直接起動できます：

```sh
safaridriver -p 4444
```