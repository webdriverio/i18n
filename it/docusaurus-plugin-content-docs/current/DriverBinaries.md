---
id: driverbinaries
title: Binari dei Driver
description: "Lascia che WebdriverIO scarichi e gestisca automaticamente i driver del browser, oppure configura manualmente Chromedriver, Geckodriver, Edgedriver e Safaridriver."
---

Per eseguire l'automazione basata sul protocollo WebDriver è necessario avere configurati i driver del browser che traducono i comandi di automazione e sono in grado di eseguirli nel browser.

## Configurazione automatizzata

Con WebdriverIO `v8.14` e versioni successive non è più necessario scaricare e configurare manualmente alcun driver del browser, poiché questo viene gestito da WebdriverIO. Tutto ciò che devi fare è specificare il browser che vuoi testare e WebdriverIO farà il resto.

Su ARM64, consulta [Chromedriver su ARM64](arm64-chromedriver) per capire come funziona la configurazione del driver su macOS, Windows e Linux, e cosa fare quando non può essere configurato automaticamente.

### Personalizzare il livello di automazione

WebdriverIO ha tre livelli di automazione:

**1. Scaricare e installare il browser utilizzando [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Se specifichi una combinazione `browserName`/`browserVersion` nella configurazione delle [capabilities](configuration#capabilities-1), WebdriverIO scaricherà e installerà la combinazione richiesta, indipendentemente dal fatto che ci sia un'installazione esistente sulla macchina. Se ometti `browserVersion`, WebdriverIO proverà prima a individuare e utilizzare un'installazione esistente con [locate-app](https://www.npmjs.com/package/locate-app), altrimenti scaricherà e installerà l'attuale versione stabile del browser. Per maggiori dettagli su `browserVersion`, vedi [qui](capabilities#automate-different-browser-channels).

:::caution

La configurazione automatizzata del browser non supporta Microsoft Edge. Attualmente sono supportati solo Chrome, Chromium e Firefox.

:::

Se hai un'installazione del browser in una posizione che non può essere rilevata automaticamente da WebdriverIO, puoi specificare il binario del browser, il che disabiliterà il download e l'installazione automatizzati.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // or 'firefox' or 'chromium'
            'goog:chromeOptions': { // or 'moz:firefoxOptions' or 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Scaricare e installare il driver: Chromedriver da [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver e Geckodriver con i pacchetti [edgedriver](https://www.npmjs.com/package/edgedriver) e [geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO lo farà sempre, a meno che il [binario](capabilities#binary) del driver non sia specificato nella configurazione:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // or 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // or 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // or 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

WebdriverIO scarica Chromedriver da Chrome for Testing per impostazione predefinita, ma in alcuni casi utilizzerà una [release di Electron](https://github.com/electron/electron/releases):

- [`wdio:electronVersion`](capabilities#wdioelectronversion) è impostato, per un'app Electron. Utilizza quella release, a meno che `browserVersion` e `CHROMEDRIVER_CDNURL` non siano entrambi impostati.
- Chrome è precedente alla `153.0.8001.0` su Linux ARM64, dove Chrome for Testing non dispone di build di Chromedriver (vedi [Chromedriver su ARM64](arm64-chromedriver)). Utilizza l'ultima release con la stessa versione major di Chromium.
- Il download da Chrome for Testing non riesce, ad esempio durante un'interruzione del servizio, e `CHROMEDRIVER_CDNURL` non è impostato. Utilizza l'ultima release con la stessa versione major di Chromium.

:::info

WebdriverIO non scaricherà automaticamente il driver di Safari poiché è già installato su macOS.

:::

:::info Firefox / Geckodriver

Firefox utilizza uno schema di versionamento per il browser (ad es. `stable_151.0.1`) diverso da quello di [Geckodriver](https://github.com/mozilla/geckodriver/releases) (ad es. `0.36.0`), quindi `browserVersion` **non** viene utilizzato per scegliere la versione del driver. Per impostazione predefinita WebdriverIO scarica l'ultima versione di Geckodriver. Per fissare una versione specifica del driver, imposta `geckoDriverVersion` in `wdio:geckodriverOptions`:

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

Evita di specificare un `binary` per il browser omettendo il corrispondente `binary` del driver o viceversa. Se viene specificato solo uno dei valori `binary`, WebdriverIO cercherà di utilizzare o scaricare un browser/driver compatibile con esso. Tuttavia, in alcuni scenari ciò potrebbe portare a una combinazione incompatibile. Pertanto, si consiglia di specificarli sempre entrambi per evitare problemi causati da incompatibilità di versione.

:::

**3. Avviare/arrestare il driver.**

Per impostazione predefinita, WebdriverIO avvierà e arresterà automaticamente il driver utilizzando una porta arbitraria non in uso. Specificare una qualsiasi delle seguenti configurazioni disabiliterà questa funzionalità, il che significa che dovrai avviare e arrestare manualmente il driver:

- Qualsiasi valore per [port](configuration#port).
- Qualsiasi valore diverso da quello predefinito per [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Qualsiasi valore sia per [user](configuration#user) che per [key](configuration#key).

## Configurazione manuale

Di seguito viene descritto come è ancora possibile configurare ciascun driver singolarmente. Puoi trovare un elenco con tutti i driver nel README di [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Se stai cercando di configurare piattaforme mobili e altre piattaforme UI, dai un'occhiata alla nostra guida [Configurazione di Appium](appium).

:::

### Chromedriver

Per automatizzare Chrome puoi scaricare Chromedriver direttamente dal [sito web del progetto](http://chromedriver.chromium.org/downloads) o tramite il pacchetto NPM:

```bash npm2yarn
npm install -g chromedriver
```

Puoi quindi avviarlo tramite:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Per automatizzare Firefox scarica l'ultima versione di `geckodriver` per il tuo ambiente ed estraila nella directory del tuo progetto:

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
# Esegui come sessione con privilegi. Fai clic con il tasto destro e seleziona 'Esegui come amministratore'
# Usa geckodriver-v0.24.0-win32.zip per Windows a 32 bit
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # verrà salvato nella directory corrente se non diversamente specificato
$unzipped_file = "geckodriver" # verrà estratto in una cartella con questo nome

# Per impostazione predefinita, Powershell usa TLS 1.0 mentre la sicurezza del sito richiede TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Scarica Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Estrae Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Aggiunge Geckodriver al PATH globale
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Nota:** Altre release di `geckodriver` sono disponibili [qui](https://github.com/mozilla/geckodriver/releases). Dopo il download puoi avviare il driver tramite:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Puoi scaricare il driver per Microsoft Edge dal [sito web del progetto](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) o come pacchetto NPM tramite:

```sh
npm install -g edgedriver
edgedriver --version # stampa: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver è preinstallato sul tuo MacOS e può essere avviato direttamente tramite:

```sh
safaridriver -p 4444
```