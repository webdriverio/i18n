---
id: driverbinaries
title: 드라이버 바이너리
---

WebDriver 프로토콜 기반 자동화를 실행하려면 자동화 명령을 번역하고 브라우저에서 실행할 수 있는 브라우저 드라이버를 설정해야 합니다.

## 자동화된 설정

WebdriverIO `v8.14` 이상에서는 WebdriverIO가 브라우저 드라이버를 자동으로 처리하기 때문에 수동으로 브라우저 드라이버를 다운로드하고 설정할 필요가 없습니다. 테스트하려는 브라우저를 지정하기만 하면 WebdriverIO가 나머지를 처리합니다.

### 자동화 수준 커스터마이징

WebdriverIO의 자동화 수준은 세 가지입니다:

**1. [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers)를 사용하여 브라우저 다운로드 및 설치.**

[capabilities](configuration#capabilities-1) 설정에서 `browserName`/`browserVersion` 조합을 지정하면, WebdriverIO는 머신에 기존 설치가 있는지 여부에 관계없이 요청된 조합을 다운로드하고 설치합니다. `browserVersion`을 생략하면 WebdriverIO는 먼저 [locate-app](https://www.npmjs.com/package/locate-app)으로 기존 설치를 찾아 사용하려고 시도하며, 그렇지 않으면 현재 안정적인 브라우저 릴리스를 다운로드하여 설치합니다. `browserVersion`에 대한 자세한 내용은 [여기](capabilities#automate-different-browser-channels)를 참조하세요.

:::caution

자동화된 브라우저 설정은 Microsoft Edge를 지원하지 않습니다. 현재는 Chrome, Chromium 및 Firefox만 지원됩니다.

:::

WebdriverIO가 자동 감지할 수 없는 위치에 브라우저 설치가 있는 경우, 브라우저 바이너리를 지정하여 자동 다운로드 및 설치를 비활성화할 수 있습니다.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // 또는 'firefox' 또는 'chromium'
            'goog:chromeOptions': { // 또는 'moz:firefoxOptions' 또는 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) 또는 [Geckodriver](https://www.npmjs.com/package/geckodriver)를 사용하여 드라이버 다운로드 및 설치.**

WebdriverIO는 설정에 드라이버 [binary](capabilities#binary)가 지정되지 않는 한 항상 이 작업을 수행합니다:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // 또는 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // 또는 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // 또는 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO는 Safari 드라이버를 자동으로 다운로드하지 않습니다. 이미 macOS에 설치되어 있기 때문입니다.

:::

:::caution

브라우저의 `binary`를 지정하고 해당 드라이버 `binary`를 생략하거나 그 반대의 경우를 피하세요. `binary` 값 중 하나만 지정되면, WebdriverIO는 호환되는 브라우저/드라이버를 사용하거나 다운로드하려고 시도합니다. 그러나 일부 시나리오에서는 호환되지 않는 조합이 발생할 수 있습니다. 따라서 버전 비호환성으로 인한 문제를 방지하기 위해 항상 둘 다 지정하는 것이 좋습니다.

:::

**3. 드라이버 시작/중지.**

기본적으로 WebdriverIO는 사용하지 않는 임의의 포트를 사용하여 드라이버를 자동으로 시작하고 중지합니다. 다음 구성 중 하나를 지정하면 이 기능이 비활성화되어 드라이버를 수동으로 시작하고 중지해야 합니다:

- [port](configuration#port)에 대한 값.
- [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path)에 대한 기본값과 다른 값.
- [user](configuration#user)와 [key](configuration#key) 모두에 대한 값.

## 수동 설정

다음은 각 드라이버를 개별적으로 설정하는 방법을 설명합니다. [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) README에서 모든 드라이버 목록을 찾을 수 있습니다.

:::tip

모바일 및 기타 UI 플랫폼을 설정하려면 [Appium 설정](appium) 가이드를 참조하세요.

:::

### Chromedriver

Chrome을 자동화하려면 [프로젝트 웹사이트](http://chromedriver.chromium.org/downloads)에서 직접 Chromedriver를 다운로드하거나 NPM 패키지를 통해 설치할 수 있습니다:

```bash npm2yarn
npm install -g chromedriver
```

그런 다음 다음과 같이 시작할 수 있습니다:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Firefox를 자동화하려면 환경에 맞는 최신 버전의 `geckodriver`를 다운로드하고 프로젝트 디렉토리에 압축을 풉니다:

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

Linux:

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar xz
```

MacOS (64 bit):

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
# Run as privileged session. Right-click and set 'Run as Administrator'
# Use geckodriver-v0.24.0-win32.zip for 32 bit Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # will drop into current directory unless defined otherwise
$unzipped_file = "geckodriver" # will unzip to this folder name

# By default, Powershell uses TLS 1.0 the site security requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Downloads Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Unzip Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Globally Set Geckodriver to PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**참고:** 다른 `geckodriver` 릴리스는 [여기](https://github.com/mozilla/geckodriver/releases)에서 사용할 수 있습니다. 다운로드 후 다음과 같이 드라이버를 시작할 수 있습니다:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Microsoft Edge용 드라이버는 [프로젝트 웹사이트](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)에서 다운로드하거나 NPM 패키지를 통해 설치할 수 있습니다:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver는 MacOS에 사전 설치되어 있으며 다음과 같이 직접 시작할 수 있습니다:

```sh
safaridriver -p 4444
```