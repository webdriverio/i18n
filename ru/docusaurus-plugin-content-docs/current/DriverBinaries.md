---
id: driverbinaries
title: Драйверы браузеров
---

Для запуска автоматизации на основе протокола WebDriver вам необходимо настроить драйверы браузера, которые переводят команды автоматизации и могут выполнять их в браузере.

## Автоматическая настройка

Начиная с WebdriverIO `v8.14` больше нет необходимости вручную загружать и настраивать драйверы браузера, так как это выполняется WebdriverIO. Всё, что вам нужно сделать - это указать браузер, который вы хотите тестировать, и WebdriverIO сделает всё остальное.

### Настройка уровня автоматизации

WebdriverIO имеет три уровня автоматизации:

**1. Загрузка и установка браузера с помощью [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Если вы указываете комбинацию `browserName`/`browserVersion` в конфигурации [capabilities](configuration#capabilities-1), WebdriverIO загрузит и установит запрошенную комбинацию, независимо от того, существует ли уже установка на машине. Если вы опустите `browserVersion`, WebdriverIO сначала попытается найти и использовать существующую установку с помощью [locate-app](https://www.npmjs.com/package/locate-app), в противном случае загрузит и установит текущую стабильную версию браузера. Дополнительные сведения о `browserVersion` см. [здесь](capabilities#automate-different-browser-channels).

:::caution

Автоматическая настройка браузера не поддерживает Microsoft Edge. В настоящее время поддерживаются только Chrome, Chromium и Firefox.

:::

Если у вас есть установка браузера в месте, которое не может быть автоматически обнаружено WebdriverIO, вы можете указать исполняемый файл браузера, что отключит автоматическую загрузку и установку.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // или 'firefox' или 'chromium'
            'goog:chromeOptions': { // или 'moz:firefoxOptions' или 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Загрузка и установка драйвера с помощью [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) или [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO всегда будет делать это, если [binary](capabilities#binary) драйвера не указан в конфигурации:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // или 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // или 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // или 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO не будет автоматически загружать драйвер Safari, так как он уже установлен на macOS.

:::

:::caution

Избегайте указания `binary` для браузера и пропуска соответствующего `binary` драйвера или наоборот. Если указано только одно из значений `binary`, WebdriverIO попытается использовать или загрузить браузер/драйвер, совместимый с ним. Однако в некоторых сценариях это может привести к несовместимой комбинации. Поэтому рекомендуется всегда указывать оба значения, чтобы избежать проблем, вызванных несовместимостью версий.

:::

**3. Запуск/остановка драйвера.**

По умолчанию WebdriverIO автоматически запускает и останавливает драйвер, используя произвольный неиспользуемый порт. Указание любой из следующих конфигураций отключит эту функцию, что означает, что вам нужно будет вручную запускать и останавливать драйвер:

- Любое значение для [port](configuration#port).
- Любое значение, отличное от значения по умолчанию для [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Любое значение для [user](configuration#user) и [key](configuration#key).

## Ручная настройка

Ниже описано, как вы всё ещё можете настроить каждый драйвер индивидуально. Вы можете найти список всех драйверов в README [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Если вы хотите настроить мобильные и другие платформы пользовательского интерфейса, ознакомьтесь с нашим руководством по [Настройке Appium](appium).

:::

### Chromedriver

Для автоматизации Chrome вы можете загрузить Chromedriver напрямую на [веб-сайте проекта](http://chromedriver.chromium.org/downloads) или через пакет NPM:

```bash npm2yarn
npm install -g chromedriver
```

Затем вы можете запустить его с помощью:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Для автоматизации Firefox загрузите последнюю версию `geckodriver` для вашей среды и распакуйте её в каталог вашего проекта:

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

**Примечание:** Другие релизы `geckodriver` доступны [здесь](https://github.com/mozilla/geckodriver/releases). После загрузки вы можете запустить драйвер следующим образом:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Вы можете загрузить драйвер для Microsoft Edge на [веб-сайте проекта](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) или как пакет NPM через:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver предустановлен на вашем MacOS и может быть запущен непосредственно через:

```sh
safaridriver -p 4444
```