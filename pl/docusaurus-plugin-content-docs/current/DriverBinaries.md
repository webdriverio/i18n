---
id: driverbinaries
title: Sterowniki przeglądarek
---

Aby uruchomić automatyzację opartą na protokole WebDriver, potrzebujesz sterowników przeglądarek, które tłumaczą polecenia automatyzacji i są w stanie wykonać je w przeglądarce.

## Automatyczna konfiguracja

Od wersji WebdriverIO `v8.14` nie musisz już ręcznie pobierać i konfigurować żadnych sterowników przeglądarek, ponieważ WebdriverIO zajmuje się tym automatycznie. Wystarczy określić przeglądarkę, którą chcesz testować, a WebdriverIO zrobi resztę.

### Dostosowywanie poziomu automatyzacji

WebdriverIO oferuje trzy poziomy automatyzacji:

**1. Pobieranie i instalacja przeglądarki przy użyciu [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Jeśli określisz kombinację `browserName`/`browserVersion` w konfiguracji [capabilities](configuration#capabilities-1), WebdriverIO pobierze i zainstaluje żądaną kombinację, niezależnie od tego, czy na komputerze istnieje już istniejąca instalacja. Jeśli pominiesz `browserVersion`, WebdriverIO najpierw spróbuje zlokalizować i użyć istniejącej instalacji za pomocą [locate-app](https://www.npmjs.com/package/locate-app), w przeciwnym razie pobierze i zainstaluje aktualną stabilną wersję przeglądarki. Więcej szczegółów na temat `browserVersion` znajdziesz [tutaj](capabilities#automate-different-browser-channels).

:::caution

Automatyczna konfiguracja przeglądarki nie obsługuje Microsoft Edge. Obecnie obsługiwane są tylko Chrome, Chromium i Firefox.

:::

Jeśli masz przeglądarkę zainstalowaną w lokalizacji, która nie może być automatycznie wykryta przez WebdriverIO, możesz określić plik binarny przeglądarki, co wyłączy automatyczne pobieranie i instalację.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // lub 'firefox' lub 'chromium'
            'goog:chromeOptions': { // lub 'moz:firefoxOptions' lub 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Pobieranie i instalacja sterownika za pomocą [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) lub [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO zawsze to zrobi, chyba że sterownik [binary](capabilities#binary) jest określony w konfiguracji:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // lub 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // lub 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // lub 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO nie będzie automatycznie pobierać sterownika Safari, ponieważ jest on już zainstalowany na macOS.

:::

:::caution

Unikaj określania `binary` dla przeglądarki i pomijania odpowiedniego sterownika `binary` lub odwrotnie. Jeśli określisz tylko jedną z wartości `binary`, WebdriverIO spróbuje użyć lub pobrać przeglądarkę/sterownik kompatybilny z nią. Jednak w niektórych scenariuszach może to prowadzić do niekompatybilnej kombinacji. Dlatego zaleca się, aby zawsze określać obie wartości, aby uniknąć problemów spowodowanych niekompatybilnością wersji.

:::

**3. Uruchamianie/zatrzymywanie sterownika.**

Domyślnie WebdriverIO automatycznie uruchomi i zatrzyma sterownik używając dowolnego wolnego portu. Określenie którejkolwiek z poniższych konfiguracji wyłączy tę funkcję, co oznacza, że będziesz musiał ręcznie uruchamiać i zatrzymywać sterownik:

- Jakakolwiek wartość dla [port](configuration#port).
- Jakakolwiek wartość różna od domyślnej dla [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Jakakolwiek wartość zarówno dla [user](configuration#user), jak i [key](configuration#key).

## Ręczna konfiguracja

Poniżej opisano, jak nadal możesz skonfigurować każdy sterownik indywidualnie. Listę wszystkich sterowników można znaleźć w README [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Jeśli szukasz informacji jak skonfigurować platformy mobilne i inne platformy UI, zapoznaj się z naszym przewodnikiem [Konfiguracja Appium](appium).

:::

### Chromedriver

Aby zautomatyzować Chrome, możesz pobrać Chromedriver bezpośrednio ze [strony projektu](http://chromedriver.chromium.org/downloads) lub przez pakiet NPM:

```bash npm2yarn
npm install -g chromedriver
```

Następnie możesz go uruchomić za pomocą:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Aby zautomatyzować Firefox, pobierz najnowszą wersję `geckodriver` dla swojego środowiska i rozpakuj ją w katalogu projektu:

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

**Uwaga:** Inne wersje `geckodriver` są dostępne [tutaj](https://github.com/mozilla/geckodriver/releases). Po pobraniu możesz uruchomić sterownik za pomocą:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Możesz pobrać sterownik dla Microsoft Edge na [stronie projektu](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) lub jako pakiet NPM za pomocą:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver jest preinstalowany na macOS i można go uruchomić bezpośrednio za pomocą:

```sh
safaridriver -p 4444
```