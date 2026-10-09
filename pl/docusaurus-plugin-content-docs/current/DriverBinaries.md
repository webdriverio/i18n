---
id: driverbinaries
title: Pliki binarne sterowników
description: "Pozwól WebdriverIO automatycznie pobierać sterowniki przeglądarek i nimi zarządzać lub skonfiguruj ręcznie Chromedriver, Geckodriver, Edgedriver i Safaridriver."
---

Aby uruchomić automatyzację opartą na protokole WebDriver, musisz mieć skonfigurowane sterowniki przeglądarek, które tłumaczą polecenia automatyzacji i są w stanie wykonać je w przeglądarce.

## Automatyczna konfiguracja

Od WebdriverIO `v8.14` nie ma już potrzeby ręcznego pobierania i konfigurowania żadnych sterowników przeglądarek, ponieważ zajmuje się tym WebdriverIO. Wystarczy, że określisz przeglądarkę, którą chcesz testować, a WebdriverIO zrobi resztę.

W przypadku ARM64 zapoznaj się z sekcją [Chromedriver na ARM64](arm64-chromedriver), aby dowiedzieć się, jak działa konfiguracja sterownika w systemach macOS, Windows i Linux oraz co zrobić, gdy nie można go skonfigurować automatycznie.

### Dostosowywanie poziomu automatyzacji

WebdriverIO ma trzy poziomy automatyzacji:

**1. Pobranie i instalacja przeglądarki za pomocą [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Jeśli określisz kombinację `browserName`/`browserVersion` w konfiguracji [capabilities](configuration#capabilities-1), WebdriverIO pobierze i zainstaluje żądaną kombinację, niezależnie od tego, czy na komputerze istnieje już jakaś instalacja. Jeśli pominiesz `browserVersion`, WebdriverIO najpierw spróbuje zlokalizować i użyć istniejącej instalacji za pomocą [locate-app](https://www.npmjs.com/package/locate-app), a w przeciwnym razie pobierze i zainstaluje aktualną stabilną wersję przeglądarki. Więcej szczegółów na temat `browserVersion` znajdziesz [tutaj](capabilities#automate-different-browser-channels).

:::caution

Automatyczna konfiguracja przeglądarki nie obsługuje Microsoft Edge. Obecnie obsługiwane są tylko Chrome, Chromium i Firefox.

:::

Jeśli masz zainstalowaną przeglądarkę w lokalizacji, której WebdriverIO nie może wykryć automatycznie, możesz określić plik binarny przeglądarki, co wyłączy automatyczne pobieranie i instalację.

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

**2. Pobranie i instalacja sterownika: Chromedriver z [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver i Geckodriver za pomocą pakietów [edgedriver](https://www.npmjs.com/package/edgedriver) i [geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO zawsze to robi, chyba że w konfiguracji określono [plik binarny](capabilities#binary) sterownika:

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

WebdriverIO domyślnie pobiera Chromedriver z Chrome for Testing, ale w niektórych przypadkach użyje [wydania Electron](https://github.com/electron/electron/releases):

- Ustawiono [`wdio:electronVersion`](capabilities#wdioelectronversion) dla aplikacji Electron. Używane jest wtedy to wydanie, chyba że ustawiono zarówno `browserVersion`, jak i `CHROMEDRIVER_CDNURL`.
- Chrome jest starszy niż `153.0.8001.0` na Linux ARM64, gdzie Chrome for Testing nie udostępnia kompilacji Chromedriver (zobacz [Chromedriver na ARM64](arm64-chromedriver)). Używane jest wtedy ostatnie wydanie z tą samą główną wersją Chromium.
- Pobieranie z Chrome for Testing nie powiedzie się, na przykład podczas awarii, a `CHROMEDRIVER_CDNURL` nie jest ustawiony. Używane jest wtedy ostatnie wydanie z tą samą główną wersją Chromium.

:::info

WebdriverIO nie pobiera automatycznie sterownika Safari, ponieważ jest on już zainstalowany w systemie macOS.

:::

:::info Firefox / Geckodriver

Firefox używa innego schematu wersjonowania dla przeglądarki (np. `stable_151.0.1`) niż [Geckodriver](https://github.com/mozilla/geckodriver/releases) (np. `0.36.0`), więc `browserVersion` **nie** jest używane do wyboru wersji sterownika. Domyślnie WebdriverIO pobiera najnowszą wersję Geckodriver. Aby przypiąć konkretną wersję sterownika, ustaw `geckoDriverVersion` w `wdio:geckodriverOptions`:

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

Unikaj określania `binary` dla przeglądarki z jednoczesnym pominięciem odpowiadającego mu `binary` sterownika i odwrotnie. Jeśli określona jest tylko jedna z wartości `binary`, WebdriverIO spróbuje użyć lub pobrać przeglądarkę/sterownik z nią zgodny. Jednak w niektórych scenariuszach może to skutkować niezgodną kombinacją. Dlatego zaleca się, aby zawsze określać obie wartości, aby uniknąć problemów spowodowanych niezgodnością wersji.

:::

**3. Uruchamianie/zatrzymywanie sterownika.**

Domyślnie WebdriverIO automatycznie uruchamia i zatrzymuje sterownik, używając dowolnego nieużywanego portu. Określenie którejkolwiek z poniższych opcji konfiguracji wyłączy tę funkcję, co oznacza, że będziesz musiał ręcznie uruchamiać i zatrzymywać sterownik:

- Dowolna wartość dla [port](configuration#port).
- Dowolna wartość inna niż domyślna dla [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Dowolna wartość jednocześnie dla [user](configuration#user) i [key](configuration#key).

## Ręczna konfiguracja

Poniżej opisano, jak nadal możesz skonfigurować każdy sterownik indywidualnie. Listę wszystkich sterowników znajdziesz w README [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Jeśli chcesz skonfigurować platformy mobilne i inne platformy UI, zapoznaj się z naszym przewodnikiem [Konfiguracja Appium](appium).

:::

### Chromedriver

Aby automatyzować Chrome, możesz pobrać Chromedriver bezpośrednio ze [strony projektu](http://chromedriver.chromium.org/downloads) lub za pomocą pakietu NPM:

```bash npm2yarn
npm install -g chromedriver
```

Następnie możesz go uruchomić za pomocą:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Aby automatyzować Firefox, pobierz najnowszą wersję `geckodriver` dla swojego środowiska i rozpakuj ją w katalogu projektu:

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
# Uruchom jako sesję z uprawnieniami. Kliknij prawym przyciskiem myszy i wybierz 'Uruchom jako administrator'
# Użyj geckodriver-v0.24.0-win32.zip dla 32-bitowego systemu Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # zostanie zapisany w bieżącym katalogu, chyba że określono inaczej
$unzipped_file = "geckodriver" # zostanie rozpakowany do folderu o tej nazwie

# Domyślnie Powershell używa TLS 1.0, a zabezpieczenia strony wymagają TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Pobiera Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Rozpakowuje Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Globalnie dodaje Geckodriver do PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Uwaga:** Inne wydania `geckodriver` są dostępne [tutaj](https://github.com/mozilla/geckodriver/releases). Po pobraniu możesz uruchomić sterownik za pomocą:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Sterownik dla Microsoft Edge możesz pobrać ze [strony projektu](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) lub jako pakiet NPM za pomocą:

```sh
npm install -g edgedriver
edgedriver --version # wyświetla: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver jest preinstalowany w systemie MacOS i można go uruchomić bezpośrednio za pomocą:

```sh
safaridriver -p 4444
```