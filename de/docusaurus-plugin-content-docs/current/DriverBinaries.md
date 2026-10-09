---
id: driverbinaries
title: Treiber-Binärdateien
description: "Lassen Sie WebdriverIO Browser-Treiber automatisch herunterladen und verwalten, oder richten Sie Chromedriver, Geckodriver, Edgedriver und Safaridriver manuell ein."
---

Um Automatisierung auf Basis des WebDriver-Protokolls auszuführen, müssen Browser-Treiber eingerichtet sein, die die Automatisierungsbefehle übersetzen und im Browser ausführen können.

## Automatisierte Einrichtung

Ab WebdriverIO `v8.14` ist es nicht mehr nötig, Browser-Treiber manuell herunterzuladen und einzurichten, da dies von WebdriverIO übernommen wird. Sie müssen lediglich den Browser angeben, den Sie testen möchten, und WebdriverIO erledigt den Rest.

Unter ARM64 finden Sie unter [Chromedriver auf ARM64](arm64-chromedriver) Informationen dazu, wie die Treibereinrichtung unter macOS, Windows und Linux funktioniert und was zu tun ist, wenn sie nicht automatisch eingerichtet werden kann.

### Anpassen des Automatisierungsgrads

WebdriverIO bietet drei Automatisierungsstufen:

