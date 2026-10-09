---
id: driverbinaries
title: Бинарные файлы драйверов
description: "Позвольте WebdriverIO автоматически загружать и управлять драйверами браузеров или настройте Chromedriver, Geckodriver, Edgedriver и Safaridriver вручную."
---

Чтобы запускать автоматизацию на основе протокола WebDriver, вам необходимо настроить драйверы браузеров, которые транслируют команды автоматизации и способны выполнять их в браузере.

## Автоматическая настройка

Начиная с WebdriverIO `v8.14` больше нет необходимости вручную загружать и настраивать какие-либо драйверы браузеров, так как этим занимается WebdriverIO. Всё, что вам нужно сделать, — это указать браузер, который вы хотите тестировать, а WebdriverIO сделает всё остальное.

Для ARM64 см. [Chromedriver на ARM64](arm64-chromedriver), чтобы узнать, как работает настройка драйвера на macOS, Windows и Linux и что делать, если его не удаётся настроить автоматически.

### Настройка уровня автоматизации

WebdriverIO имеет три уровня автоматизации:

**1. Загрузка и установка браузера с помощью [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Если вы укажете комбинацию `browserName`/`browserVersion` в конфигурации [capabilities](configuration#capabilities-1), WebdriverIO загрузит и установит запрошенную комбинацию независимо от того, есть ли на машине уже существующая установка. Если вы не укажете `browserVersion`, WebdriverIO сначала попытается найти и использовать существующую установку с помощью [locate-app](https://www.npmjs.com/package/locate-app), а в противном случае загрузит и установит текущий стабильный релиз браузера. Подробнее о `browserVersion` см. [здесь](capabilities#automate-different-browser-channels).

:::caution

Автоматическая настройка браузера не поддерживает Microsoft Edge. В настоящее время поддерживаются только Chrome, Chromium и Firefox.

:::

Если браузер установлен в месте, которое WebdriverIO не может определить автоматически, вы можете указать бинарный файл браузера, что отключит автоматическую загрузку и установку.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // или 'firefox', или 'chromium'
            'goog:chromeOptions': { // или 'moz:firefoxOptions', или 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Загрузка и установка драйвера: Chromedriver из [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver и Geckodriver с помощью пакетов [edgedriver](https://www.npmjs.com/package/edgedriver) и [geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO всегда будет это делать, если только в конфигурации не указан [binary](capabilities#binary) драйвера:

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

По умолчанию WebdriverIO загружает Chromedriver из Chrome for Testing, но в определённых случаях использует [релиз Electron](https://github.com/electron/electron/releases):

- Задан [`wdio:electronVersion`](capabilities#wdioelectronversion) для приложения Electron. Используется этот релиз, если только не заданы одновременно `browserVersion` и `CHROMEDRIVER_CDNURL`.
- Chrome старше `153.0.8001.0` на Linux ARM64, где Chrome for Testing не предоставляет сборок Chromedriver (см. [Chromedriver на ARM64](arm64-chromedriver)). Используется последний релиз с той же мажорной версией Chromium.
- Загрузка из Chrome for Testing завершается неудачей, например во время сбоя сервиса, и `CHROMEDRIVER_CDNURL` не задан. Используется последний релиз с той же мажорной версией Chromium.

:::info

WebdriverIO не будет автоматически загружать драйвер Safari, так как он уже установлен в macOS.

:::

:::info Firefox / Geckodriver

Firefox использует для браузера иную схему версионирования (например, `stable_151.0.1`), чем [Geckodriver](https://github.com/mozilla/geckodriver/releases) (например, `0.36.0`), поэтому `browserVersion` **не** используется для выбора версии драйвера. По умолчанию WebdriverIO загружает последнюю версию Geckodriver. Чтобы закрепить определённую версию драйвера, задайте `geckoDriverVersion` в `wdio:geckodriverOptions`:

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

Избегайте указания `binary` для браузера без соответствующего `binary` для драйвера и наоборот. Если указано только одно из значений `binary`, WebdriverIO попытается использовать или загрузить совместимый с ним браузер/драйвер. Однако в некоторых сценариях это может привести к несовместимой комбинации. Поэтому рекомендуется всегда указывать оба значения, чтобы избежать проблем, вызванных несовместимостью версий.

:::

**3. Запуск/остановка драйвера.**

По умолчанию WebdriverIO автоматически запускает и останавливает драйвер, используя произвольный свободный порт. Указание любой из следующих настроек отключит эту функцию, а значит, вам придётся вручную запускать и останавливать драйвер:

- Любое значение для [port](configuration#port).
- Любое значение, отличное от значения по умолчанию, для [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Любые значения одновременно для [user](configuration#user) и [key](configuration#key).

## Ручная настройка

Ниже описано, как по-прежнему можно настроить каждый драйвер по отдельности. Список всех драйверов можно найти в README [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Если вы хотите настроить мобильные и другие UI-платформы, ознакомьтесь с нашим руководством [Настройка Appium](appium).

:::

### Chromedriver

Для автоматизации Chrome вы можете загрузить Chromedriver напрямую с [сайта проекта](http://chromedriver.chromium.org/downloads) или через пакет NPM:

```bash npm2yarn
npm install -g chromedriver
```

Затем вы можете запустить его командой:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Для автоматизации Firefox загрузите последнюю версию `geckodriver` для вашего окружения и распакуйте её в директорию проекта:

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
# Запускайте в привилегированном сеансе. Щёлкните правой кнопкой мыши и выберите 'Запуск от имени администратора'
# Используйте geckodriver-v0.24.0-win32.zip для 32-битной Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # будет сохранён в текущую директорию, если не указано иное
$unzipped_file = "geckodriver" # будет распакован в папку с этим именем

# По умолчанию Powershell использует TLS 1.0, а политика безопасности сайта требует TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Загрузка Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Распаковка Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Глобальное добавление Geckodriver в PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Примечание:** Другие релизы `geckodriver` доступны [здесь](https://github.com/mozilla/geckodriver/releases). После загрузки вы можете запустить драйвер командой:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Вы можете загрузить драйвер для Microsoft Edge с [сайта проекта](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) или как пакет NPM:

```sh
npm install -g edgedriver
edgedriver --version # выводит: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver предустановлен в вашей MacOS и может быть запущен напрямую командой:

```sh
safaridriver -p 4444
```