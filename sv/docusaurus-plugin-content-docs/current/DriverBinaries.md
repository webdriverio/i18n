---
id: driverbinaries
title: Drivrutinsbinärer
description: "Låt WebdriverIO ladda ner och hantera webbläsardrivrutiner automatiskt, eller konfigurera Chromedriver, Geckodriver, Edgedriver och Safaridriver manuellt."
---

För att köra automatisering baserad på WebDriver-protokollet behöver du ha webbläsardrivrutiner konfigurerade som översätter automatiseringskommandona och kan köra dem i webbläsaren.

## Automatisk konfiguration

Med WebdriverIO `v8.14` och senare behöver du inte längre manuellt ladda ner och konfigurera några webbläsardrivrutiner, eftersom detta hanteras av WebdriverIO. Allt du behöver göra är att ange vilken webbläsare du vill testa så sköter WebdriverIO resten.

På ARM64, se [Chromedriver på ARM64](arm64-chromedriver) för hur konfigurationen av drivrutiner fungerar på macOS, Windows och Linux, och vad du ska göra när den inte kan konfigureras automatiskt.

### Anpassa automatiseringsnivån

WebdriverIO har tre automatiseringsnivåer:

**1. Ladda ner och installera webbläsaren med [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Om du anger en kombination av `browserName`/`browserVersion` i [capabilities](configuration#capabilities-1)-konfigurationen kommer WebdriverIO att ladda ner och installera den begärda kombinationen, oavsett om det finns en befintlig installation på datorn. Om du utelämnar `browserVersion` kommer WebdriverIO först att försöka hitta och använda en befintlig installation med [locate-app](https://www.npmjs.com/package/locate-app), annars laddar den ner och installerar den aktuella stabila webbläsarversionen. För mer information om `browserVersion`, se [här](capabilities#automate-different-browser-channels).

:::caution

Automatisk webbläsarkonfiguration stöder inte Microsoft Edge. För närvarande stöds endast Chrome, Chromium och Firefox.

:::

Om du har en webbläsarinstallation på en plats som inte kan identifieras automatiskt av WebdriverIO kan du ange webbläsarens binärfil, vilket inaktiverar den automatiska nedladdningen och installationen.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // eller 'firefox' eller 'chromium'
            'goog:chromeOptions': { // eller 'moz:firefoxOptions' eller 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Ladda ner och installera drivrutinen: Chromedriver från [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver och Geckodriver med paketen [edgedriver](https://www.npmjs.com/package/edgedriver) och [geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO gör alltid detta, såvida inte drivrutinens [binary](capabilities#binary) anges i konfigurationen:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // eller 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // eller 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // eller 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

WebdriverIO laddar som standard ner Chromedriver från Chrome for Testing, men i vissa fall används en [Electron-release](https://github.com/electron/electron/releases):

- [`wdio:electronVersion`](capabilities#wdioelectronversion) är angiven, för en Electron-app. Den releasen används, såvida inte både `browserVersion` och `CHROMEDRIVER_CDNURL` är angivna.
- Chrome är äldre än `153.0.8001.0` på Linux ARM64, där Chrome for Testing saknar Chromedriver-byggen (se [Chromedriver på ARM64](arm64-chromedriver)). Den senaste releasen med samma Chromium-huvudversion används.
- Nedladdningen från Chrome for Testing misslyckas, till exempel under ett avbrott, och `CHROMEDRIVER_CDNURL` är inte angiven. Den senaste releasen med samma Chromium-huvudversion används.

:::info

WebdriverIO laddar inte automatiskt ner Safari-drivrutinen eftersom den redan är installerad på macOS.

:::

:::info Firefox / Geckodriver

Firefox använder ett annat versionsschema för webbläsaren (t.ex. `stable_151.0.1`) än [Geckodriver](https://github.com/mozilla/geckodriver/releases) (t.ex. `0.36.0`), så `browserVersion` används **inte** för att välja drivrutinsversion. Som standard laddar WebdriverIO ner den senaste Geckodriver. För att låsa en specifik drivrutinsversion, ange `geckoDriverVersion` i `wdio:geckodriverOptions`:

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

Undvik att ange en `binary` för webbläsaren och utelämna motsvarande `binary` för drivrutinen, eller tvärtom. Om endast ett av `binary`-värdena anges kommer WebdriverIO att försöka använda eller ladda ner en webbläsare/drivrutin som är kompatibel med det. I vissa fall kan det dock leda till en inkompatibel kombination. Därför rekommenderas det att du alltid anger båda för att undvika problem orsakade av versionsinkompatibiliteter.

:::

**3. Starta/stoppa drivrutinen.**

Som standard startar och stoppar WebdriverIO drivrutinen automatiskt med en godtycklig oanvänd port. Om du anger någon av följande konfigurationer inaktiveras denna funktion, vilket innebär att du måste starta och stoppa drivrutinen manuellt:

- Valfritt värde för [port](configuration#port).
- Valfritt värde som skiljer sig från standardvärdet för [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Valfritt värde för både [user](configuration#user) och [key](configuration#key).

## Manuell konfiguration

Följande beskriver hur du fortfarande kan konfigurera varje drivrutin individuellt. Du hittar en lista med alla drivrutiner i README-filen för [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Om du vill konfigurera mobila och andra UI-plattformar, ta en titt på vår guide för [Appium-konfiguration](appium).

:::

### Chromedriver

För att automatisera Chrome kan du ladda ner Chromedriver direkt från [projektets webbplats](http://chromedriver.chromium.org/downloads) eller via NPM-paketet:

```bash npm2yarn
npm install -g chromedriver
```

Du kan sedan starta den via:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

För att automatisera Firefox, ladda ner den senaste versionen av `geckodriver` för din miljö och packa upp den i din projektkatalog:

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

MacOS (64 bitar):

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
# Kör som privilegierad session. Högerklicka och välj 'Kör som administratör'
# Använd geckodriver-v0.24.0-win32.zip för 32-bitars Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # hamnar i aktuell katalog om inget annat anges
$unzipped_file = "geckodriver" # packas upp till detta mappnamn

# Som standard använder Powershell TLS 1.0, men webbplatsens säkerhet kräver TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Laddar ner Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Packa upp Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Lägg till Geckodriver i PATH globalt
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Obs:** Andra `geckodriver`-releaser finns tillgängliga [här](https://github.com/mozilla/geckodriver/releases). Efter nedladdningen kan du starta drivrutinen via:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Du kan ladda ner drivrutinen för Microsoft Edge från [projektets webbplats](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) eller som NPM-paket via:

```sh
npm install -g edgedriver
edgedriver --version # skriver ut: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver är förinstallerad på din MacOS och kan startas direkt via:

```sh
safaridriver -p 4444
```