**1. Herunterladen und Installieren des Browsers mit [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Wenn Sie in der [Capabilities](configuration#capabilities-1)-Konfiguration eine Kombination aus `browserName`/`browserVersion` angeben, lädt WebdriverIO die angeforderte Kombination herunter und installiert sie, unabhängig davon, ob bereits eine Installation auf dem Rechner vorhanden ist. Wenn Sie `browserVersion` weglassen, versucht WebdriverIO zunächst, eine vorhandene Installation mit [locate-app](https://www.npmjs.com/package/locate-app) zu finden und zu verwenden; andernfalls wird die aktuelle stabile Browserversion heruntergeladen und installiert. Weitere Details zu `browserVersion` finden Sie [hier](capabilities#automate-different-browser-channels).

:::caution

Die automatisierte Browser-Einrichtung unterstützt Microsoft Edge nicht. Derzeit werden nur Chrome, Chromium und Firefox unterstützt.

:::

Wenn Sie eine Browserinstallation an einem Ort haben, der von WebdriverIO nicht automatisch erkannt werden kann, können Sie die Browser-Binärdatei angeben, wodurch der automatische Download und die Installation deaktiviert werden.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // oder 'firefox' oder 'chromium'
            'goog:chromeOptions': { // oder 'moz:firefoxOptions' oder 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Herunterladen und Installieren des Treibers: Chromedriver von [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver und Geckodriver mit den Paketen [edgedriver](https://www.npmjs.com/package/edgedriver) und [geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO tut dies immer, es sei denn, in der Konfiguration ist eine Treiber-[Binärdatei](capabilities#binary) angegeben:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // oder 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // oder 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // oder 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

WebdriverIO lädt Chromedriver standardmäßig von Chrome for Testing herunter, verwendet in bestimmten Fällen jedoch ein [Electron-Release](https://github.com/electron/electron/releases):

- [`wdio:electronVersion`](capabilities#wdioelectronversion) ist für eine Electron-App gesetzt. Es wird dieses Release verwendet, es sei denn, `browserVersion` und `CHROMEDRIVER_CDNURL` sind beide gesetzt.
- Chrome ist unter Linux ARM64 älter als `153.0.8001.0`, wo Chrome for Testing keine Chromedriver-Builds bereitstellt (siehe [Chromedriver auf ARM64](arm64-chromedriver)). Es wird das letzte Release mit derselben Chromium-Hauptversion verwendet.
- Der Download von Chrome for Testing schlägt fehl, zum Beispiel während eines Ausfalls, und `CHROMEDRIVER_CDNURL` ist nicht gesetzt. Es wird das letzte Release mit derselben Chromium-Hauptversion verwendet.

:::info

WebdriverIO lädt den Safari-Treiber nicht automatisch herunter, da er bereits unter macOS installiert ist.

:::

:::info Firefox / Geckodriver

Firefox verwendet für den Browser ein anderes Versionierungsschema (z. B. `stable_151.0.1`) als [Geckodriver](https://github.com/mozilla/geckodriver/releases) (z. B. `0.36.0`), daher wird `browserVersion` **nicht** zur Auswahl der Treiberversion verwendet. Standardmäßig lädt WebdriverIO die neueste Geckodriver-Version herunter. Um eine bestimmte Treiberversion festzulegen, setzen Sie `geckoDriverVersion` in `wdio:geckodriverOptions`:

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

Vermeiden Sie es, eine `binary` für den Browser anzugeben und die entsprechende Treiber-`binary` wegzulassen oder umgekehrt. Wenn nur einer der `binary`-Werte angegeben ist, versucht WebdriverIO, einen damit kompatiblen Browser/Treiber zu verwenden oder herunterzuladen. In einigen Szenarien kann dies jedoch zu einer inkompatiblen Kombination führen. Daher wird empfohlen, immer beide anzugeben, um Probleme durch Versionsinkompatibilitäten zu vermeiden.

:::

**3. Starten/Stoppen des Treibers.**

Standardmäßig startet und stoppt WebdriverIO den Treiber automatisch über einen beliebigen ungenutzten Port. Wenn Sie eine der folgenden Konfigurationen angeben, wird diese Funktion deaktiviert, was bedeutet, dass Sie den Treiber manuell starten und stoppen müssen:

- Ein beliebiger Wert für [port](configuration#port).
- Ein vom Standard abweichender Wert für [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Ein beliebiger Wert für sowohl [user](configuration#user) als auch [key](configuration#key).

## Manuelle Einrichtung

Im Folgenden wird beschrieben, wie Sie jeden Treiber weiterhin einzeln einrichten können. Eine Liste aller Treiber finden Sie in der README von [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Wenn Sie mobile und andere UI-Plattformen einrichten möchten, werfen Sie einen Blick in unseren Leitfaden zur [Appium-Einrichtung](appium).

:::

### Chromedriver

Um Chrome zu automatisieren, können Sie Chromedriver direkt auf der [Projektwebsite](http://chromedriver.chromium.org/downloads) oder über das NPM-Paket herunterladen:

```bash npm2yarn
npm install -g chromedriver
```

Anschließend können Sie ihn starten über:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Um Firefox zu automatisieren, laden Sie die neueste Version von `geckodriver` für Ihre Umgebung herunter und entpacken Sie sie in Ihrem Projektverzeichnis:

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

MacOS (64 Bit):

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
# Als privilegierte Sitzung ausführen. Rechtsklick und 'Als Administrator ausführen' wählen
# Für 32-Bit-Windows geckodriver-v0.24.0-win32.zip verwenden
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # wird im aktuellen Verzeichnis abgelegt, sofern nicht anders definiert
$unzipped_file = "geckodriver" # wird in diesen Ordnernamen entpackt

# Standardmäßig verwendet Powershell TLS 1.0, die Sicherheit der Website erfordert TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Lädt Geckodriver herunter
Invoke-WebRequest -Uri $url -OutFile $output

# Geckodriver entpacken
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Geckodriver global zum PATH hinzufügen
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Hinweis:** Weitere `geckodriver`-Releases sind [hier](https://github.com/mozilla/geckodriver/releases) verfügbar. Nach dem Download können Sie den Treiber starten über:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Sie können den Treiber für Microsoft Edge auf der [Projektwebsite](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) oder als NPM-Paket herunterladen über:

```sh
npm install -g edgedriver
edgedriver --version # gibt aus: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver ist auf Ihrem MacOS vorinstalliert und kann direkt gestartet werden über:

```sh
safaridriver -p 4444
```