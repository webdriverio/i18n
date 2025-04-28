---
id: driverbinaries
title: Drivrutinsbinärer
---

För att köra automatisering baserad på WebDriver-protokollet behöver du ha webbläsardrivrutiner installerade som översätter automatiseringskommandon och kan utföra dem i webbläsaren.

## Automatiserad installation

Med WebdriverIO `v8.14` och senare finns det inte längre behov av att manuellt ladda ner och installera några webbläsardrivrutiner eftersom detta hanteras av WebdriverIO. Allt du behöver göra är att ange vilken webbläsare du vill testa och WebdriverIO gör resten.

### Anpassa graden av automatisering

WebdriverIO har tre nivåer av automatisering:

**1. Ladda ner och installera webbläsaren med hjälp av [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Om du anger en `browserName`/`browserVersion`-kombination i [capabilities](configuration#capabilities-1)-konfigurationen, kommer WebdriverIO att ladda ner och installera den begärda kombinationen, oavsett om det finns en befintlig installation på datorn. Om du utelämnar `browserVersion` kommer WebdriverIO först att försöka hitta och använda en befintlig installation med [locate-app](https://www.npmjs.com/package/locate-app), annars kommer den att ladda ner och installera den aktuella stabila webbläsarversionen. För mer information om `browserVersion`, se [här](capabilities#automate-different-browser-channels).

:::caution

Automatiserad webbläsarinställning stöder inte Microsoft Edge. För närvarande stöds endast Chrome, Chromium och Firefox.

:::

Om du har en webbläsarinstallation på en plats som inte kan upptäckas automatiskt av WebdriverIO, kan du ange webbläsarbinärer vilket inaktiverar den automatiska nedladdningen och installationen.

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

**2. Ladda ner och installera drivrutinen med hjälp av [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) eller [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO kommer alltid att göra detta, såvida inte drivrutinens [binary](capabilities#binary) specificeras i konfigurationen:

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

:::info

WebdriverIO kommer inte att automatiskt ladda ner Safari-drivrutinen eftersom den redan är installerad på macOS.

:::

:::caution

Undvik att ange en `binary` för webbläsaren och utelämna motsvarande drivrutins `binary` eller vice versa. Om endast ett av `binary`-värdena anges kommer WebdriverIO att försöka använda eller ladda ner en kompatibel webbläsare/drivrutin. I vissa scenarier kan det dock resultera i en inkompatibel kombination. Därför rekommenderas att du alltid anger båda för att undvika problem orsakade av versionsinkompatibiliteter.

:::

**3. Starta/stoppa drivrutinen.**

Som standard kommer WebdriverIO automatiskt att starta och stoppa drivrutinen med hjälp av en godtycklig oanvänd port. Att ange något av följande konfigurationer kommer att inaktivera denna funktion, vilket innebär att du måste starta och stoppa drivrutinen manuellt:

- Valfritt värde för [port](configuration#port).
- Valfritt värde som avviker från standardvärdet för [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Valfritt värde för både [user](configuration#user) och [key](configuration#key).

## Manuell installation

Följande beskriver hur du fortfarande kan installera varje drivrutin individuellt. Du hittar en lista med alla drivrutiner i [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) README.

:::tip

Om du letar efter att installera mobila och andra UI-plattformar, ta en titt på vår [Appium Setup](appium) guide.

:::

### Chromedriver

För att automatisera Chrome kan du ladda ner Chromedriver direkt från [projektets webbplats](http://chromedriver.chromium.org/downloads) eller genom NPM-paketet:

```bash npm2yarn
npm install -g chromedriver
```

Du kan sedan starta det via:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

För att automatisera Firefox, ladda ner den senaste versionen av `geckodriver` för din miljö och packa upp den i din projektmapp:

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

**Obs:** Andra `geckodriver`-releaser finns tillgängliga [här](https://github.com/mozilla/geckodriver/releases). Efter nedladdning kan du starta drivrutinen via:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Du kan ladda ner drivrutinen för Microsoft Edge på [projektets webbplats](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) eller som NPM-paket via:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver kommer förinstallerat på din MacOS och kan startas direkt via:

```sh
safaridriver -p 4444
```