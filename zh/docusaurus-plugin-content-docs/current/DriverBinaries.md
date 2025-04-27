---
id: driverbinaries
title: 驱动程序二进制文件
---

要基于WebDriver协议运行自动化测试，您需要设置浏览器驱动程序来转译自动化命令并能够在浏览器中执行它们。

## 自动化设置

使用WebdriverIO `v8.14`及以上版本，您不再需要手动下载和设置任何浏览器驱动程序，因为这些都由WebdriverIO处理。您只需指定要测试的浏览器，WebdriverIO将完成其余工作。

### 自定义自动化级别

WebdriverIO有三个自动化级别：

**1. 使用[@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers)下载并安装浏览器。**

如果您在[capabilities](configuration#capabilities-1)配置中指定了`browserName`/`browserVersion`组合，WebdriverIO将下载并安装所请求的组合，无论机器上是否已存在安装。如果您省略`browserVersion`，WebdriverIO将首先尝试使用[locate-app](https://www.npmjs.com/package/locate-app)定位并使用现有安装，否则它将下载并安装当前稳定的浏览器版本。有关`browserVersion`的更多详情，请参见[此处](capabilities#automate-different-browser-channels)。

:::caution

自动浏览器设置不支持Microsoft Edge。目前，仅支持Chrome、Chromium和Firefox。

:::

如果您的浏览器安装在WebdriverIO无法自动检测的位置，您可以指定浏览器二进制文件，这将禁用自动下载和安装。

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // 或 'firefox' 或 'chromium'
            'goog:chromeOptions': { // 或 'moz:firefoxOptions' 或 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. 使用[Chromedriver](https://www.npmjs.com/package/chromedriver)、[Edgedriver](https://www.npmjs.com/package/edgedriver)或[Geckodriver](https://www.npmjs.com/package/geckodriver)下载并安装驱动程序。**

WebdriverIO将始终执行此操作，除非在配置中指定了驱动程序[binary](capabilities#binary)：

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // 或 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // 或 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // 或 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO不会自动下载Safari驱动程序，因为它已预装在macOS上。

:::

:::caution

避免仅为浏览器指定`binary`而省略相应的驱动程序`binary`，反之亦然。如果仅指定其中一个`binary`值，WebdriverIO将尝试使用或下载与之兼容的浏览器/驱动程序。然而，在某些情况下，这可能会导致不兼容的组合。因此，建议您始终同时指定两者，以避免版本不兼容引起的问题。

:::

**3. 启动/停止驱动程序。**

默认情况下，WebdriverIO将使用任意未使用的端口自动启动和停止驱动程序。指定以下任何配置将禁用此功能，这意味着您需要手动启动和停止驱动程序：

- [port](configuration#port)的任何值。
- 与[protocol](configuration#protocol)、[hostname](configuration#hostname)、[path](configuration#path)默认值不同的任何值。
- [user](configuration#user)和[key](configuration#key)两者的任何值。

## 手动设置

以下描述了如何单独设置每个驱动程序。您可以在[`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) README中找到所有驱动程序的列表。

:::tip

如果您想设置移动和其他UI平台，请查看我们的[Appium设置](appium)指南。

:::

### Chromedriver

要自动化Chrome，您可以直接在[项目网站](http://chromedriver.chromium.org/downloads)上下载Chromedriver，或通过NPM包：

```bash npm2yarn
npm install -g chromedriver
```

然后您可以通过以下方式启动它：

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

要自动化Firefox，请为您的环境下载最新版本的`geckodriver`并在项目目录中解压：

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

**注意：**其他`geckodriver`版本可在[此处](https://github.com/mozilla/geckodriver/releases)获取。下载后，您可以通过以下方式启动驱动程序：

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

您可以在[项目网站](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)上下载Microsoft Edge的驱动程序，或通过NPM包：

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver预装在您的MacOS上，可以直接通过以下方式启动：

```sh
safaridriver -p 4444
```