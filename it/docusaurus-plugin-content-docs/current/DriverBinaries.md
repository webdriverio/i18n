---
id: driverbinaries
title: Driver Binari
---

Per eseguire l'automazione basata sul protocollo WebDriver è necessario avere driver del browser configurati che traducano i comandi di automazione e siano in grado di eseguirli nel browser.

## Configurazione automatizzata

Con WebdriverIO `v8.14` e versioni successive non è più necessario scaricare e configurare manualmente i driver del browser poiché questo viene gestito da WebdriverIO. Tutto ciò che devi fare è specificare il browser su cui desideri effettuare i test e WebdriverIO farà il resto.

### Personalizzazione del livello di automazione

WebdriverIO ha tre livelli di automazione:

**1. Scarica e installa il browser utilizzando [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Se specifichi una combinazione `browserName`/`browserVersion` nella configurazione delle [capabilities](configuration#capabilities-1), WebdriverIO scaricherà e installerà la combinazione richiesta, indipendentemente dal fatto che esista già un'installazione sulla macchina. Se ometti `browserVersion`, WebdriverIO proverà prima a localizzare e utilizzare un'installazione esistente con [locate-app](https://www.npmjs.com/package/locate-app), altrimenti scaricherà e installerà la versione stabile corrente del browser. Per maggiori dettagli su `browserVersion`, vedi [qui](capabilities#automate-different-browser-channels).

:::caution

La configurazione automatica del browser non supporta Microsoft Edge. Attualmente, sono supportati solo Chrome, Chromium e Firefox.

:::

Se hai un'installazione del browser in una posizione che non può essere rilevata automaticamente da WebdriverIO, puoi specificare il binario del browser che disabiliterà il download e l'installazione automatizzati.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // o 'firefox' o 'chromium'
            'goog:chromeOptions': { // o 'moz:firefoxOptions' o 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Scarica e installa il driver utilizzando [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) o [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO farà sempre questo, a meno che il [binary](capabilities#binary) del driver non sia specificato nella configurazione:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // o 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // o 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // o 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO non scaricherà automaticamente il driver Safari poiché è già installato su macOS.

:::

:::caution

Evita di specificare un `binary` per il browser e omettere il corrispondente `binary` del driver o viceversa. Se viene specificato solo uno dei valori `binary`, WebdriverIO cercherà di utilizzare o scaricare un browser/driver compatibile con esso. Tuttavia, in alcuni scenari potrebbe risultare in una combinazione incompatibile. Pertanto, si consiglia di specificare sempre entrambi per evitare problemi causati da incompatibilità di versione.

:::

**3. Avvio/arresto del driver.**

Per impostazione predefinita, WebdriverIO avvierà e arresterà automaticamente il driver utilizzando una porta libera arbitraria. Specificare uno qualsiasi dei seguenti parametri di configurazione disabiliterà questa funzionalità, il che significa che dovrai avviare e arrestare manualmente il driver:

- Qualsiasi valore per [port](configuration#port).
- Qualsiasi valore diverso da quello predefinito per [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Qualsiasi valore sia per [user](configuration#user) che per [key](configuration#key).

## Configurazione manuale

Di seguito viene descritto come è possibile impostare ancora individualmente ciascun driver. Puoi trovare un elenco con tutti i driver nel README di [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Se stai cercando di configurare piattaforme mobili e altre piattaforme UI, dai un'occhiata alla nostra guida [Appium Setup](appium).

:::

### Chromedriver

Per automatizzare Chrome puoi scaricare Chromedriver direttamente sul [sito web del progetto](http://chromedriver.chromium.org/downloads) o tramite il pacchetto NPM:

```bash npm2yarn
npm install -g chromedriver
```

Puoi quindi avviarlo tramite:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Per automatizzare Firefox scarica l'ultima versione di `geckodriver` per il tuo ambiente e decomprimi nel tuo directory di progetto:

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

**Nota:** Altre versioni di `geckodriver` sono disponibili [qui](https://github.com/mozilla/geckodriver/releases). Dopo il download puoi avviare il driver tramite:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Puoi scaricare il driver per Microsoft Edge sul [sito web del progetto](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) o come pacchetto NPM tramite:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver viene preinstallato sul tuo MacOS e può essere avviato direttamente tramite:

```sh
safaridriver -p 4444
```