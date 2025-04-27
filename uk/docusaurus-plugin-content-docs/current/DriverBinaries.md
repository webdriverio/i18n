---
id: driverbinaries
title: Драйвери браузерів
---

Для запуску автоматизації на основі протоколу WebDriver вам потрібно налаштувати драйвери браузерів, які перекладають команди автоматизації та можуть виконувати їх у браузері.

## Автоматичне налаштування

Починаючи з WebdriverIO `v8.14` і вище, більше немає потреби вручну завантажувати та налаштовувати будь-які драйвери браузерів, оскільки це виконується WebdriverIO. Все, що вам потрібно зробити, це вказати браузер, який ви хочете тестувати, і WebdriverIO зробить все інше.

### Налаштування рівня автоматизації

WebdriverIO має три рівні автоматизації:

**1. Завантаження та встановлення браузера за допомогою [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Якщо ви вказуєте комбінацію `browserName`/`browserVersion` у конфігурації [capabilities](configuration#capabilities-1), WebdriverIO завантажить і встановить запитану комбінацію, незалежно від того, чи існує вже встановлена версія на комп'ютері. Якщо ви опустите `browserVersion`, WebdriverIO спочатку спробує знайти та використати існуючу установку за допомогою [locate-app](https://www.npmjs.com/package/locate-app), інакше він завантажить і встановить поточну стабільну версію браузера. Для отримання додаткової інформації про `browserVersion` дивіться [тут](capabilities#automate-different-browser-channels).

:::caution

Автоматичне налаштування браузера не підтримує Microsoft Edge. На даний момент підтримуються лише Chrome, Chromium і Firefox.

:::

Якщо у вас є встановлення браузера в місці, яке не може бути автоматично виявлено WebdriverIO, ви можете вказати бінарний файл браузера, що відключить автоматичне завантаження та встановлення.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // або 'firefox' чи 'chromium'
            'goog:chromeOptions': { // або 'moz:firefoxOptions' чи 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Завантаження та встановлення драйвера за допомогою [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) або [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO завжди виконуватиме це, якщо [binary](capabilities#binary) драйвера не вказано в конфігурації:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // або 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // або 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // або 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO не буде автоматично завантажувати драйвер Safari, оскільки він вже встановлений на macOS.

:::

:::caution

Уникайте вказування `binary` для браузера і одночасного пропуску відповідного `binary` драйвера або навпаки. Якщо вказано лише одне зі значень `binary`, WebdriverIO спробує використати або завантажити сумісний браузер/драйвер. Однак, у деяких сценаріях це може призвести до несумісної комбінації. Тому рекомендується завжди вказувати обидва значення, щоб уникнути проблем, спричинених несумісністю версій.

:::

**3. Запуск/зупинка драйвера.**

За замовчуванням WebdriverIO автоматично запускатиме та зупинятиме драйвер, використовуючи будь-який вільний порт. Вказування будь-якого з наступних параметрів конфігурації відключить цю функцію, що означає, що вам потрібно буде вручну запускати та зупиняти драйвер:

- Будь-яке значення для [port](configuration#port).
- Будь-яке значення, відмінне від значення за замовчуванням для [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Будь-яке значення для [user](configuration#user) і [key](configuration#key).

## Ручне налаштування

Нижче описано, як ви все ще можете налаштувати кожний драйвер окремо. Ви можете знайти список з усіма драйверами в README [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Якщо ви шукаєте налаштування мобільних та інших платформ UI, перегляньте наш посібник з [налаштування Appium](appium).

:::

### Chromedriver

Для автоматизації Chrome ви можете завантажити Chromedriver безпосередньо на [веб-сайті проекту](http://chromedriver.chromium.org/downloads) або через пакет NPM:

```bash npm2yarn
npm install -g chromedriver
```

Потім ви можете запустити його за допомогою:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Для автоматизації Firefox завантажте останню версію `geckodriver` для вашого середовища та розпакуйте її в каталозі вашого проекту:

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

**Примітка:** Інші випуски `geckodriver` доступні [тут](https://github.com/mozilla/geckodriver/releases). Після завантаження ви можете запустити драйвер за допомогою:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Ви можете завантажити драйвер для Microsoft Edge на [веб-сайті проекту](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) або як пакет NPM через:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver попередньо встановлений на вашому MacOS і може бути запущений безпосередньо за допомогою:

```sh
safaridriver -p 4444
```